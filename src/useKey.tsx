import { useEffect } from 'react';

export function useKey(key: string, action: () => void) {
  useEffect(() => {
    function callback(evt: KeyboardEvent) {
      if (evt.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    }
    document.addEventListener('keydown', callback);

    return () => {
      document.removeEventListener('keydown', callback);
    };
  }, [action, key]);
}
