import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { building } from "$app/environment";
import { Bucket } from "$lib/storage";

export { Bucket };

const client = await (async () => {
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

export function getObject(bucket: Bucket, key: string) {
  return client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
}

export function upload(bucket: Bucket, key: string, file: File) {
  return new Upload({
    client: client,
    params: {
      Bucket: bucket,
      Key: key,
      Body: file.stream(),
    },
  });
}
