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
  updates: Array<RemoteQuery<any>>;
  class?: string;
  onloadstart?: () => void;
  onloadend?: () => void;
  onprogress?: (progress: number) => void;
} = $props();

function submitXHR(data: FormData) {
  console.log(data);
  var size = Array.from(data.values())
    .map((value: FormDataEntryValue) =>
      typeof value === "string" ? new Blob([value]).size : value.size,
    )
    .reduce((acc, n) => acc + n, 0);

  var request = new XMLHttpRequest();

  if (onloadstart) {
    request.upload.addEventListener("loadstart", onloadstart);
  }

  if (onloadend) {
    request.upload.addEventListener("loadend", onloadend);
  }

  if (onprogress) {
    request.upload.addEventListener("progress", (e) =>
      onprogress(e.loaded / size),
    );
  }

  const action = remoteFunction.action.replace(
    /\?\/remote=(.+)%2F(.+)/,
    "$1/$2",
  );
  request.open(remoteFunction.method, `/_app/remote/${action}`);
  request.timeout = 45000;
  request.send(data);
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
    submitXHR(formData);
    form.reset();

    console.log(updates) // TODO fix updates
    await Promise.all(updates.map(query => query.refresh()));
  })}
>
 {@render children()}
</form>
