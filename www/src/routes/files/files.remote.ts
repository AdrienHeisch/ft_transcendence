import { form, query } from "$app/server";
import * as storage from "$lib/server/storage/public";
import { error } from "@sveltejs/kit";
import * as z from "zod";

export const getFile = query(z.string(), async (key) => {
  console.log(`Getting file at ${key}`);
  try {
    const response = await storage.get(key);
    const body = await response.Body?.transformToByteArray();
    if (!body) {
      return error(500);
    }
    return { body };
  } catch (e) {
    console.error(`Error while retrieving file from storage: ${e}`);
    error(500, "Failed to retrieve file");
  }
});

export const postFile = form(
  z.object({
    file: z.custom<File>(),
  }),
  async ({ file }) => {
    console.log(`Putting file at ${file.name} of size ${file.size}`);
    try {
      const upload = storage.upload(file.name, file);
      await upload.done();
    } catch (e) {
      console.error(`Error while uploading file to storage: ${e}`);
      error(500, "Failed to import file");
    }
    console.log("Done");
  },
);
