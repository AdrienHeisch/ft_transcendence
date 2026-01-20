import type { PageServerLoad } from './$types';
import { db } from "$lib/server/db";
import * as table from "$lib/server/db/schema";

export const load: PageServerLoad = async () => {
  // Fetch all animals from the database
  const pets = await db.select().from(table.pet);
  
  return {
    pets
  };
};
