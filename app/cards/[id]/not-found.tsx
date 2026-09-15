import TechCardNotFoundContent from "./tech-card-not-found-content";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
      <section className="max-w-2xl space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          技術カードが見つかりません
        </h1>
        <TechCardNotFoundContent />
      </section>
    </main>
  );
}
