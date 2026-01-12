import { drizzle } from "drizzle-orm/postgres-js";
import { seed } from "drizzle-seed";
import postgres from "postgres";
import * as schema from "./schema";

export default async function seedDb() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
  const client = postgres(process.env.DATABASE_URL);
  const db = drizzle(client, { schema });
  await seed(db, schema).refine((gen) => ({
    user: {
      columns: {
        bio: gen.loremIpsum(),
      },
    },
    pet: {
      columns: {
        species: gen.valuesFromArray({
          values: ["Cat", "Dog", "Cow", "Fish", "Horse"],
        }),
        breed: gen.valuesFromArray({
          values: ["Red", "Orange", "Black", "White", "Green"],
        }),
      },
    },
    chatMessage: {
      columns: {
        content: gen.loremIpsum(),
      },
    },
    post: {
      columns: {
        content: gen.loremIpsum(),
      },
    },
  }));
}
