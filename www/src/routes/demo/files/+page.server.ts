import { PublicStorage } from "$lib/server/storage";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
  return {
    files: PublicStorage.list({ prefix: "demo/", delimiter: "/" }),
  };
};
