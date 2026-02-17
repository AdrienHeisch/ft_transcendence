import { getPerson } from "$lib/persons.remote";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params: { id } }) => {
  const person = await getPerson(id);
  return new Response(JSON.stringify(person));
};
