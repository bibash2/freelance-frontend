<script lang="ts">
    import WorkCallDetail from '$lib/component/workCallDetail.svelte';
    import { page } from '$app/stores';
    const [id, type] = $page.params.id.split("_");
</script>

<div>
    {console.log(id, type)}
    <WorkCallDetail  type={type}/>
</div>