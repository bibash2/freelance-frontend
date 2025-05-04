// src/lib/stores/toastStore.ts
import { writable } from 'svelte/store';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export type Toast = {
  id: number;
  message: string;
  type: ToastType;
};

function createToastStore() {
  const { subscribe, update } = writable<Toast[]>([]);
  let idCounter = 0;

  function show(message: string, type: ToastType = 'info') {
    const id = idCounter++;
    update((toasts) => [...toasts, { id, message, type }]);

    setTimeout(() => {
      update((toasts) => toasts.filter((t) => t.id !== id));
    }, 3500);
  }

  return { subscribe, show };
}

export const toasts = createToastStore();
