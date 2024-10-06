import { useFetchHomePageData } from '../hooks/apis/useFetchHomePageData';

export const Home = () => {
  const { homePageData, isLoading, isError } = useFetchHomePageData();
  return <div className="text-white">Home</div>;
};
