import { error } from "@sveltejs/kit";
import { s3 } from "bun";
import * as z from "zod";
import { form } from "$app/server";

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
      const n = await s3.write(key, await file.arrayBuffer());
      console.log(`${n} bytes written`);
    } catch (e) {
      console.error(`Error while uploading file to storage: ${e}`);
      error(500, "Failed to import file");
    }
    console.log("Done");
  },
);
