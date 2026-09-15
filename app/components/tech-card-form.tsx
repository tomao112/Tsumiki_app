import type {
  LearningStatus,
  TechCategory,
  NewTechCardData,
} from "../types/tech-card";
import { LEARNING_STATUSES, TECH_CATEGORIES } from "../types/tech-card";
import { useActionState, useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

type TechCardFormProps = {
  onAdd: (newCard: NewTechCardData) => void;
};

type FormError = {
  field: "title" | "summary";
  message: string;
} | null;

type FormState = {
  error: FormError;
  submitCiunt: number;
};

const INITIAL_FORM_STATE: FormState = {
  error: null,
  submitCiunt: 0,
};

export default function TechCardForm({ onAdd }: TechCardFormProps) {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState<TechCategory>("React");
  const [learningStatus, setLearningStatus] =
    useState<LearningStatus>("未学習");

  const addCardAction = (
    previousState: FormState,
    formData: FormData,
  ): FormState => {
    const nextSubmitCount = previousState.submitCiunt + 1;
    const titleValue = formData.get("title");
    const summaryValue = formData.get("summary");
    const categoryValue = formData.get("category");
    const learningStatusValue = formData.get("learnStatus");

    const title = typeof titleValue === "string" ? titleValue.trim() : "";
    const summary = typeof summaryValue === "string" ? summaryValue.trim() : "";
    const category = categoryValue as TechCategory;
    const learningStatus = learningStatusValue as LearningStatus;

    if (!title) {
      return {
        error: { field: "title", message: "タイトルを入力してください" },
        submitCiunt: nextSubmitCount,
      };
    }
    if (!summary) {
      return {
        error: { field: "summary", message: "概要を入力してください" },
        submitCiunt: nextSubmitCount,
      };
    }

    onAdd({
      title,
      summary,
      category,
      learningStatus,
    });

    setTitle("");
    setSummary("");
    setCategory("React");
    setLearningStatus("未学習");

    return { error: null, submitCiunt: nextSubmitCount };
  };

  const [formState, formAction, isPending] = useActionState(
    addCardAction,
    INITIAL_FORM_STATE,
  );

  const titleId = useId();
  const summaryId = useId();
  const categoryId = useId();
  const learningStatusId = useId();

  const titleErrorId = useId();
  const summaryErrorId = useId();

  return (
    <form className="space-y-5 w-full" action={formAction}>
      <div className="grid gap-2">
        <label htmlFor={titleId}>タイトル</label>
        <Input
          aria-invalid={formState.error?.field === "title"}
          aria-describedby={
            formState.error?.field === "title" ? titleErrorId : undefined
          }
          id={titleId}
          type="text"
          value={title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        {formState.error?.field === "title" && (
          <p
            id={titleErrorId}
            className="text-sm text-destructive"
            role="alert"
          >
            {formState.error.message}
          </p>
        )}
      </div>
      <div className="grid gap-2">
        <label htmlFor={summaryId}>概要</label>
        <Textarea
          aria-invalid={formState.error?.field === "summary"}
          aria-describedby={
            formState.error?.field === "summary" ? summaryErrorId : undefined
          }
          id={summaryId}
          value={summary}
          name="summary"
          onChange={(e) => setSummary(e.target.value)}
        />
        {formState.error?.field === "summary" && (
          <p
            id={summaryErrorId}
            className="text-sm text-destructive"
            role="alert"
          >
            {formState.error.message}
          </p>
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor={categoryId}>カテゴリー</label>
          <NativeSelect
            id={categoryId}
            value={category}
            name="category"
            onChange={(e) => setCategory(e.target.value as TechCategory)}
          >
            {TECH_CATEGORIES.map((category) => (
              <NativeSelectOption key={category} value={category}>
                {category}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
        <div className="grid gap-2">
          <label htmlFor={learningStatusId}>学習状況</label>
          <NativeSelect
            id={learningStatusId}
            value={learningStatus}
            name="learnStatus"
            onChange={(e) =>
              setLearningStatus(e.target.value as LearningStatus)
            }
          >
            {LEARNING_STATUSES.map((status) => (
              <NativeSelectOption key={status} value={status}>
                {status}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
        <div></div>
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? "追加中..." : "追加"}
      </Button>
      <p>フォームの送信回数：{formState.submitCiunt}</p>
    </form>
  );
}
