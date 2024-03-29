import ArticlesList from '../../components/articles-list';
import PageInner from '../../components/page-inner';

const page = 'unreaded';
const noArticlesMsg = 
  'There is no news at the moment.\nRefresh the page to check for updates.';

const UnreadedPage = () => {
  return (
    <PageInner>
      <ArticlesList page={page} noArticlesMsg={noArticlesMsg} />
    </PageInner>
  );
};

export default UnreadedPage;
