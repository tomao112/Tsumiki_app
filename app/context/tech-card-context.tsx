"use client";

import { createContext, useContext, type ReactNode } from "react";
import { TechCardData } from "../types/tech-card";
import { useTechCards } from "../hooks/use-tech-cards";

type TechCardContextValue = ReturnType<typeof useTechCards>;

type TechCardProviderProps = {
  initialCards: TechCardData[];
  children: ReactNode;
};

const TechCardContext = createContext<TechCardContextValue | undefined>(
  undefined,
);

export function TechCardProvider({
  initialCards,
  children,
}: TechCardProviderProps) {
  const value = useTechCards(initialCards);
  return <TechCardContext value={value}>{children}</TechCardContext>;
}

export function useTechCardsContext() {
  const context = useContext(TechCardContext);

  if (context === undefined) {
    throw new Error("TechCardProviderの内側で使用してください");
  }

  return context;
}
