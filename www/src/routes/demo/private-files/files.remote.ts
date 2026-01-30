import { error } from "@sveltejs/kit";
import * as z from "zod";
import { form } from "$app/server";
import { PrivateStorage } from "$lib/server/storage";

export const postFile = form(
  z.object({
    file: z.custom<File>(),
  }),
  async ({ file }) => {
    const isAllowed = true;
    if (!isAllowed) {
      error(500, "Not allowed to upload");
    }
    const key = `demo/${file.name}`;
    console.log(`Putting file at ${key} of size ${file.size}`);
    try {
      const n = await PrivateStorage.upload(key, file);
      console.log(`${n} bytes written`);
    } catch (e) {
      console.error(`Error while uploading file to storage: ${e}`);
      error(500, "Failed to import file");
    }
    console.log("Done");
  },
);
