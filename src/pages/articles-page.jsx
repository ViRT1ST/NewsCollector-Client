import tw from 'tailwind-styled-components';
import { useState, useEffect } from 'react';

import { useFetchArticlesQuery } from '../store';

import PageInner from '../components/page-inner';
import ArticleItem from '../components/article-item';
import LoadingSpinner from '../components/loading-spinner';
import ErrorMessage from '../components/error-message';

const noArticlesMessage = {
  saved: 'You have not saved any news.',
  unreaded: `No news found.
    Refresh page to check updates.`
};

const ArticlesPage = ({ page }) => {
  const [counts, setCounts] = useState({ unreaded: 0, saved: 0 });

  const { data, error, isFetching } = useFetchArticlesQuery(page);
  const dataLength = data?.data?.length;

  useEffect(() => {
    dataLength && setCounts((current) => ({ ...current, [page]: dataLength }));
  }, [data]);

  const decrementCount = () => {
    setCounts((current) => ({ ...current, [page]: current[page] - 1 }));
  };

  const createArticlesList = (arr = []) => {
    const articles = arr.map((article) => (
      <li key={article._id}>
        <ArticleItem
          article={article}
          updateCount={decrementCount}
          page={page}
        />
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
      const message = error.data?.message;
      return <ErrorMessage code={code} message={message} />;
    }

    if (dataLength === 0) {
      return <NoNewsMessage>{noArticlesMessage[page]}</NoNewsMessage>;
    }

    return createArticlesList(data.data);
  };

  return (
    <PageInner>
      {renderContent()}
    </PageInner>
  );
};

const NoNewsMessage = tw.p`
  text-lt-page-fg/60 dark:text-dt-page-fg/40

  mt-12 px-6
  font-roboto text-xl text-center
  whitespace-pre-line
`;

export default ArticlesPage;
