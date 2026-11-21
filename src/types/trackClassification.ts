export type TrackGroup = "science" | "social_science";

export interface ClusterItem {
  id: number;
  text_km: string;
}

export interface AssessmentCluster {
  cluster_id: number;
  title_km: string;
  title_en: string;
  track_group: TrackGroup;
  part_a_prompt_km: string;
  part_a_items: ClusterItem[];
  part_b_prompt_km: string;
  part_b_items: ClusterItem[];
}

export interface TrackQuestionsData {
  test_id: string;
  total_clusters: number;
  total_questions: number;
  clusters: AssessmentCluster[];
}

export interface VocationalMajor {
  km: string;
  en: string;
  descriptionKm?: string;
}

export interface TrackGroupMeta {
  label_km: string;
  label_en: string;
  cluster_ids: number[];
  vocational_majors: VocationalMajor[];
}

export interface TrackDescriptionsData {
  test_id: string;
  title_km: string;
  title_en: string;
  issuer: string;
  target_audience: string;
  description_km: string;
  description_en: string;
  scoring_scales: {
    part_a_interest: {
      label_km: string;
      label_en: string;
      options: { value: number; label_km: string; label_en: string }[];
      min_score: number;
      max_score: number;
    };
    part_b_skill: {
      label_km: string;
      label_en: string;
      options: { value: number; label_km: string; label_en: string }[];
      min_score: number;
      max_score: number;
    };
  };
  track_groups: {
    science: TrackGroupMeta;
    social_science: TrackGroupMeta;
  };
}

export interface ClusterAnswers {
  partA: Record<number, number>; // item id (1..6) -> rating (1..4)
  partB: Record<number, number>; // item id (1..10) -> rating (0..3)
}

export type StudentTrackAnswers = Record<number, ClusterAnswers>; // clusterId (1..16) -> ClusterAnswers

export interface ClusterScoreDetail {
  clusterId: number;
  titleKm: string;
  titleEn: string;
  trackGroup: TrackGroup;
  partAScore: number; // 6-24
  partAMax: number;   // 24
  partBScore: number; // 0-30
  partBMax: number;   // 30
  totalScore: number; // 6-54
  totalMax: number;   // 54
  percentage: number;
}

export interface GroupScoreDetail {
  group: TrackGroup;
  labelKm: string;
  labelEn: string;
  clusterCount: number;
  totalScore: number;
  maxScore: number;
  averageScore: number; // out of 54
  percentage: number;
}

export interface SubjectAdvice {
  subjectKm: string;
  subjectEn: string;
  reasonKm: string;
}

export interface TrackClassificationResult {
  scienceGroup: GroupScoreDetail;
  socialScienceGroup: GroupScoreDetail;
  recommendedTrack: "science" | "social_science" | "balanced";
  recommendedTrackKm: string;
  recommendedTrackEn: string;
  topClusters: ClusterScoreDetail[];
  allClusters: ClusterScoreDetail[];
  vocationalRecommendations: VocationalMajor[];
  subjectAdvice: SubjectAdvice[];
  totalAnsweredCount: number;
}
