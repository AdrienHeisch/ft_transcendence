import { getAssociations } from "$lib/associations.remote";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
  const associations = await getAssociations({ search: "", sortBy: "name" });
  return new Response(JSON.stringify(associations));
};
