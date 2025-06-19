import { writable } from 'svelte/store';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

function createToastStore() {
  const { subscribe, update } = writable<Toast[]>([]);

  function addToast(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success', duration: number = 3000) {
    const id = crypto.randomUUID();
    const toast: Toast = { id, message, type, duration };
    
    update(toasts => [...toasts, toast]);

    // Auto remove after duration
    setTimeout(() => {
      removeToast(id);
    }, duration);

    return id;
  }

  function removeToast(id: string) {
    update(toasts => toasts.filter(t => t.id !== id));
  }

  function clearAll() {
    update(() => []);
  }

  return {
    subscribe,
    show: addToast,
    hide: removeToast,
    clear: clearAll,
    success: (message: string, duration?: number) => addToast(message, 'success', duration),
    error: (message: string, duration?: number) => addToast(message, 'error', duration),
    warning: (message: string, duration?: number) => addToast(message, 'warning', duration),
    info: (message: string, duration?: number) => addToast(message, 'info', duration)
  };
}

export const toastStore = createToastStore(); 