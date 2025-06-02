<script lang="ts">
    import WorkCallDetail from '$lib/component/workCallDetail.svelte';
    import { page } from '$app/stores';
    const [id, type] = $page.params.id.split("_");
    
    
    // Get the encoded data from URL
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get('data');
    let userData = null;
    
    if (encodedData) {
        // Decode the base64 data
        const decodedData = atob(encodedData);
        // Parse the JSON string back to an object
        userData = JSON.parse(decodedData);
        console.log('Decoded user data:', userData);
    }
</script>

<div>
    <WorkCallDetail id={id} type={type} user={userData} />
</div>