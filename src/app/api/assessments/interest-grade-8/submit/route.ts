import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateGroupedInterestScores } from "@/lib/scoring/groupedInterest";
import { StudentProfile } from "@/types/assessment";
import { GroupedAnswersPayload } from "@/types/groupedInterest";

interface SubmitInterestPayload {
  student: StudentProfile;
  answers: GroupedAnswersPayload;
  assessmentSlug?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SubmitInterestPayload;
    const { student, answers, assessmentSlug = "interest-grade-8" } = body;

    // Validation
    if (!student || !student.fullName || !student.schoolName || !student.classSection) {
      return NextResponse.json(
        { error: "សូមបំពេញព័ត៌មានសិស្សឱ្យបានត្រឹមត្រូវ (ឈ្មោះ, សាលា, ថ្នាក់)" },
        { status: 400 }
      );
    }

    if (!answers) {
      return NextResponse.json(
        { error: "ទិន្នន័យចម្លើយមិនត្រឹមត្រូវ" },
        { status: 400 }
      );
    }

    // Pure server-side score calculation
    const scoreResult = calculateGroupedInterestScores(answers, 30);

    // Save Student profile
    const studentRecord = await prisma.student.create({
      data: {
        fullName: student.fullName.trim(),
        studentId: student.studentId ? student.studentId.trim() : null,
        gender: student.gender || "Other",
        age: Number(student.age) || 14,
        grade: student.grade || "Grade 8",
        classSection: student.classSection.trim(),
        schoolName: student.schoolName.trim(),
        avatar: student.avatar || "avatar-1",
      },
    });

    // Save generic AssessmentAttempt
    const attemptRecord = await prisma.assessmentAttempt.create({
      data: {
        assessmentSlug,
        studentId: studentRecord.id,
        answers: JSON.stringify(answers),
        scores: JSON.stringify(scoreResult.scores),
        topCode: scoreResult.topCode,
      },
    });

    return NextResponse.json({
      success: true,
      attemptId: attemptRecord.id,
      topCode: scoreResult.topCode,
      scores: scoreResult.scores,
      topGroupCodes: scoreResult.topGroupCodes,
    });
  } catch (error) {
    console.error("Error submitting interest-grade-8 assessment:", error);
    return NextResponse.json(
      { error: "មានបញ្ហាក្នុងការរក្សាទុកទិន្នន័យ។ សូមព្យាយាមម្តងទៀត។" },
      { status: 500 }
    );
  }
}
