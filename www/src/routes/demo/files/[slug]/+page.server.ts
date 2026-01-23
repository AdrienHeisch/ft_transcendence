import { error } from "@sveltejs/kit";
import { s3 } from "bun";
import * as storage from "$lib/storage";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const file = s3.file(`demo/${params.slug}`);
  if (!(await file.exists())) {
    error(404);
  }
  return {
    src: storage.url(storage.Bucket.Public, `demo/${params.slug}`),
    bytes: file.bytes(),
  };
};
