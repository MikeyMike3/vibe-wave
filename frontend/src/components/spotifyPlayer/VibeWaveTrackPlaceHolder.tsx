type VibeWaveTrackPlaceHolderProps = {
  image: string;
};

// this is just a place holder for when the player is initially created
export const VibeWaveTrackPlaceHolder = ({ image }: VibeWaveTrackPlaceHolderProps) => {
  return (
    <div className="flex items-center gap-2">
      <img loading="lazy" className="h-20 w-20 rounded-md object-cover" src={image} />
      <div className="flex- flex-col">
        <p className="text-smTitle">
          <span className="text-aqua">Vibe</span>
          <span className="text-magenta">Wave</span>
        </p>
        <p className="text-[#00CCCC]">Sound on, world off</p>
      </div>
    </div>
  );
};
