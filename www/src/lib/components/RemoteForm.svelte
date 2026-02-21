<script lang="ts" generics="Input extends RemoteFormInput | void, Output">
import type { RemoteForm, RemoteFormInput, RemoteQuery } from "@sveltejs/kit";
import type { Snippet } from "svelte";

const {
  children,
  class: classes,
  function: remoteFunction,
  updates,
  onloadstart,
  onloadend,
  onprogress,
}: {
  children: Snippet;
  function: RemoteForm<Input, Output>;
  updates?: Array<RemoteQuery<any>>;
  class?: string;
  onloadstart?: () => void;
  onloadend?: () => void;
  onprogress?: (progress: number) => void;
} = $props();

async function submitXHR(data: FormData) {
  return new Promise<void>((resolve, reject) => {
    console.log(data);
    var size = Array.from(data.values())
      .map((value: FormDataEntryValue) =>
        typeof value === "string" ? new Blob([value]).size : value.size,
      )
      .reduce((acc, n) => acc + n, 0);

    var request = new XMLHttpRequest();

    if (onloadstart) {
      request.upload.onloadstart = onloadstart;
    }

    if (onloadend) {
      request.upload.onloadend = onloadend;
    }

    if (onprogress) {
      request.upload.onprogress = (e) => onprogress(e.loaded / size);
    }

    const action = remoteFunction.action.replace(
      /\?\/remote=(.+)%2F(.+)/,
      "$1/$2",
    );
    request.open(remoteFunction.method, `/_app/remote/${action}`);
    request.timeout = 45000;
    request.onload = () => {
      if (request.status >= 200 && request.status < 300) {
        resolve();
      } else {
        reject();
      }
    };
    request.send(data);
  });
}
</script>

<form
  class={classes}
  enctype="multipart/form-data"
  {...remoteFunction.enhance(async ({ form, data }) => {
    if (typeof data !== "object") {
      return;
    }
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value as string | Blob);
    }
    try {
      await submitXHR(formData);
      form.reset();
      if (updates) {
        await Promise.all(updates.map(query => query.refresh()));
      }
    } catch {
      // TODO on error ?
    }
  })}
>
 {@render children()}
</form>
