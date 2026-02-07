import type { RemoteQuery } from "@sveltejs/kit";

export function promiseToRemoteQuery<T>(
  promise: Promise<T | undefined>,
): RemoteQuery<T> {
  return promise as RemoteQuery<T>;
}
