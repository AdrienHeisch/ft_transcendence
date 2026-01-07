import * as storage from "$lib/storage/public";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
  return {
    src: storage.url(params.slug),
  };
};
