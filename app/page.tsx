import TechCardList from "./components/tech-card-list";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
      <section className="space-y-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          技術カード一覧
        </h1>
        <TechCardList />
      </section>
    </main>
  );
}
