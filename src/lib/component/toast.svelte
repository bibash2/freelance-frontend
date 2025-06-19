<script lang="ts">
  import { toastStore } from '$lib/stores/toast';
</script>

{#each $toastStore as toast (toast.id)}
  <div
    class="toast"
    class:success={toast.type === 'success'}
    class:error={toast.type === 'error'}
    class:warning={toast.type === 'warning'}
    class:info={toast.type === 'info'}
  >
    {toast.message}
  </div>
{/each}

<style>
  .toast {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 12px 20px;
    border-radius: 6px;
    color: white;
    z-index: 1000;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    min-width: 200px;
    text-align: center;
    margin-bottom: 10px;
    animation: slideIn 0.3s ease-out;
  }

  .toast.success {
    background-color: #4CAF50;
  }

  .toast.error {
    background-color: #F44336;
  }

  .toast.warning {
    background-color: #FF9800;
  }

  .toast.info {
    background-color: #2196F3;
  }

  @keyframes slideIn {
    from {
      transform: translateX(-50%) translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
  }
</style>