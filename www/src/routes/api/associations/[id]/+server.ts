import { getAssociation } from "$lib/associations.remote";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params: { id } }) => {
  const association = await getAssociation(id);
  return new Response(JSON.stringify(association));
};
