import { building } from "$app/environment";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

const client = await (async () => {
  // TODO this looks like a hack
  let accessKeyId = "", secretAccessKey = "";
  try {
    accessKeyId = await Deno.readTextFile("/tmp/api-keys/storage-id");
    secretAccessKey = await Deno.readTextFile("/tmp/api-keys/storage-secret");
  } catch (e) {
    if (!building) {
      console.error(e);
    }
  }

  return new S3Client({
    endpoint: "http://storage:3900/",
    forcePathStyle: true,
    region: "garage",
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
})();

export function get(bucket: string, key: string) {
  return client.send(
    new GetObjectCommand({ Bucket: bucket, Key: key }),
  );
}

export function upload(bucket: string, key: string, file: File) {
  return new Upload({
    client: client,
    params: {
      Bucket: bucket,
      Key: key,
      Body: file.stream(),
    },
  });
}
