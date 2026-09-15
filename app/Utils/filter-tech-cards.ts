import type {
  TechCardData,
  CategoryFilter,
  LearningStatusFilter,
  SortOrder,
} from "../types/tech-card";

type FilterTechCardParams = {
  cards: TechCardData[];
  category: CategoryFilter;
  learningStatus: LearningStatusFilter;
  searchText: string;
  sortOrder: SortOrder;
};

export function filterTechCards({
  cards,
  category,
  learningStatus,
  searchText,
  sortOrder,
}: FilterTechCardParams): TechCardData[] {
  const filteredCards =
    category === "すべて"
      ? cards
      : cards.filter((card) => card.category === category);

  const statusFilteredCards =
    learningStatus === "すべて"
      ? filteredCards
      : filteredCards.filter((card) => card.learningStatus === learningStatus);

  const filteredSearch = statusFilteredCards.filter((card) =>
    card.title.includes(searchText),
  );

  const sortedCards = filteredSearch.toSorted((a, b) => {
    switch (sortOrder) {
      case "title":
        return a.title.localeCompare(b.title, "ja");
      case "newest":
        return b.id - a.id;
      case "oldest":
        return a.id - b.id;
    }
  });

  return sortedCards;
}
