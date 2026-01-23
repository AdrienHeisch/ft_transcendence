import { building } from "$app/environment";
import { Bucket } from "$lib/storage";

export { Bucket };

export const public_storage = await (async () => {
  // TODO this looks like a hack
  let accessKeyId = "",
    secretAccessKey = "";
  try {
    accessKeyId = await Bun.file("/tmp/api-keys/storage-id").text();
    secretAccessKey = await Bun.file("/tmp/api-keys/storage-secret").text();
  } catch (e) {
    if (!building) {
      console.error(e);
    }
  }

  return new Bun.S3Client({
    endpoint: "http://storage:3900/",
    region: "garage",
    accessKeyId,
    secretAccessKey,
    bucket: "public",
  });
})();
