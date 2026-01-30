import { PrivateStorage } from "$lib/server/storage";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
  return {
    files: PrivateStorage.list({ prefix: "demo/", delimiter: "/" }),
  };
};
