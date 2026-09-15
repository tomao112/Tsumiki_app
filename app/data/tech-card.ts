import type { TechCardData } from "../types/tech-card";

export const INITIAL_TECH_CARDS: TechCardData[] = [
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
