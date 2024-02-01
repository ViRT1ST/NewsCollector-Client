import ArticlesList from '../../components/articles-list';
import PageInner from '../../components/page-inner';

const page = 'saved';
const noArticlesMsg = `You have not saved any news.`;

const SavedPage = () => {
  return (
    <PageInner>
      <ArticlesList page={page} noArticlesMsg={noArticlesMsg} />
    </PageInner>
  );
};

export default SavedPage;
