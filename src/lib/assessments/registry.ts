import { AssessmentMeta } from "@/types/assessment";

/**
 * Platform Assessment Registry
 */
export const AVAILABLE_ASSESSMENTS: AssessmentMeta[] = [
  {
    slug: "holland-riasec",
    titleKh: "តេស្តស្វែងយល់ពីខ្លួនឯង Holland RIASEC",
    titleEn: "Holland Career RIASEC Assessment",
    descriptionKh:
      "ការវាយតម្លៃចំណង់ចំណូលចិត្ត និងបុគ្គលិកលក្ខណៈ ៤៨ សំណួរ ដើម្បីស្វែងរកកូដ Holland និងទិសដៅអាជីពសមស្រប។",
    targetAudience: "សម្រាប់សិស្សថ្នាក់ទី ៧",
    estimatedMinutes: 10,
    questionCount: 48,
    route: "/assessments/holland-riasec",
    isActive: true,
  },
  {
    slug: "interest-grade-8",
    titleKh: "តេស្តវាយតម្លៃខ្លួនឯង អំពីចំណង់ចំណូលចិត្ត",
    titleEn: "Grade 8 Interest Assessment (Groups A, B, C)",
    descriptionKh:
      "ការវាយតម្លៃចំណង់ចំណូលចិត្ត ៩០ សំណួរ បែងចែកជា ៣ កម្រង (ក, ខ, គ) ដើម្បីកំណត់គន្លងសិក្សា និងវិជ្ជាជីវៈសមស្រប។",
    targetAudience: "សម្រាប់សិស្សថ្នាក់ទី ៨",
    estimatedMinutes: 15,
    questionCount: 90,
    route: "/assessments/interest-grade-8",
    isActive: true,
  },
];

export function getAssessmentBySlug(slug: string): AssessmentMeta | undefined {
  return AVAILABLE_ASSESSMENTS.find((item) => item.slug === slug);
}

export function getAllActiveAssessments(): AssessmentMeta[] {
  return AVAILABLE_ASSESSMENTS.filter((item) => item.isActive);
}
