import { error } from "@sveltejs/kit";
import { public_storage } from "$lib/server/storage";
import * as storage from "$lib/storage";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const file = public_storage.file(`demo/${params.slug}`);
  if (!(await file.exists())) {
    error(404);
  }
  return {
    src: storage.url(storage.Bucket.Public, `demo/${params.slug}`),
    bytes: file.bytes(),
  };
};
