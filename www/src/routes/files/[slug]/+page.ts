import { fromPublicStorage } from "../../../lib/assets";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
  return {
    imageSrc: fromPublicStorage(params.slug),
  };
};
