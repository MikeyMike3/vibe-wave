type PageTitleProps = {
  title: string;
};

export const PageTitle = ({ title }: PageTitleProps) => {
  return <h1 className="pb-4 text-3xl text-textPrimary">{title}</h1>;
};
