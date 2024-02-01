import tw from 'tailwind-styled-components';
import { useState, useEffect } from 'react';

import { useFetchArticlesQuery } from '../store';

import ArticleItem from '../components/article-item';
import LoadingSpinner from '../components/loading-spinner';
import ErrorMessage from '../components/error-message';

const ArticlesPage = ({ page, noArticlesMsg }) => {
  // important: must be null, not 0
  const [count, setCount] = useState(null);

  const { data, error, isFetching, isSuccess } = useFetchArticlesQuery(page);

  useEffect(() => {
    isSuccess && setCount(data?.data?.length || 0);
  }, [data]);

  const updateCount = () => {
    setCount((current) => current - 1);
  };

  const createArticlesList = (arr = []) => {
    const articles = arr.map((article) => (
      <li key={article._id}>
        <ArticleItem article={article} updateCount={updateCount} page={page}/>
      </li>
    ));

    return <ul>{articles}</ul>;
  };

  const renderContent = () => {
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

    return createArticlesList(data?.data);
    
  };

  return renderContent();
};

const NoNewsMessage = tw.p`
  text-lt-page-fg/60 dark:text-dt-page-fg/40

  mt-8 px-6
  font-roboto text-xl text-center
  whitespace-pre-line
`;

export default ArticlesPage;
