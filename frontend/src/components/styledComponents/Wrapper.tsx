type WrapperProps = {
  children: React.ReactNode;
  shouldNotIncludePadding?: boolean;
};

export const Wrapper = ({ children, shouldNotIncludePadding }: WrapperProps) => {
  return (
    <div
      className={`${shouldNotIncludePadding ? 'mx-auto max-w-[95%] lg:max-w-[98%]' : 'mx-auto max-w-[95%] py-5 lg:max-w-[98%]'}`}
    >
      {children}
    </div>
  );
};
