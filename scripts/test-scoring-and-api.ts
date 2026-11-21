import { calculateHollandScores, CATEGORY_QUESTION_MAP } from "../src/lib/scoring/hollandRiasec";
import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("=== Testing Holland RIASEC Scoring Logic ===");

  // Test Case 1: Clear SA winner (Social 6, Artistic 5, others lower)
  // S questions: [4, 10, 16, 22, 28, 34] (6 pts)
  // A questions: [3, 9, 15, 21, 27] (5 pts)
  // R questions: [1] (1 pt)
  const answers1 = [4, 10, 16, 22, 28, 34, 3, 9, 15, 21, 27, 1];
  const result1 = calculateHollandScores(answers1);

  console.log("Test 1 Result:", {
    topCode: result1.topCode,
    scores: result1.scores,
    firstScore: result1.firstScore,
    secondScore: result1.secondScore,
    hasTie: result1.hasTie,
  });

  if (result1.topCode !== "SA" || result1.hasTie !== false) {
    throw new Error(`Test 1 Failed: Expected topCode 'SA' without tie, got '${result1.topCode}', hasTie=${result1.hasTie}`);
  }
  console.log("✓ Test 1 Passed (Clear SA winner)");

  // Test Case 2: Tie in first place (Realistic 6, Investigative 6)
  // R questions: [1, 7, 13, 19, 25, 31] (6 pts)
  // I questions: [2, 8, 14, 20, 26, 32] (6 pts)
  const answers2 = [1, 7, 13, 19, 25, 31, 2, 8, 14, 20, 26, 32];
  const result2 = calculateHollandScores(answers2);

  console.log("Test 2 Result (Tie Case):", {
    topCode: result2.topCode,
    scores: result2.scores,
    hasTie: result2.hasTie,
    isFirstPlaceTie: result2.tieDetails.isFirstPlaceTie,
  });

  if (!result2.hasTie || !result2.tieDetails.isFirstPlaceTie) {
    throw new Error("Test 2 Failed: Expected hasTie=true and isFirstPlaceTie=true");
  }
  console.log("✓ Test 2 Passed (Tie detection works)");

  // Test Case 3: Test database storage and retrieval
  console.log("\n=== Testing Database Storage & Retrieval ===");
  const student = await prisma.student.create({
    data: {
      fullName: "តេស្ត សិស្ស",
      studentId: "ST-TEST-001",
      gender: "F",
      age: 13,
      grade: "Grade 7",
      classSection: "7A",
      schoolName: "អនុវិទ្យាល័យគំរូ",
    },
  });

  const attempt = await prisma.assessmentAttempt.create({
    data: {
      assessmentSlug: "holland-riasec",
      studentId: student.id,
      answers: JSON.stringify(answers1),
      scores: JSON.stringify(result1.scores),
      topCode: result1.topCode,
    },
  });

  console.log("Created student:", student.id, student.fullName);
  console.log("Created attempt:", attempt.id, attempt.topCode);

  const fetched = await prisma.assessmentAttempt.findUnique({
    where: { id: attempt.id },
    include: { student: true },
  });

  if (!fetched || fetched.topCode !== "SA" || fetched.student.fullName !== "តេស្ត សិស្ស") {
    throw new Error("Test 3 Failed: DB retrieval failed");
  }
  console.log("✓ Test 3 Passed (Database storage & relation query verified)");

  // Clean up test records
  await prisma.student.delete({ where: { id: student.id } });
  console.log("✓ Test 4 Cleaned up test record");

  console.log("\nALL TESTS PASSED SUCCESSFULLY! 🎉");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
