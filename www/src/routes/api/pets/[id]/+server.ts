import { getPet } from "$lib/pets.remote";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params: { id } }) => {
  const pet = await getPet(id);
  return new Response(JSON.stringify(pet));
};
