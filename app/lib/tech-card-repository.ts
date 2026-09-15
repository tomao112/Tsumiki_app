import "server-only";
import { INITIAL_TECH_CARDS } from "../data/tech-card";
import { TechCardData } from "../types/tech-card";

export async function getTechCards(): Promise<TechCardData[]> {
  return INITIAL_TECH_CARDS;
}
