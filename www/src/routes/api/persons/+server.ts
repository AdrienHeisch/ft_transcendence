import { getPersons } from "$lib/persons.remote";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
  const persons = await getPersons({ search: "", sortBy: "lastName" });
  return new Response(JSON.stringify(persons));
};
