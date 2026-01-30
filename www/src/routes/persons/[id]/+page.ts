import { error, type RemoteQuery } from "@sveltejs/kit";
import { getPerson } from "$lib/persons.remote";
import type { User } from "$lib/server/db/schema";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({
  data: { currentUser },
  params: { id },
}) => {
  const user = getPerson(id);
  (await user) ?? error(404);
  return {
    currentUser,
    user: user as RemoteQuery<User>,
  };
};
