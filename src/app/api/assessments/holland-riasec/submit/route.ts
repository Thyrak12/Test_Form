import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateHollandScores } from "@/lib/scoring/hollandRiasec";
import { SubmitAssessmentPayload } from "@/types/assessment";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SubmitAssessmentPayload;
    const { student, answers, assessmentSlug = "holland-riasec" } = body;

    // Validation
    if (!student || !student.fullName || !student.schoolName || !student.classSection) {
      return NextResponse.json(
        { error: "សូមបំពេញព័ត៌មានសិស្សឱ្យបានត្រឹមត្រូវ (ឈ្មោះ, សាលា, ថ្នាក់)" },
        { status: 400 }
      );
    }

    if (!Array.isArray(answers)) {
      return NextResponse.json(
        { error: "ទិន្នន័យចម្លើយមិនត្រឹមត្រូវ" },
        { status: 400 }
      );
    }

    // Pure server-side score calculation
    const scoreResult = calculateHollandScores(answers);

    // Save Student profile
    const studentRecord = await prisma.student.create({
      data: {
        fullName: student.fullName.trim(),
        studentId: student.studentId ? student.studentId.trim() : null,
        gender: student.gender || "Other",
        age: Number(student.age) || 13,
        grade: student.grade || "Grade 7",
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
    });
  } catch (error) {
    console.error("Error submitting assessment:", error);
    return NextResponse.json(
      { error: "មានបញ្ហាបច្ចេកទេសក្នុងការរក្សាទុកទិន្នន័យ។ សូមព្យាយាមម្តងទៀត។" },
      { status: 500 }
    );
  }
}
