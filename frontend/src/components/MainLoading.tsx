import { useState, useEffect } from 'react';
import { CircleLoader } from 'react-spinners';

export const MainLoading = () => {
  const [height, setHeight] = useState(
    typeof window !== 'undefined' && window.innerWidth < 1024
      ? 'calc(100vh - 290px)'
      : 'calc(100vh - 195px)',
  );

  useEffect(() => {
    const updateHeight = () => {
      setHeight(window.innerWidth < 1024 ? 'calc(100vh - 275px)' : 'calc(100vh - 185px)');
    };

    // Listen for window resize events
    window.addEventListener('resize', updateHeight);

    // Cleanup event listener on unmount
    return () => window.removeEventListener('resize', updateHeight);
  }, []);
  return (
    <div style={{ height }} className="flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-4xl">
          <span className="text-aqua">Vibe</span>
          <span className="text-magenta">Wave</span>
        </h1>
        <p className="text-center text-aqua">Good things take time, this may take a moment!</p>

        <CircleLoader color="aqua" />
      </div>
    </div>
  );
};
