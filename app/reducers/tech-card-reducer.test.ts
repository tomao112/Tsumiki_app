import { describe, expect, test } from "vitest";
import { techCardReducer } from "./tech-card-reducer";
import type { NewTechCardData, TechCardData } from "../types/tech-card";

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
describe("techCardReducer", () => {
  test("指定したIDのカードを削除できる", () => {
    // Arrange: 初期位置
    const originalCards = [...INITIAL_TECH_CARDS];

    // Act: 実行対象の関数
    const result = techCardReducer(INITIAL_TECH_CARDS, {
      type: "delete",
      payload: 1,
    });

    // Assert: 検証
    expect(result).toHaveLength(2);
    expect(result.some((card) => card.id === 1)).toBe(false);
    expect(INITIAL_TECH_CARDS).toEqual(originalCards);
  });

  test("カードを追加すると最大IDの次のIDが設定される", () => {
    const card: NewTechCardData = {
      title: "スプレッド構文",
      category: "JavaScript",
      summary: "配列の要素やオブジェクトのプロパティを展開する構文",
      learningStatus: "学習中",
    };

    const result = techCardReducer(INITIAL_TECH_CARDS, {
      type: "add",
      payload: card,
    });

    expect(result).toHaveLength(4);
    expect(result.find((card) => card.id === 4)).toBeDefined();
    expect(result.at(-1)).toEqual({
      id: 4,
      ...card,
      isPinned: false,
    });
  });

  test("指定したカードの学習状態だけを更新できる", () => {
    // Arrange：変更前のデータを保存する
    const originalCards = structuredClone(INITIAL_TECH_CARDS);

    // Act
    const result = techCardReducer(INITIAL_TECH_CARDS, {
      type: "update",
      payload: 2,
      status: "理解済み",
    });

    // Assert：件数、対象カード、対象外カード、元データを検証する
    const updatedCard = result.find((card) => card.id === 2);
    const unchangedCard = result.find((card) => card.id === 1);

    expect(result).toHaveLength(INITIAL_TECH_CARDS.length);
    expect(updatedCard?.learningStatus).toBe("理解済み");
    expect(unchangedCard).toEqual(originalCards[0]);
    expect(INITIAL_TECH_CARDS).toEqual(originalCards);
  });

  test("存在しないIDを指定した場合は内容が変わらない", () => {
    const result = techCardReducer(INITIAL_TECH_CARDS, {
      type: "update",
      payload: 999,
      status: "理解済み",
    });

    expect(result).toEqual(INITIAL_TECH_CARDS);
  });

  test("指定したカードのisPinnedがfalseからtrueに切り替わる", () => {
    // Arrange
    const originalCards = structuredClone(INITIAL_TECH_CARDS);
    const beforeExecution = structuredClone(originalCards);

    // Act
    const result = techCardReducer(originalCards, {
      type: "togglePin",
      payload: 1,
    });

    const pinnedCard = result.find((card) => card.id === 1);
    const unchangedCard = result.find((card) => card.id === 2);

    // Assert
    expect(pinnedCard?.isPinned).toBe(true);
    expect(unchangedCard).toEqual(beforeExecution[1]);
    expect(originalCards).toEqual(beforeExecution);
  });
});
