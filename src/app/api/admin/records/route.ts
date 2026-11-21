import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const attempts = await prisma.assessmentAttempt.findMany({
      include: {
        student: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const parsedAttempts = attempts.map((attempt) => {
      let answers: number[] = [];
      let scores: Record<string, number> = {};

      try {
        answers = JSON.parse(attempt.answers);
      } catch {
        answers = [];
      }

      try {
        scores = JSON.parse(attempt.scores);
      } catch {
        scores = {};
      }

      return {
        id: attempt.id,
        assessmentSlug: attempt.assessmentSlug,
        topCode: attempt.topCode,
        answersCount: answers.length,
        scores,
        createdAt: attempt.createdAt.toISOString(),
        student: attempt.student,
      };
    });

    // Compute basic statistics
    const totalStudents = await prisma.student.count();
    const totalAttempts = attempts.length;

    // Count top codes
    const codeCounts: Record<string, number> = {};
    for (const a of attempts) {
      if (a.topCode) {
        codeCounts[a.topCode] = (codeCounts[a.topCode] || 0) + 1;
      }
    }

    let mostFrequentCode = "N/A";
    let maxCount = 0;
    for (const [code, count] of Object.entries(codeCounts)) {
      if (count > maxCount) {
        maxCount = count;
        mostFrequentCode = code;
      }
    }

    return NextResponse.json({
      success: true,
      stats: {
        totalStudents,
        totalAttempts,
        mostFrequentCode,
        codeCounts,
      },
      records: parsedAttempts,
    });
  } catch (error) {
    console.error("Error fetching admin records:", error);
    return NextResponse.json(
      { error: "Failed to fetch student records" },
      { status: 500 }
    );
  }
}
