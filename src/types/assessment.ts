export interface StudentProfile {
  id?: string;
  fullName: string;
  studentId?: string;
  gender: "M" | "F" | "Other" | string;
  age: number;
  grade: string;
  classSection: string;
  schoolName: string;
  avatar?: string;
  extraFields?: Record<string, unknown>;
}

export interface AssessmentAttemptRecord {
  id: string;
  assessmentSlug: string;
  studentId: string;
  student: StudentProfile;
  answers: number[];
  scores: Record<string, number>;
  topCode: string;
  createdAt: string;
  updatedAt?: string;
}

export interface SubmitAssessmentPayload {
  student: StudentProfile;
  assessmentSlug: string;
  answers: number[];
  extraData?: Record<string, unknown>;
}

export interface SubmitAssessmentResponse {
  success: boolean;
  attemptId: string;
  topCode: string;
  scores: Record<string, number>;
  message?: string;
}

/**
 * Standard metadata for any assessment/test registered on the platform
 */
export interface AssessmentMeta {
  slug: string;
  titleKh: string;
  titleEn: string;
  descriptionKh: string;
  targetAudience: string;
  estimatedMinutes: number;
  questionCount: number;
  route: string;
  isActive: boolean;
}
