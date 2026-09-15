import { TechCardData, TechCardsResponse } from "../types/tech-card";
import { LEARNING_STATUSES, TECH_CATEGORIES } from "../types/tech-card";

export function isTechCardData(value: unknown): value is TechCardData {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const card = value as Record<string, unknown>;

  return (
    typeof card.id === "number" &&
    typeof card.title === "string" &&
    typeof card.summary === "string" &&
    TECH_CATEGORIES.some((category) => category === card.category) &&
    LEARNING_STATUSES.some((status) => status === card.learningStatus) &&
    typeof card.isPinned === "boolean"
  );
}

export function isTechCardResponse(value: unknown): value is TechCardsResponse {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const response = value as Record<string, unknown>;

  return Array.isArray(response.cards) && response.cards.every(isTechCardData);
}
