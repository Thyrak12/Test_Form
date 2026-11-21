# Assessments Data & Modular Architecture Guide

This directory holds the structured test data for all student assessments on the platform.

Each assessment is isolated in its own dedicated directory named after its URL slug (e.g., `holland-riasec/`).

```
src/data/assessments/
├── README.md
└── holland-riasec/
    ├── questions.json       # Questions dataset for Holland RIASEC
    └── descriptions.json    # Category metadata, archetypes, and career guides
```

---

## How to Add a New Assessment / Test

To implement a new assessment (e.g. `multiple-intelligences`, `mbti`, `work-values`):

### 1. Create Data Directory
Create `src/data/assessments/<slug>/`:
- `questions.json`: Array of questions (ID, Khmer text, category/dimension mapping).
- `descriptions.json`: Category archetypes, score interpretations, and recommendations.

### 2. Define Types
Create `src/types/<slug>.ts` (e.g. `src/types/mbti.ts`) for test-specific structures (dimensions, result types).

### 3. Implement Scoring
Create `src/lib/scoring/<slug>.ts` with a pure scoring function:
```ts
export function calculateMbtiScores(answers: number[]): MbtiScoreResult {
  // Compute scores, top codes, dimensions
}
```

### 4. Create Test Components
Add test-specific UI in `src/components/assessments/<slug>/`:
- `QuestionCard.tsx` (or reuse shared checklist patterns)
- `ScoreChart.tsx`
- `ResultBanner.tsx`
- `GuidanceGuide.tsx`

### 5. Create Routes & API
- Pages: `src/app/assessments/<slug>/page.tsx`, `test/page.tsx`, `result/[attemptId]/page.tsx`
- Submission API: `src/app/api/assessments/<slug>/submit/route.ts`

### 6. Register in Platform Registry
Add the metadata to `src/lib/assessments/registry.ts`:
```ts
AVAILABLE_ASSESSMENTS.push({
  slug: "new-test-slug",
  titleKh: "...",
  titleEn: "...",
  descriptionKh: "...",
  targetAudience: "...",
  estimatedMinutes: 10,
  questionCount: 30,
  route: "/assessments/new-test-slug",
  isActive: true,
});
```
