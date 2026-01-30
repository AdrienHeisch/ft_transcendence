import { error } from "@sveltejs/kit";
import { getPet } from "$lib/pets.remote";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  return {
    pet: (await getPet(params.id)) ?? error(404),
  };
};
