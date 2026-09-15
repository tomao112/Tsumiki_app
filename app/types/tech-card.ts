export type TechCardData = {
  id: number;
  title: string;
  category: TechCategory;
  summary: string;
  learningStatus: LearningStatus;
  isPinned: boolean;
};

export type NewTechCardData = Omit<TechCardData, "id" | "isPinned">;

export const TECH_CATEGORIES = ["React", "JavaScript"] as const;

export type TechCategory = (typeof TECH_CATEGORIES)[number];

export const LEARNING_STATUSES = [
  "未学習",
  "学習中",
  "復習中",
  "理解済み",
] as const;

export type LearningStatus = (typeof LEARNING_STATUSES)[number];

export type EditTechCardData = Pick<TechCardData, "title" | "summary">;

export const STORAGE_KEY = "tsumiki-tech-cards";

export type TechCardsResponse = {
  cards: TechCardData[];
};

export type CategoryFilter = TechCategory | "すべて";

export type LearningStatusFilter = LearningStatus | "すべて";

export type SortOrder = "newest" | "oldest" | "title";
