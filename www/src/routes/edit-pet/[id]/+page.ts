import { error, redirect } from "@sveltejs/kit";
import { resolve } from "$app/paths";
import { getPet } from "$lib/pets.remote";
import type { Pet } from "$lib/server/db/schema";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ data, params: { id } }) => {
  const currentUser = data?.currentUser;
  const pet = await getPet(id);
  if (!pet) error(404);
  if (!currentUser || pet.ownerId !== currentUser.id) {
    redirect(303, resolve(`/pets/${id}`));
  }
  return {
    currentUser,
    pet: pet as Pet,
  };
};
