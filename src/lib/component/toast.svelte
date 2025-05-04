<script lang="ts">
    import { toasts, type Toast } from '$lib/stores/tostStore';
    import { fly } from 'svelte/transition';
  
    const icons: Record<Toast['type'], string> = {
      success: '✅',
      error: '❌',
      info: 'ℹ️',
      warning: '⚠️',
    };
  
    const bgColors: Record<Toast['type'], string> = {
      success: 'bg-green-600',
      error: 'bg-red-600',
      info: 'bg-blue-600',
      warning: 'bg-yellow-500 text-black',
    };
  </script>
  
  <div class="fixed top-4 right-4 z-50 flex flex-col gap-3">
    {#each $toasts as toast (toast.id)}
      <div
        in:fly={{ y: -10, duration: 200 }}
        out:fly={{ y: 10, duration: 200 }}
        class={`rounded-lg px-4 py-3 shadow-lg text-white flex items-center gap-3 w-72 ${bgColors[toast.type]}`}
      >
        <span class="text-lg">{icons[toast.type]}</span>
        <span class="flex-1">{toast.message}</span>
      </div>
    {/each}
  </div>
  