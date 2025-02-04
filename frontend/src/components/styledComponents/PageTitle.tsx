type PageTitleProps = {
  title: string;
};

export const PageTitle = ({ title }: PageTitleProps) => {
  return <h1 className="pb-6 text-5xl font-semibold text-aqua">{title}</h1>;
};
