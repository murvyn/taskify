export function isOnline() {
    return typeof window !== 'undefined' && navigator.onLine;
  }