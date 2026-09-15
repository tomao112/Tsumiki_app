import {
  Card,
  CardContent,
  CardHeader,
  CardAction,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TechCardListSkeleton() {
  const SKELETON_CARD_IDS = [1, 2, 3];
  return (
    <>
      <p className="sr-only">技術カードを読み込んでいます</p>
      <ul aria-busy="true" className="grid gap-4 lg:grid-cols-2">
        {SKELETON_CARD_IDS.map((card) => (
          <li key={card}>
            <Card size="sm" className="h-full">
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
              <CardFooter className="flex flex-wrap gap-2">
                <Skeleton className="h-8 w-14 rounded-lg motion-reduce:animate-none" />
                <Skeleton className="h-8 w-14 rounded-lg motion-reduce:animate-none" />
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}
