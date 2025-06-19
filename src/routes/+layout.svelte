<script lang="ts">
    import "../app.css"
    import Toast from "$lib/component/toast.svelte";
    let { children } = $props();
</script>

{@render children()}
<Toast />