import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TechCardNotFoundContent() {
  return (
    <>
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          削除されたか、URLが正しくない可能性があります
        </p>

        <Button render={<Link href="/" />}>技術カード一覧に戻る</Button>
      </div>
    </>
  );
}
