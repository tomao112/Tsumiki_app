"use client";
import { useId, useRef, useMemo, useTransition } from "react";
import type {
  LearningStatusFilter,
  NewTechCardData,
  SortOrder,
  LearningStatus,
  CategoryFilter,
} from "../types/tech-card";
import TechCard from "./tech-card";
import TechCardForm from "./tech-card-form";
import { LEARNING_STATUSES, TECH_CATEGORIES } from "../types/tech-card";
import { useTechCardsContext } from "../context/tech-card-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { RotateCcwIcon } from "lucide-react";
import TechCardListSkeleton from "./tech-card-list-skeleton";
import { filterTechCards } from "../Utils/filter-tech-cards";
import { toast } from "@/components/ui/toast";
import useTechCardFilter from "../hooks/use-tech-card-filter";

const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: "newest", label: "新しい順" },
  { value: "oldest", label: "古い順" },
  { value: "title", label: "タイトル順" },
];

const initialCounts: Record<LearningStatus, number> = {
  未学習: 0,
  学習中: 0,
  復習中: 0,
  理解済み: 0,
};

export default function TechCardList() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isPending, startTransition] = useTransition();

  const searchId = useId();
  const statusFilterId = useId();
  const sortId = useId();

  const {
    cards,
    isInitialized,
    addCard,
    deleteCard,
    updateCard,
    editCard,
    resetLearningStatus,
    togglePin,
    errorMessage,
  } = useTechCardsContext();

  const {
    selectedCategory,
    selectedStatus,
    searchText,
    sort,
    setSelectedCategory,
    setSelectedStatus,
    setSearchText,
    setSort,
    resetFilters,
    deferredSearchText,
  } = useTechCardFilter();

  const visibleCards = useMemo(() => {
    return filterTechCards({
      cards,
      category: selectedCategory,
      learningStatus: selectedStatus,
      searchText: deferredSearchText,
      sortOrder: sort,
    });
  }, [cards, selectedCategory, selectedStatus, deferredSearchText, sort]);

  const handleAdd = (newTechCardData: NewTechCardData) => {
    addCard(newTechCardData);
    toast.add({
      type: "success",
      title: "カードを追加しました",
    });
  };

  const handleDelete = (id: number) => {
    deleteCard(id);
    toast.add({
      type: "success",
      title: "カードを削除しました",
    });
  };

  const handleReset = () => {
    resetFilters();
    inputRef.current?.focus();
  };

  const handleCategoryChange = (category: CategoryFilter) => {
    startTransition(() => {
      setSelectedCategory(category);
    });
  };
  const stats = cards.reduce(
    (acc, card) => {
      acc[card.learningStatus]++;
      return acc;
    },
    { ...initialCounts },
  );

  return (
    <div className="space-y-6">
      <div>
        <TechCardForm onAdd={handleAdd} />
      </div>

      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="カテゴリーで絞り込む"
      >
        <Button
          variant={selectedCategory === "すべて" ? "default" : "outline"}
          aria-pressed={selectedCategory === "すべて"}
          type="button"
          onClick={() => handleCategoryChange("すべて")}
        >
          すべて
        </Button>
        {TECH_CATEGORIES.map((category) => (
          <Button
            variant={selectedCategory === category ? "default" : "outline"}
            aria-pressed={selectedCategory === category}
            key={category}
            type="button"
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="grid content-start gap-2">
          <label htmlFor={statusFilterId}>学習状況で絞り込む</label>
          <NativeSelect
            className="w-full"
            id={statusFilterId}
            value={selectedStatus}
            onChange={(e) =>
              setSelectedStatus(e.target.value as LearningStatusFilter)
            }
          >
            <NativeSelectOption value="すべて">すべて</NativeSelectOption>
            {LEARNING_STATUSES.map((status) => (
              <NativeSelectOption key={status} value={status}>
                {status}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>

        <div className="grid content-start gap-2">
          <label htmlFor={searchId}>技術カードを検索</label>
          <Input
            type="search"
            id={searchId}
            value={searchText}
            ref={inputRef}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="grid content-start gap-2">
          <label htmlFor={sortId}>並び替え</label>
          <NativeSelect
            className="w-full"
            id={sortId}
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOrder)}
          >
            {SORT_OPTIONS.map((option) => (
              <NativeSelectOption key={option.value} value={option.value}>
                {option.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
        <div className="space-y-2">
          <Button type="button" onClick={handleReset}>
            条件をリセット
          </Button>
          {isInitialized && errorMessage === null && (
            <div aria-live="polite">
              {isPending ? (
                <p>一覧を更新しています...</p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  検索結果：{visibleCards.length}件
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {isInitialized && errorMessage === null && (
        <div className="flex flex-wrap gap-2">
          <div>
            <Badge variant={"outline"}>
              カード総件数:
              <span>{cards.length}</span>
            </Badge>
          </div>
          <div>
            <Badge variant={"outline"}>
              未学習:
              <span>{stats["未学習"]}</span>
            </Badge>
          </div>
          <div>
            <Badge variant={"outline"}>
              学習中:
              <span>{stats["学習中"]}</span>
            </Badge>
          </div>
          <div>
            <Badge variant={"outline"}>
              復習中:
              <span>{stats["復習中"]}</span>
            </Badge>
          </div>
          <div>
            <Badge variant={"outline"}>
              理解済み:
              <span>{stats["理解済み"]}</span>
            </Badge>
          </div>
        </div>
      )}

      <div>
        <Button type="button" variant="outline" onClick={resetLearningStatus}>
          <RotateCcwIcon aria-hidden="true" />
          すべての学習状況をリセットする
        </Button>
      </div>

      {errorMessage ? (
        <p role="alert">{errorMessage}</p>
      ) : !isInitialized ? (
        <TechCardListSkeleton />
      ) : visibleCards.length === 0 ? (
        <p>該当する技術カードはありません。</p>
      ) : (
        <ul className="grid gap-4 lg:grid-cols-2">
          {visibleCards.map((card) => (
            <TechCard
              key={card.id}
              techCard={card}
              onDelete={handleDelete}
              onUpdate={updateCard}
              onEdit={editCard}
              onToggle={togglePin}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
