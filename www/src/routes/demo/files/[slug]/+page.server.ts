import * as storage from "$lib/storage";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ params }) => {
  return {
    src: storage.url(storage.Bucket.Public, `demo/${params.slug}`),
  };
};
