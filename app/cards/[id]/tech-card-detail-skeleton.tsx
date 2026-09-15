import {
  Card,
  CardContent,
  CardHeader,
  CardAction,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TechCardDetailSkeleton() {
  return (
    <Card aria-busy="true">
      <p className="sr-only">技術カードを読み込んでいます</p>
      <CardHeader>
        {/* タイトル */}
        <Skeleton className="h-5 w-40 motion-reduce:animate-none" />

        {/* 概要 */}
        <Skeleton className="h-4 w-full max-w-md motion-reduce:animate-none" />

        {/* カテゴリーバッジ */}
        <CardAction>
          <Skeleton className="h-5 w-16 rounded-full motion-reduce:animate-none" />
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-2">
        {/* 学習状況ラベル */}
        <Skeleton className="h-4 w-20 motion-reduce:animate-none" />

        {/* select */}
        <Skeleton className="h-8 w-full motion-reduce:animate-none" />
      </CardContent>
    </Card>
  );
}
