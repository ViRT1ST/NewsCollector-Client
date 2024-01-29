import { useFetchArticlesQuery } from '../store';

import PageInner from '../components/page-inner';
import ArticleItem from '../components/article-item';
import LoadingSpinner from '../components/loading-spinner';
import ErrorMessage from '../components/error-message';

const ArticlesPage = ({ page }) => {
  const { data, error, isFetching } = useFetchArticlesQuery(page);

  const createArticlesList = (arr = []) => {
    const articles = arr.map((article) => (
      <li key={article._id}>
        <ArticleItem article={article}/>
      </li>
    ));

    return (
      <ul>{articles}</ul>
    );
  };

  const renderContent = () => {
    if (isFetching) {
      return (
        <LoadingSpinner />
      );
    }

    if (error) {
      const code = error?.status;
      const message = error.data?.message;

      return (
        <ErrorMessage code={code} message={message} />
      );
    }

    return createArticlesList(data?.data);
  };

  return (
    <PageInner>
      {renderContent()}
    </PageInner>
  );
};

export default ArticlesPage;
