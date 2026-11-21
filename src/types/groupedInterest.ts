export type GroupCode = "A" | "B" | "C";

export interface GroupedQuestionItem {
  id: number;
  textKh: string;
}

export interface QuestionGroup {
  code: GroupCode;
  labelKh: string;
  items: GroupedQuestionItem[];
}

export interface GroupedQuestionsData {
  assessmentSlug: string;
  titleKh: string;
  subtitleKh: string;
  instructionKh: string;
  maxPerGroup: number;
  totalQuestions: number;
  groups: QuestionGroup[];
}

export interface GroupDescriptionItem {
  code: GroupCode;
  labelKh: string;
  maxScore: number;
  focusTitleKh: string;
  descriptionKh: string;
  suggestedTracksKh: string[];
}

export interface GroupedDescriptionsData {
  assessmentSlug: string;
  resultGuide: {
    titleKh: string;
    summaryPromptKh: string;
    counselingNoteKh: string;
  };
  groups: Record<GroupCode, GroupDescriptionItem>;
}

export interface SortedGroupScore {
  code: GroupCode;
  labelKh: string;
  score: number;
  maxScore: number;
  percentage: number;
  rank: number;
  isTop: boolean;
  meta: GroupDescriptionItem;
}

export interface GroupedInterestScoreResult {
  assessmentSlug: string;
  maxPerGroup: number;
  totalChecked: number;
  totalQuestions: number;
  scores: Record<GroupCode, number>;
  percentages: Record<GroupCode, number>;
  sortedGroups: SortedGroupScore[];
  topGroupCodes: GroupCode[];
  topCode: string;
  topScore: number;
  hasTie: boolean;
  tieDetails?: {
    tiedCodes: GroupCode[];
    topScore: number;
  };
}

export type GroupedAnswersPayload = Record<GroupCode, number[]> | Record<string, number[]> | string[];
