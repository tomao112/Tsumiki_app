import { TechCardData } from "../types/tech-card";
import { STORAGE_KEY } from "../types/tech-card";
import { isTechCardData } from "./type-check";

export function loadTechCards(): TechCardData[] | null {
  const savedCards = localStorage.getItem(STORAGE_KEY);
  if (savedCards === null) {
    return null;
  }
  const parsedData: unknown = JSON.parse(savedCards);

  if (!Array.isArray(parsedData)) {
    throw new Error("データの形式が正しくありません");
  }

  const migrateData = parsedData.map((card: unknown) => {
    if (typeof card === "object" && card !== null && !("isPinned" in card)) {
      return { ...card, isPinned: false };
    }
    return card;
  });

  if (!migrateData.every(isTechCardData)) {
    throw new Error("データの形式が正しくありません");
  }

  return migrateData;
}

export function saveTechCard(card: TechCardData[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(card));
}
