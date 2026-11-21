import {
  GroupCode,
  GroupedAnswersPayload,
  GroupedDescriptionsData,
  GroupedInterestScoreResult,
  SortedGroupScore,
} from "@/types/groupedInterest";
import grade8Descriptions from "@/data/assessments/interest-grade-8/descriptions.json";

const defaultDescriptions = grade8Descriptions as unknown as GroupedDescriptionsData;
export const GROUP_CODES: GroupCode[] = ["A", "B", "C"];

/**
 * Pure, reusable scoring function for Grouped Interest assessments (Grade 8 / Grade 9).
 *
 * @param answers Grouped answers object { A: [1, 2], B: [5], C: [] } or composite strings ["A-1", "B-5"]
 * @param maxPerGroup Maximum possible items per group (defaults to 30, customizable for Grade 9)
 * @param customDescriptions Optional custom descriptions (defaults to Grade 8 descriptions)
 * @returns GroupedInterestScoreResult
 */
export function calculateGroupedInterestScores(
  answers: GroupedAnswersPayload,
  maxPerGroup: number = 30,
  customDescriptions?: GroupedDescriptionsData
): GroupedInterestScoreResult {
  const descriptions = customDescriptions || defaultDescriptions;

  const scores: Record<GroupCode, number> = {
    A: 0,
    B: 0,
    C: 0,
  };

  // Normalize answers from either Record<string, number[]> or string[] array
  if (Array.isArray(answers)) {
    // Array format: e.g. ["A-1", "A-5", "B-2", "C-10"] or ["A:1"]
    const uniqueItems = new Set<string>();
    for (const item of answers) {
      if (typeof item === "string") {
        const parts = item.split(/[-:_]/);
        if (parts.length >= 2) {
          const group = parts[0].toUpperCase() as GroupCode;
          const id = parseInt(parts[1], 10);
          if (GROUP_CODES.includes(group) && id >= 1 && id <= maxPerGroup) {
            uniqueItems.add(`${group}-${id}`);
          }
        }
      }
    }
    for (const item of uniqueItems) {
      const group = item.split("-")[0] as GroupCode;
      scores[group] = (scores[group] || 0) + 1;
    }
  } else if (answers && typeof answers === "object") {
    // Record format: e.g. { A: [1, 5], B: [2], C: [10] }
    for (const group of GROUP_CODES) {
      const list = (answers as Record<string, unknown>)[group];
      if (Array.isArray(list)) {
        const uniqueIds = new Set(
          list.filter((id) => typeof id === "number" && id >= 1 && id <= maxPerGroup)
        );
        scores[group] = uniqueIds.size;
      }
    }
  }

  // Calculate percentages
  const percentages: Record<GroupCode, number> = {
    A: Math.round((scores.A / maxPerGroup) * 100),
    B: Math.round((scores.B / maxPerGroup) * 100),
    C: Math.round((scores.C / maxPerGroup) * 100),
  };

  const totalChecked = scores.A + scores.B + scores.C;
  const totalQuestions = maxPerGroup * GROUP_CODES.length;

  // Find top score and top codes
  const maxScoreFound = Math.max(scores.A, scores.B, scores.C);
  const topGroupCodes = GROUP_CODES.filter(
    (code) => scores[code] === maxScoreFound
  );

  const hasTie = topGroupCodes.length > 1;
  const topCode = topGroupCodes.length > 0 ? topGroupCodes.join(", ") : "A";

  // Sort groups descending by score
  const sortedRaw = [...GROUP_CODES].sort((a, b) => {
    if (scores[b] !== scores[a]) {
      return scores[b] - scores[a];
    }
    // Deterministic tie-breaker: keep alphabetical A, B, C order
    return a.localeCompare(b);
  });

  let currentRank = 1;
  const sortedGroups: SortedGroupScore[] = sortedRaw.map((code, idx) => {
    if (idx > 0 && scores[code] < scores[sortedRaw[idx - 1]]) {
      currentRank = idx + 1;
    }

    const meta = descriptions?.groups?.[code] || {
      code,
      labelKh: code === "A" ? "កម្រងសំណួរ (ក)" : code === "B" ? "កម្រងសំណួរ (ខ)" : "កម្រងសំណួរ (គ)",
      maxScore: maxPerGroup,
      focusTitleKh: "",
      descriptionKh: "",
      suggestedTracksKh: [],
    };

    return {
      code,
      labelKh: meta.labelKh,
      score: scores[code],
      maxScore: maxPerGroup,
      percentage: percentages[code],
      rank: currentRank,
      isTop: topGroupCodes.includes(code),
      meta,
    };
  });

  return {
    assessmentSlug: descriptions.assessmentSlug || "interest-grade-8",
    maxPerGroup,
    totalChecked,
    totalQuestions,
    scores,
    percentages,
    sortedGroups,
    topGroupCodes: topGroupCodes.length > 0 ? topGroupCodes : [sortedRaw[0]],
    topCode,
    topScore: maxScoreFound,
    hasTie,
    tieDetails: hasTie
      ? {
          tiedCodes: topGroupCodes,
          topScore: maxScoreFound,
        }
      : undefined,
  };
}
