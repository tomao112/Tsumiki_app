"use client";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

export default function Error({ error, retry }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-100 gap-4">
      <h1>予期しないエラーが発生しました</h1>
      <Button onClick={retry}>再試行</Button>
    </div>
  );
}
