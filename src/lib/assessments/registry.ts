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
    slug: "track-classification",
    titleKh: "តេស្តញែកប្រភេទថ្នាក់ (ឧបសម្ព័ន្ធ ១២)",
    titleEn: "Class Track Selection Assessment (Appendix 12)",
    descriptionKh:
      "កម្រងតេស្តវាយតម្លៃ ១៦ ក្រុមជំនាញ និងចំណូលចិត្ត ដើម្បីជួយសិស្សកំណត់គន្លងវិទ្យាសាស្ត្រ វិទ្យាសាស្ត្រសង្គម ឬវិជ្ជាជីវៈ នៅថ្នាក់ទី ១០។",
    targetAudience: "សម្រាប់សិស្សថ្នាក់ទី ៩ ឡើងទី ១០",
    estimatedMinutes: 20,
    questionCount: 256,
    route: "/assessments/track-classification",
    isActive: true,
  },
];

export function getAssessmentBySlug(slug: string): AssessmentMeta | undefined {
  return AVAILABLE_ASSESSMENTS.find((item) => item.slug === slug);
}

export function getAllActiveAssessments(): AssessmentMeta[] {
  return AVAILABLE_ASSESSMENTS.filter((item) => item.isActive);
}
