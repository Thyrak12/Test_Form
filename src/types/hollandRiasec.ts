export type RiasecCode = "R" | "I" | "A" | "S" | "E" | "C";

export interface HollandQuestion {
  id: number;
  category: RiasecCode;
  textKh: string;
}

export interface HollandQuestionsData {
  assessmentSlug: string;
  titleKh: string;
  subtitleKh: string;
  instructionKh: string;
  totalQuestions: number;
  questions: HollandQuestion[];
}

export interface HollandCategoryDescription {
  code: RiasecCode;
  nameEn: string;
  nameKh: string;
  archetypeKh: string;
  questionIds: number[];
  descriptionKh: string;
  careersTextKh: string;
  careersListKh: string[];
}

export interface HollandDescriptionsData {
  resultGuide: {
    titleKh: string;
    instructionKh: string;
    exampleKh: string;
    tieBreakerNoteKh: string;
  };
  categories: Record<RiasecCode, HollandCategoryDescription>;
}

export interface SortedCategoryScore {
  code: RiasecCode;
  score: number;
  maxScore: number;
  meta: HollandCategoryDescription;
}

export interface HollandScoreResult {
  scores: Record<RiasecCode, number>;
  maxScorePerCategory: number;
  sortedCategories: SortedCategoryScore[];
  topCode: string;
  firstCode: RiasecCode;
  secondCode: RiasecCode;
  firstScore: number;
  secondScore: number;
  hasTie: boolean;
  tieDetails: {
    isFirstPlaceTie: boolean;
    isSecondPlaceTie: boolean;
    tiedWithFirst: RiasecCode[];
    tiedWithSecond: RiasecCode[];
  };
}
