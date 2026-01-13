import { drizzle } from "drizzle-orm/postgres-js";
import { reset, seed } from "drizzle-seed";
import postgres from "postgres";
import * as schema from "./schema";

export default async function seedDb() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
  const client = postgres(process.env.DATABASE_URL);
  const db = drizzle(client, { schema });
  await reset(db, schema);
  await seed(db, schema).refine((gen) => ({
    session: {
      count: 30,
    },
    user: {
      count: 20,
      columns: {
        bio: gen.loremIpsum(),
      },
    },
    pet: {
      count: 40,
      columns: {
        species: gen.valuesFromArray({
          values: ["Cat", "Dog", "Cow", "Fish", "Horse"],
        }),
        breed: gen.valuesFromArray({
          values: ["Red", "Orange", "Black", "White", "Green"],
        }),
      },
    },
    friendsPair: {
      count: 100,
    },
    chatMessage: {
      count: 2000,
      columns: {
        content: gen.loremIpsum(),
      },
    },
    post: {
      count: 400,
      columns: {
        content: gen.loremIpsum(),
      },
    },
  }));
}
