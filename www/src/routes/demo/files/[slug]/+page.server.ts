import { error } from "@sveltejs/kit";
import { PublicStorage } from "$lib/server/storage";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const file = PublicStorage.get(`demo/${params.slug}`);
  if (!(await file.exists())) {
    error(404);
  }
  return {
    src: PublicStorage.url(`demo/${params.slug}`),
    bytes: file.bytes(),
  };
};
