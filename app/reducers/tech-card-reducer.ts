import {
  TechCardData,
  NewTechCardData,
  LearningStatus,
  EditTechCardData,
} from "../types/tech-card";

export type TechCardAction =
  | { type: "initialize"; payload: TechCardData[] }
  | { type: "add"; payload: NewTechCardData }
  | { type: "delete"; payload: number }
  | { type: "update"; payload: number; status: LearningStatus }
  | { type: "edit"; payload: number; editCardData: EditTechCardData }
  | { type: "resetLearnStatus" }
  | { type: "togglePin"; payload: number };

export function techCardReducer(
  cards: TechCardData[],
  action: TechCardAction,
): TechCardData[] {
  switch (action.type) {
    case "initialize":
      return action.payload;
    case "add": {
      const newId = Math.max(0, ...cards.map((card) => card.id)) + 1;

      const newCard: TechCardData = {
        id: newId,
        ...action.payload,
        isPinned: false,
      };

      return [...cards, newCard];
    }
    case "delete":
      return cards.filter((card) => card.id !== action.payload);
    case "update":
      return cards.map((card) =>
        card.id === action.payload
          ? { ...card, learningStatus: action.status }
          : card,
      );
    case "edit":
      return cards.map((card) =>
        card.id === action.payload ? { ...card, ...action.editCardData } : card,
      );

    case "resetLearnStatus":
      return cards.map((card) => {
        return {
          ...card,
          learningStatus: "未学習",
        };
      });

    case "togglePin":
      return cards.map((card) =>
        card.id === action.payload
          ? { ...card, isPinned: !card.isPinned }
          : card,
      );
  }
}
