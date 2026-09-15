import { getTechCards } from "@/app/lib/tech-card-repository";

export async function GET() {
  const cards = await getTechCards();

  return Response.json({
    cards,
  });
}
