<script lang="ts">
const { data } = $props();
$effect(() => console.log(data.src));
</script>

<img alt="nice" src={data.src} width="600" />
