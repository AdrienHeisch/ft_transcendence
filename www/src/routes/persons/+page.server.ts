import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
  // TODO pagination
  return {
    persons: db.select().from(schema.user),
  };
};
