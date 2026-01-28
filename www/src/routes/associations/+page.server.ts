import { getTableColumns } from "drizzle-orm";
import * as schema from "$lib/server/db/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
  const searchQuery = url.searchParams.get("search")?.toLowerCase() || "";
  const selectedType = url.searchParams.get("type");
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
    return sortBy as "name" | "type" | "city" | "animalsCount";
  })();

  return {
    filters: {
      search: searchQuery,
      type: selectedType,
      city: selectedCity,
      sort: sortBy,
    },
  };
};
