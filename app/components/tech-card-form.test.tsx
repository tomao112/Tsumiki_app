import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { describe, expect, test, vi, afterEach } from "vitest";
import TechCardForm from "./tech-card-form";

afterEach(cleanup);
describe("TechCardForm", () => {
  test("タイトルが未入力の場合はエラーを表示する", () => {
    const onAdd = vi.fn();

    render(<TechCardForm onAdd={onAdd} />);

    const button = screen.getByRole("button", { name: "追加" });
    fireEvent.click(button);

    const alert = screen.getByRole("alert");
    expect(alert.textContent).toBe("タイトルを入力してください");
    expect(onAdd).not.toHaveBeenCalled();
  });

  test("値が正しく入力された場合にカードの追加処理が実行される", () => {
    const onAdd = vi.fn();

    render(<TechCardForm onAdd={onAdd} />);

    const titleInput = screen.getByLabelText<HTMLInputElement>("タイトル");

    const summaryInput = screen.getByLabelText<HTMLTextAreaElement>("概要");

    fireEvent.change(titleInput, {
      target: { value: "useState" },
    });
    fireEvent.change(summaryInput, {
      target: { value: "コンポーネントに状態を持たせるHook" },
    });

    const button = screen.getByRole("button", { name: "追加" });
    fireEvent.click(button);

    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith({
      title: "useState",
      summary: "コンポーネントに状態を持たせるHook",
      category: "React",
      learningStatus: "未学習",
    });
    expect(titleInput.value).toBe("");
    expect(summaryInput.value).toBe("");
    expect(screen.queryByRole("alert")).toBeNull();
  });
});
