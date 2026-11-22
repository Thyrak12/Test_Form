export interface MajorItem {
  id: string;
  number: number;
  track: 'science' | 'social_science';
  major_name_kh: string;
  major_name_en: string;
  category: string;
  high_school_subjects: string[];
  tvet_equivalent: string[];
  career_positions: string[];
  description_kh: string;
  workplaces: string[];
  image: string;
}

export type CareerTrack = 'science' | 'social_science';

export interface CareerFilterState {
  searchQuery: string;
  category: string;
  selectedSubject: string;
}
