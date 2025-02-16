import { CircleLoader } from 'react-spinners';

export const MainLoading = () => {
  return (
    <div style={{ height: 'calc(100vh - 200px)' }} className="flex items-center justify-center">
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
