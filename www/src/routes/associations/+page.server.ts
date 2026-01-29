import { getTableColumns } from "drizzle-orm";
import * as schema from "$lib/server/db/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
  const searchQuery = url.searchParams.get("search")?.toLowerCase() || "";
  const selectedType =
    schema.associationTypeSchema.safeParse(url.searchParams.get("type")).data ??
    null;
  const selectedCity = url.searchParams.get("city");
  const sortBy = (() => {
    const sortBy = url.searchParams.get("sort");
    if (
      !sortBy ||
      !Object.keys(getTableColumns(schema.association)).find(
        (key) => key === sortBy,
      )
    )
      return "name";
    return sortBy as "name" | "type";
  })();

  return {
    associationTypes: schema.associationType.enumValues,
    filters: {
      search: searchQuery,
      type: selectedType,
      city: selectedCity,
      sort: sortBy,
    },
  };
};
