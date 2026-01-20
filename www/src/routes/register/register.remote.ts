import z from "zod";
import { form } from "$app/server";

export const register = form(z.object({}), (_) => {
  // TODO register user
});
