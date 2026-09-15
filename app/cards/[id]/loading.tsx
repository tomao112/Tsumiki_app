import TechCardDetailSkeleton from "./tech-card-detail-skeleton";

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
      <section className="max-w-2xl space-y-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          技術カード詳細
        </h1>
        <TechCardDetailSkeleton />
      </section>
    </main>
  );
}
