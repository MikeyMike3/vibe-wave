type PageSubHeadingProps = {
  text: string;
};

export const PageSubHeading = ({ text }: PageSubHeadingProps) => {
  return <h2 className="pb-4 pt-4 text-xl text-textPrimary lg:text-2xl">{text}: </h2>;
};
