"use client";

import { useTechCardsContext } from "@/app/context/tech-card-context";
import TechCardNotFoundContent from "./tech-card-not-found-content";
import { LEARNING_STATUSES, LearningStatus } from "@/app/types/tech-card";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import {
  Card,
  CardContent,
  CardHeader,
  CardAction,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useId } from "react";
import TechCardDetailSkeleton from "./tech-card-detail-skeleton";

type TechCardDetailProps = {
  cardId: number;
};

export default function TechCardDetail({ cardId }: TechCardDetailProps) {
  const { cards, isInitialized, updateCard } = useTechCardsContext();

  const statusId = useId();

  const card = cards.find((card) => card.id === cardId);

  const pageTitle = !isInitialized
    ? "技術カード詳細 | Tsumiki"
    : card === undefined
      ? "技術カードが見つかりません | Tsumiki"
      : `${card.title} | Tsumiki`;

  if (!isInitialized) {
    return (
      <>
        <title>{pageTitle}</title>
        <TechCardDetailSkeleton />
      </>
    );
  }

  if (card === undefined) {
    return (
      <>
        <title>{pageTitle}</title>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            技術カードが見つかりません
          </h2>

          <TechCardNotFoundContent />
        </div>
      </>
    );
  }

  return (
    <>
      <title>{pageTitle}</title>
      <Card>
        <CardHeader>
          <CardTitle>
            <h2>{card.title}</h2>
          </CardTitle>
          <CardDescription>
            <p>{card.summary}</p>
          </CardDescription>
          <CardAction>
            <Badge variant="secondary">{card.category}</Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-2">
          <label htmlFor={statusId}>学習状況</label>
          <NativeSelect
            className="w-full"
            id={statusId}
            value={card.learningStatus}
            onChange={(e) =>
              updateCard(card.id, e.target.value as LearningStatus)
            }
          >
            {LEARNING_STATUSES.map((status) => (
              <NativeSelectOption key={status} value={status}>
                {status}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </CardContent>
      </Card>
    </>
  );
}
