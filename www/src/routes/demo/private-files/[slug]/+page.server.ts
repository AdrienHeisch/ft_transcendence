import { error } from "@sveltejs/kit";
import { PrivateStorage } from "$lib/server/storage";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const file = PrivateStorage.get(`demo/${params.slug}`);
  if (!(await file.exists())) {
    error(404);
  }
  return {
    src: PrivateStorage.presignedUrl(`demo/${params.slug}`, 30),
    bytes: file.bytes(),
  };
};
