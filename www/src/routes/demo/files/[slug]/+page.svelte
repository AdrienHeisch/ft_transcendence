<script lang="ts">
const { data } = $props();
$effect(() => console.log(data.src));
</script>

URL ->
<img alt="nice" src={data.src} width="600" />

Bytes ->
<img alt="cool" src={`data:image/png;base64,${((await data.bytes).toBase64())}`} width=600 />
