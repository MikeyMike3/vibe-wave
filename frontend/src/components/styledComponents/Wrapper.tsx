type WrapperProps = {
  children: React.ReactNode;
  shouldNotIncludePadding?: boolean;
};

export const Wrapper = ({ children, shouldNotIncludePadding }: WrapperProps) => {
  return (
    <div
      className={`${shouldNotIncludePadding ? 'mx-auto max-w-[98%]' : 'mx-auto max-w-[98%] py-5'}`}
    >
      {children}
    </div>
  );
};
