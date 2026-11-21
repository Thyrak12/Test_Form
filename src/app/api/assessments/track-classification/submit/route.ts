import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateTrackScores } from "@/lib/scoring/trackClassification";
import { StudentProfile } from "@/types/assessment";
import { StudentTrackAnswers } from "@/types/trackClassification";

interface SubmitTrackPayload {
  student: StudentProfile;
  assessmentSlug?: string;
  answers: StudentTrackAnswers;
  extraData?: Record<string, unknown>;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SubmitTrackPayload;
    const { student, answers, assessmentSlug = "track-classification" } = body;

    // Validation
    if (!student || !student.fullName || !student.schoolName || !student.classSection) {
      return NextResponse.json(
        { error: "សូមបំពេញព័ត៌មានសិស្សឱ្យបានត្រឹមត្រូវ (ឈ្មោះ, សាលា, ថ្នាក់)" },
        { status: 400 }
      );
    }

    if (!answers || typeof answers !== "object") {
      return NextResponse.json(
        { error: "ទិន្នន័យចម្លើយមិនត្រឹមត្រូវ" },
        { status: 400 }
      );
    }

    // Pure server-side score calculation
    const scoreResult = calculateTrackScores(answers);

    // Save Student profile
    const studentRecord = await prisma.student.create({
      data: {
        fullName: student.fullName.trim(),
        studentId: student.studentId ? student.studentId.trim() : null,
        gender: student.gender || "Other",
        age: Number(student.age) || 15,
        grade: student.grade || "Grade 9",
        classSection: student.classSection.trim(),
        schoolName: student.schoolName.trim(),
        avatar: student.avatar || "avatar-1",
      },
    });

    // Save AssessmentAttempt record
    const attemptRecord = await prisma.assessmentAttempt.create({
      data: {
        assessmentSlug,
        studentId: studentRecord.id,
        answers: JSON.stringify(answers),
        scores: JSON.stringify({
          scienceTotal: scoreResult.scienceGroup.totalScore,
          scienceAverage: scoreResult.scienceGroup.averageScore,
          socialTotal: scoreResult.socialScienceGroup.totalScore,
          socialAverage: scoreResult.socialScienceGroup.averageScore,
          topClusters: scoreResult.topClusters.map((c) => ({
            id: c.clusterId,
            score: c.totalScore,
            partA: c.partAScore,
            partB: c.partBScore,
          })),
        }),
        topCode: scoreResult.recommendedTrack,
      },
    });

    return NextResponse.json({
      success: true,
      attemptId: attemptRecord.id,
      topCode: scoreResult.recommendedTrack,
      scoreResult,
    });
  } catch (error) {
    console.error("Track classification submission error:", error);
    return NextResponse.json(
      { error: "មានបញ្ហាបច្ចេកទេសក្នុងការរក្សាទុកទិន្នន័យ សូមព្យាយាមម្តងទៀត" },
      { status: 500 }
    );
  }
}
