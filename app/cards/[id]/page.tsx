import { notFound } from "next/navigation";
import { INITIAL_TECH_CARDS } from "@/app/data/tech-card";
// import type { Metadata } from "next";
import TechCardDetail from "./tech-card-detail";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: null,
};

// const findTechCardFromParam = (id: string) => {
//   const cardId = Number(id);

//   const card = INITIAL_TECH_CARDS.find((card) => card.id === cardId);

//   if (!Number.isInteger(cardId) || cardId <= 0 || card === undefined) {
//     return undefined;
//   }

//   return card;
// };

export default async function TechCardDetailPage(
  props: PageProps<"/cards/[id]">,
) {
  const { id } = await props.params;
  // await new Promise((res) => setTimeout(res, 2000));

  const cardId = Number(id);
  if (!Number.isInteger(cardId) || cardId <= 0) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
      <section className="max-w-2xl space-y-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          技術カード詳細
        </h1>
        <TechCardDetail cardId={cardId} />
      </section>
    </main>
  );
}

// export async function generateMetadata(
//   props: PageProps<"/cards/[id]">,
// ): Promise<Metadata> {
//   const { id } = await props.params;

//   const card = findTechCardFromParam(id);
//   if (card === undefined) {
//     return {
//       title: `技術カードが見つかりません | Tsumiki`,
//     };
//   }

//   return {
//     title: `${card.title} | Tsumiki`,
//     description: card.summary,
//   };
// }

export function generateStaticParams() {
  return INITIAL_TECH_CARDS.map((item) => ({
    id: String(item.id),
  }));
}
