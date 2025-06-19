import { toastStore } from '$lib/stores/toast';

// Global toast utility
export const toast = {
  show: (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success', duration?: number) => {
    return toastStore.show(message, type, duration);
  },
  success: (message: string, duration?: number) => {
    return toastStore.success(message, duration);
  },
  error: (message: string, duration?: number) => {
    return toastStore.error(message, duration);
  },
  warning: (message: string, duration?: number) => {
    return toastStore.warning(message, duration);
  },
  info: (message: string, duration?: number) => {
    return toastStore.info(message, duration);
  },
  hide: (id: string) => {
    toastStore.hide(id);
  },
  clear: () => {
    toastStore.clear();
  }
};

// Make toast available globally for easy access
if (typeof window !== 'undefined') {
  (window as any).toast = toast;
} 