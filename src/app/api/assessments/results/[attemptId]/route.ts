import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateHollandScores } from "@/lib/scoring/hollandRiasec";
import { calculateTrackScores } from "@/lib/scoring/trackClassification";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ attemptId: string }> | { attemptId: string } }
) {
  try {
    const params = await context.params;
    const { attemptId } = params;

    if (!attemptId) {
      return NextResponse.json(
        { error: "Attempt ID មិនត្រឹមត្រូវ" },
        { status: 400 }
      );
    }

    const attempt = await prisma.assessmentAttempt.findUnique({
      where: { id: attemptId },
      include: {
        student: true,
      },
    });

    if (!attempt) {
      return NextResponse.json(
        { error: "រកមិនឃើញលទ្ធផលតេស្តនេះទេ" },
        { status: 404 }
      );
    }

    let parsedAnswers: any = [];
    try {
      parsedAnswers = JSON.parse(attempt.answers);
    } catch {
      parsedAnswers = [];
    }

    let parsedScores: Record<string, number> = {};
    try {
      parsedScores = JSON.parse(attempt.scores);
    } catch {
      parsedScores = {};
    }

    // Recompute score result dynamically based on assessmentSlug
    let scoreResult: any = null;
    if (attempt.assessmentSlug === "holland-riasec") {
      scoreResult = calculateHollandScores(Array.isArray(parsedAnswers) ? parsedAnswers : []);
    } else if (
      attempt.assessmentSlug === "track-classification" ||
      attempt.assessmentSlug === "moeys_appendix_12_track_selection"
    ) {
      scoreResult = calculateTrackScores(parsedAnswers);
    } else {
      scoreResult = {
        scores: parsedScores,
        topCode: attempt.topCode,
      };
    }

    return NextResponse.json({
      success: true,
      attempt: {
        id: attempt.id,
        assessmentSlug: attempt.assessmentSlug,
        topCode: attempt.topCode,
        answers: parsedAnswers,
        scores: parsedScores,
        createdAt: attempt.createdAt.toISOString(),
      },
      student: attempt.student,
      scoreResult,
    });
  } catch (error) {
    console.error("Error fetching assessment attempt:", error);
    return NextResponse.json(
      { error: "មិនអាចទាញយកលទ្ធផលបានទេ" },
      { status: 500 }
    );
  }
}
