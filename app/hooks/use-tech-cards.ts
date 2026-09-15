import { useState, useEffect, useReducer } from "react";
import type {
  EditTechCardData,
  LearningStatus,
  NewTechCardData,
  TechCardData,
} from "../types/tech-card";
import { loadTechCards, saveTechCard } from "../Utils/tech-card-storage";
import { techCardReducer } from "../reducers/tech-card-reducer";
import { isTechCardResponse } from "../Utils/type-check";

export function useTechCards(initialCards: TechCardData[]) {
  const [cards, dispatch] = useReducer(techCardReducer, initialCards);
  const [isInitialized, setIsInitialized] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const initializeCards = async () => {
      try {
        const parsedData = loadTechCards();

        if (parsedData !== null) {
          dispatch({
            type: "initialize",
            payload: parsedData,
          });

          return;
        }

        const response = await fetch("/api/cards");
        if (!response.ok) {
          throw new Error("データの取得ができませんでした");
        }

        const data: unknown = await response.json();

        if (!isTechCardResponse(data)) {
          throw new Error("APIから取得したデータの形式が正しくありません");
        }

        dispatch({
          type: "initialize",
          payload: data.cards,
        });
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "予期しないエラーが発生しました";
        setErrorMessage(message);
      } finally {
        setIsInitialized(true);
      }
    };
    initializeCards();
  }, []);

  useEffect(() => {
    if (!isInitialized || errorMessage !== null) return;

    saveTechCard(cards);
  }, [isInitialized, cards, errorMessage]);

  const addCard = (newTechCardData: NewTechCardData) => {
    dispatch({
      type: "add",
      payload: newTechCardData,
    });
  };

  const deleteCard = (id: number) => {
    dispatch({
      type: "delete",
      payload: id,
    });
  };

  const updateCard = (id: number, status: LearningStatus) => {
    dispatch({
      type: "update",
      payload: id,
      status,
    });
  };

  const editCard = (id: number, editCardData: EditTechCardData) => {
    dispatch({
      type: "edit",
      payload: id,
      editCardData,
    });
  };

  const resetLearningStatus = () => {
    dispatch({
      type: "resetLearnStatus",
    });
  };

  const togglePin = (id: number) => {
    dispatch({
      type: "togglePin",
      payload: id,
    });
  };

  return {
    cards,
    isInitialized,
    addCard,
    deleteCard,
    updateCard,
    editCard,
    resetLearningStatus,
    togglePin,
    errorMessage,
  };
}
