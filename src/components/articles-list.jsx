import tw from 'tailwind-styled-components';
import { useState, useEffect } from 'react';

import { useFetchArticlesQuery } from '../store';

import ArticleItem from '../components/article-item';
import LoadingSpinner from '../components/loading-spinner';
import ErrorMessage from '../components/error-message';

const ArticlesPage = ({ page, noArticlesMsg }) => {
  const [count, setCount] = useState();

  const { data, error, isFetching, isSuccess } = useFetchArticlesQuery(page);

  useEffect(() => {
    if (isSuccess) {
      setCount(data?.data?.length || 0);
    }
  }, [data]);

  const updateCount = () => {
    setCount((current) => current - 1);
  };

  if (isFetching) {
    return <LoadingSpinner />;
  }

  if (error) {
    const code = error?.status;
    const message = error?.data?.message;
    return <ErrorMessage code={code} message={message} />;
  }

  if (count === 0) {
    return <NoNewsMessage>{noArticlesMsg}</NoNewsMessage>;
  }

  return (
    <ul>
      {data.data.map((article) => (
        <li key={article._id}>
          <ArticleItem article={article} updateCount={updateCount} page={page}/>
        </li>
      ))}
    </ul>
  ); 
};

const NoNewsMessage = tw.p`
  text-lt-page-fg/60 dark:text-dt-page-fg/40

  mt-8 px-6
  font-roboto text-xl text-center
  whitespace-pre

  animate-fade-in
`;

export default ArticlesPage;
