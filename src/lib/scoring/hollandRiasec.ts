import {
  RiasecCode,
  HollandQuestion,
  HollandCategoryDescription,
  HollandScoreResult,
  SortedCategoryScore,
  HollandDescriptionsData,
} from "@/types/hollandRiasec";
import descriptionsJson from "@/data/assessments/holland-riasec/descriptions.json";

export const RIASEC_CODES: RiasecCode[] = ["R", "I", "A", "S", "E", "C"];

export const CATEGORY_QUESTION_MAP: Record<number, RiasecCode> = {
  1: "R", 7: "R", 13: "R", 19: "R", 25: "R", 31: "R", 37: "R", 43: "R",
  2: "I", 8: "I", 14: "I", 20: "I", 26: "I", 32: "I", 38: "I", 44: "I",
  3: "A", 9: "A", 15: "A", 21: "A", 27: "A", 33: "A", 39: "A", 45: "A",
  4: "S", 10: "S", 16: "S", 22: "S", 28: "S", 34: "S", 40: "S", 46: "S",
  5: "E", 11: "E", 17: "E", 23: "E", 29: "E", 35: "E", 41: "E", 47: "E",
  6: "C", 12: "C", 18: "C", 24: "C", 30: "C", 36: "C", 42: "C", 48: "C",
};

export const descriptionsData = descriptionsJson as unknown as HollandDescriptionsData;

/**
 * Pure scoring calculation for Holland RIASEC Assessment
 * @param checkedQuestionIds Array of selected question IDs (1 to 48)
 * @returns HollandScoreResult containing category scores, top 2 code, tie detection, etc.
 */
export function calculateHollandScores(
  checkedQuestionIds: number[]
): HollandScoreResult {
  const scores: Record<RiasecCode, number> = {
    R: 0,
    I: 0,
    A: 0,
    S: 0,
    E: 0,
    C: 0,
  };

  const uniqueChecked = new Set<number>(
    checkedQuestionIds.filter((id) => typeof id === "number" && id >= 1 && id <= 48)
  );

  for (const qId of uniqueChecked) {
    const category = CATEGORY_QUESTION_MAP[qId];
    if (category && scores[category] !== undefined) {
      scores[category] = Math.min(8, scores[category] + 1);
    }
  }

  // Sort descending by score. Tie-breaking keeps RIASEC order deterministic.
  const sortedCategories: SortedCategoryScore[] = RIASEC_CODES.map((code) => {
    const meta = descriptionsData.categories[code];
    return {
      code,
      score: scores[code],
      maxScore: 8,
      meta,
    };
  }).sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return RIASEC_CODES.indexOf(a.code) - RIASEC_CODES.indexOf(b.code);
  });

  const firstCategory = sortedCategories[0];
  const secondCategory = sortedCategories[1];
  const thirdCategory = sortedCategories[2];

  const firstScore = firstCategory.score;
  const secondScore = secondCategory.score;
  const thirdScore = thirdCategory?.score ?? 0;

  // Detect ties
  // 1st place tie: multiple letters share the same max score
  const tiedWithFirst = sortedCategories
    .filter((c) => c.score === firstScore)
    .map((c) => c.code);
  const isFirstPlaceTie = tiedWithFirst.length > 1;

  // 2nd place tie: 2nd place letter has the exact same score as 3rd place (or others)
  // Only matters if 2nd place is not already tied with 1st
  const tiedWithSecond = !isFirstPlaceTie
    ? sortedCategories.filter((c) => c.score === secondScore).map((c) => c.code)
    : [];
  const isSecondPlaceTie = !isFirstPlaceTie && tiedWithSecond.length > 1;

  const hasTie = isFirstPlaceTie || isSecondPlaceTie;

  const topCode = `${firstCategory.code}${secondCategory.code}`;

  return {
    scores,
    maxScorePerCategory: 8,
    sortedCategories,
    topCode,
    firstCode: firstCategory.code,
    secondCode: secondCategory.code,
    firstScore,
    secondScore,
    hasTie,
    tieDetails: {
      isFirstPlaceTie,
      isSecondPlaceTie,
      tiedWithFirst,
      tiedWithSecond,
    },
  };
}
