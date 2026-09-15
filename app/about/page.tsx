export default function About() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
      <section className="space-y-6 max-w-2xl">
        <h1 className="text-2xl font-semibold tracking-tight">
          Tsumikiについて
        </h1>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight">Tsumikiとは</h2>
          <p className="text-sm text-muted-foreground leading-7">
            自身が学んだことをカード形式で管理し、視覚的にわかりやすく、積み上げていくようなアプリです
          </p>
        </div>
      </section>
    </main>
  );
}
