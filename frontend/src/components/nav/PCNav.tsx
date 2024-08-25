import { Link } from 'react-router-dom';

export const PCNav = () => {
  return (
    <div className="mx-auto w-[95%] min-[1500px]:w-[1800px]">
      <div className="flex justify-between text-xl">
        <div>
          <Link to={'/'}>VibeWave</Link>
        </div>
        <div className="flex gap-5">
          <Link to={'/'}>Home</Link>
          <Link to={'/party-mode'}>Party Mode</Link>
        </div>
      </div>
    </div>
  );
};
