import { error, type RemoteQuery } from "@sveltejs/kit";
import { getPet } from "$lib/pets.remote";
import type { Pet } from "$lib/server/db/schema";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({
  data: { currentUser },
  params: { id },
}) => {
  const pet = getPet(id);
  if (!(await pet)) error(404);
  return {
    currentUser,
    pet: pet as RemoteQuery<Pet>,
  };
};
