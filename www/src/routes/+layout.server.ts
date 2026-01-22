import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = ({ locals }) => {
  const currentUser = locals.user;
  return {
    currentUser,
  };
};
