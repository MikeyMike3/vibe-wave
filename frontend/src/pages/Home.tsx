import { ErrorMessage } from '../components/ErrorMessage';
import { MainLoading } from '../components/MainLoading';
import { useFetchHomePageData } from '../hooks/apis/useFetchHomePageData';

export const Home = () => {
  const { homePageData, isLoading, isError } = useFetchHomePageData();

  if (isLoading) {
    return <MainLoading />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  console.log(homePageData);
  return <div className="text-white">Home</div>;
};
