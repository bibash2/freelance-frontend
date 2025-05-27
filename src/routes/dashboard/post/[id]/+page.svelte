<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { freelanceAxios } from '$lib/action/axios.service';
  import PostDetail from "$lib/component/PostDetail.svelte";
  
  let id = $page.params.id;
  let isLoading = $state(true);
  let postData = $state({
    postDetail: null,
    bids: []
  });
  
  onMount(async () => {
    console.log('Component mounted');
    console.log('ID from params:', id);
    
    try {
      if(id) {
        console.log('Attempting API call to:', `/post/${id}`);
        const response = await freelanceAxios.get(`/post/${id}`);
        console.log('API Response:', response);
        postData = {
          postDetail: response.data.postDetail,
          bids: response.data.bids || []
        };
        console.log('Post details:', postData);
      } else {
        console.log('No ID found in params');
      }
    } catch (error: any) {
      console.error('Error fetching post details:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
      }
    } finally {
      isLoading = false;
    }
  });
</script> 

<div>
    {#if isLoading}
      <div class="flex justify-center items-center min-h-[400px]">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    {:else}
      <PostDetail postData={postData}/>
    {/if}
</div>
