import { eq } from "drizzle-orm";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ params }) => {
  return {
    pet: db.select().from(schema.pet).where(eq(schema.pet.id, params.id)),
  };
};
