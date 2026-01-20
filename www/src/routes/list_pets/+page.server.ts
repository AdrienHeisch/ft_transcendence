import { db } from "$lib/server/db";
import * as table from "$lib/server/db/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
  // Fetch all animals from the database
  return {
    pets: db.select().from(table.pet),
  };
};
