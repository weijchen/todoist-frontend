import { useState, useEffect } from 'react';

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState(undefined);

  useEffect(() => {
    function handleResize() {
      const windowWidth =
        window.innerWidth < 480 ? 'sm' : window.innerWidth < 768 ? 'md' : window.innerWidth < 1024 ? 'lg' : 'xl';
      setWindowSize(windowWidth);
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
