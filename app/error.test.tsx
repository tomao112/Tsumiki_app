import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { describe, expect, test, vi, afterEach } from "vitest";
import ErrorPage from "./error";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
describe("Error", () => {
  test("エラーメッセージと再試行ボタンが表示される", () => {
    const retry = vi.fn();
    const error = new Error("テスト用エラー");
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    render(<ErrorPage error={error} retry={retry} />);

    const heading = screen.getByRole("heading", {
      name: "予期しないエラーが発生しました",
    });

    const button = screen.getByRole("button", { name: "再試行" });
    fireEvent.click(button);

    expect(heading).toBeDefined();
    expect(button).toBeDefined();
    expect(retry).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(error);
  });
});
