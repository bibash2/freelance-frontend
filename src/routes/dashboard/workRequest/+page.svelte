<script lang="ts">  
import WorkForCall from '$lib/component/workForCall.svelte';
let requestByMe=$state(true);
import { goto } from '$app/navigation';
import { freelanceAxios } from '$lib/action/axios.service';
import { onMount } from 'svelte';
import { browser } from '$app/environment';
let userDetail: any = $state();

onMount(async () => {
    if (browser) {
      userDetail = JSON.parse(localStorage.getItem("userDetail") || "{}");
    }
});

let workCallsByMe = $state([]);
let workCallsToMe = $state([]);

const handleByMe = async () => {
  requestByMe = true;
  const endPoint = "/work-request/by-me";
  const response = await freelanceAxios.get(endPoint);
  workCallsByMe = response.data;
}

const handleToMe = async () => {
  requestByMe = false;
  const endPoint = "/work-request/to-me";
  const response = await freelanceAxios.get(endPoint);
  workCallsToMe = response.data;
}

onMount(async () => {
  const endPoint = requestByMe? "/work-request/by-me": "/work-request/to-me";
  const response = await freelanceAxios.get(endPoint);
  if(requestByMe){
    workCallsByMe = response.data;
  }else{
    workCallsToMe = response.data;
  }
});

const handleWorkRequestClick = (call: any, type: string) => {

    // Convert the data to base64 to safely pass it in URL
    console.log(call,"call");
    const encodedData = btoa(JSON.stringify(call.user));
    
    goto(`/dashboard/workRequest/${call.id}_${type}?data=${encodedData}`);
};

</script>

<section class="py-10 px-4 bg-gray-50">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Direct Work Requests 
        <button 
        class="px-1 py-1 text-white bg-green-600 rounded-md hover:bg-green-700 transition cursor-pointer"
        onclick={() => handleByMe()}>
          By Me
        </button>
        {#if userDetail?.role.includes("SERVICE_PROVIDER")}
        <button class="px-1 py-1 text-white bg-red-600 rounded-md hover:bg-red-700 transition cursor-pointer"
        onclick={() => handleToMe()}>
          To Me
        </button>
        {/if}
      </h2>
      <!-- Grid layout -->
      {#if requestByMe}
      <div class="grid gap-6 sm:grid-cols-8 lg:grid-cols-3">
        {#each workCallsByMe as call (call.id)}
          <WorkForCall
            {...call}
            type="requestedByMe"
            on:click={() => handleWorkRequestClick(call, 'requestedByMe')}
          />
        {/each}
      </div>
    {:else}
    {console.log(requestByMe,"workCallsToMe")}
      <div class="grid gap-6 sm:grid-cols-8 lg:grid-cols-3">
        {#each workCallsToMe as call (call.id)}
          <WorkForCall
            {...call}
            type="requestedToMe"
            on:click={() => handleWorkRequestClick(call, 'requestedToMe')}
          />
        {/each}
      </div>
    {/if}
    </div>
  </section>
