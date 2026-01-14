import type { PageServerLoad } from './$types';
import { db } from "$lib/server/db";
import * as table from "$lib/server/db/schema";

export const load: PageServerLoad = async () => {
  // Récupérer tous les animaux depuis la base de données
  const pets = await db.select().from(table.pet);
  
  return {
    pets
  };
};
