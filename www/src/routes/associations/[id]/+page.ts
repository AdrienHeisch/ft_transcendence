import { error } from "@sveltejs/kit";
import { getAssociation } from "$lib/associations.remote";
import { promiseToRemoteQuery } from "$lib/typeUtils";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({
  data: { currentUser },
  params: { id },
}) => {
  const association = getAssociation(id);
  if (!(await association)) error(404);
  return {
    currentUser,
    association: promiseToRemoteQuery(association),
  };
};
