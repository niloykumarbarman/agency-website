import { fetchTechnologies } from "@/lib/technologies";
import TechnologiesView from "./TechnologiesView";

export default async function Technologies() {
  const technologies = await fetchTechnologies();
  return <TechnologiesView technologies={technologies} />;
}
