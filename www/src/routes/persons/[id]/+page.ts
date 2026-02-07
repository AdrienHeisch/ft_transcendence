import { error } from "@sveltejs/kit";
import { getPerson } from "$lib/persons.remote";
import { promiseToRemoteQuery } from "$lib/typeUtils";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({
  data: { currentUser },
  params: { id },
}) => {
  const user = getPerson(id);
  if (!(await user)) error(404);
  return {
    currentUser,
    user: promiseToRemoteQuery(user),
  };
};
