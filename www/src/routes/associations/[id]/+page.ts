import { error, type RemoteQuery } from "@sveltejs/kit";
import { getAssociation } from "$lib/associations.remote";
import type { Association } from "$lib/server/db/schema";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params: { id } }) => {
  const association = getAssociation(id);
  if (!(await association)) error(404);
  return {
    association: association as RemoteQuery<Association>,
  };
};
