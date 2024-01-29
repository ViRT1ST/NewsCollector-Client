import PageInner from '../components/page-inner';
import ErrorMessage from '../components/error-message';

const E404Page = () => {
  return (
    <PageInner privateRoute={false}>
      <ErrorMessage code={404} message={'Page not found'} />
    </PageInner>
  );
};

export default E404Page;
