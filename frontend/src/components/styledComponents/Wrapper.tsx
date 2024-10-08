type WrapperProps = {
  children: React.ReactNode;
};

export const Wrapper = ({ children }: WrapperProps) => {
  return <div className="mx-auto max-w-[98%]">{children}</div>;
};
