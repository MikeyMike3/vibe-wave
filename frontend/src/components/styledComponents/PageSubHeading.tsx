type PageSubHeadingProps = {
  text: string;
};

export const PageSubHeading = ({ text }: PageSubHeadingProps) => {
  return <h2 className="pb-4 pt-4 text-2xl text-textPrimary">{text}: </h2>;
};
