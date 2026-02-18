import { error } from "@sveltejs/kit";
import z from "zod";
import { getPets } from "$lib/pets.remote";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url }) => {
  const search = url.searchParams.get("q") ?? "";
  const owner = url.searchParams.get("owner") ?? undefined;
  const species = url.searchParams.get("species") ?? undefined;
  const sortByParse = z.safeParse(
    z.enum(["name", "species"]),
    url.searchParams.get("sortBy") ?? "name",
  );
  const sortBy = sortByParse.success ? sortByParse.data : error(400);
  const pets = await getPets({ search, owner, species, sortBy });
  return new Response(JSON.stringify(pets));
};
