import { redirect } from "@sveltejs/kit";

export const load = ({ locals }) => {
  // Redirect authenticated users to feed
  if (locals.currentUser) {
    redirect(302, "/feed");
  }
  // Show homepage for guests
};
