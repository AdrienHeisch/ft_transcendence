import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => ({
  cities: db.select().from(schema.city),
});

export const trailingSlash = "always";
