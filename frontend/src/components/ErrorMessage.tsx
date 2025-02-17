export const ErrorMessage = () => {
  return (
    <div style={{ height: 'calc(100vh - 200px)' }} className="flex items-center justify-center">
      <div className="text-center">
        <p className="pb-2 text-xl text-aqua">Houston, we have a problem.</p>
        <p className="text-xl text-aqua">Please refresh to try again!</p>
      </div>
    </div>
  );
};
