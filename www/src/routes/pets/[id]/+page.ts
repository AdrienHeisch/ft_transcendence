import { error } from "@sveltejs/kit";
import { getPerson } from "$lib/persons.remote";
import { getPet } from "$lib/pets.remote";
import { promiseToRemoteQuery } from "$lib/typeUtils";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({
  data: { currentUser, cities },
  params: { id },
}) => {
  const pet = getPet(id);
  const loadedPet = await pet;
  if (!loadedPet) error(404);
  return {
    currentUser,
    cities,
    pet: promiseToRemoteQuery(pet),
    owner: promiseToRemoteQuery(getPerson(loadedPet.ownerId)),
  };
};
