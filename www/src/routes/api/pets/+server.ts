import { getPets } from "$lib/pets.remote";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
  const pets = await getPets({ search: "", sortBy: "name" });
  return new Response(JSON.stringify(pets));
};
