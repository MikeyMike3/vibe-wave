type PageTitleProps = {
  title: string;
};

export const PageTitle = ({ title }: PageTitleProps) => {
  return <h1 className="pb-6 text-3xl font-semibold text-aqua lg:text-5xl">{title}</h1>;
};
