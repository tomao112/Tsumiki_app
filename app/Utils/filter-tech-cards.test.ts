import { describe, expect, test } from "vitest";
import type {
  CategoryFilter,
  LearningStatusFilter,
  SortOrder,
  TechCardData,
} from "../types/tech-card";
import { filterTechCards } from "./filter-tech-cards";

const INITIAL_TECH_CARDS: TechCardData[] = [
  {
    id: 1,
    title: "JSX",
    category: "React",
    summary: "JavaScriptの中にHTMLのような記述を書ける構文",
    learningStatus: "学習中",
    isPinned: false,
  },
  {
    id: 2,
    title: "三項演算子",
    category: "JavaScript",
    summary: "if文の条件分岐を簡潔に記述できる記法",
    learningStatus: "学習中",
    isPinned: false,
  },
  {
    id: 3,
    title: "スプレッド構文",
    category: "JavaScript",
    summary: "配列の要素やオブジェクトのプロパティを展開する構文",
    learningStatus: "学習中",
    isPinned: false,
  },
];
describe("filterTechCard", () => {
  test("カテゴリーがReactのカードだけ取得できる", () => {
    // Arrange: 初期位置
    const originalCards: TechCardData[] = [...INITIAL_TECH_CARDS];
    const category: CategoryFilter = "React";
    const learningStatus: LearningStatusFilter = "すべて";
    const searchText = "";
    const sortOrder: SortOrder = "title";

    // Act: 実行対象の関数
    const result = filterTechCards({
      cards: originalCards,
      category,
      learningStatus,
      searchText,
      sortOrder,
    });

    // Assert: 検証
    expect(result.map((card) => card.id)).toEqual([1]);
  });

  test("newest指定時にIDの降順になっている", () => {
    // Arrange: 初期位置
    const originalCards = [...INITIAL_TECH_CARDS] as TechCardData[];
    const category: CategoryFilter = "すべて";
    const learningStatus: LearningStatusFilter = "すべて";
    const searchText = "";
    const sortOrder: SortOrder = "newest";

    // Act: 実行対象の関数
    const result = filterTechCards({
      cards: originalCards,
      category,
      learningStatus,
      searchText,
      sortOrder,
    });

    // Assert: 検証
    expect(result.map((card) => card.id)).toEqual([3, 2, 1]);
  });

  test("関数実行後、元配列が変更されていない", () => {
    // Arrange: 初期位置
    const originalCards = structuredClone(INITIAL_TECH_CARDS);
    const beforeExecution = structuredClone(originalCards);

    // Act
    filterTechCards({
      cards: originalCards,
      category: "すべて",
      learningStatus: "すべて",
      searchText: "",
      sortOrder: "newest",
    });

    // Assert: 検証
    expect(originalCards).toEqual(beforeExecution);
  });
});
