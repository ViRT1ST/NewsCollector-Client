import tw from 'tailwind-styled-components';

import Header from './header';
import Footer from './footer';

const PageInner = ({ privateRoute = true, children }) => {
  return (
    <Container>
      {privateRoute && <Header />}

      <Limiter>
        {children}
      </Limiter>

      {privateRoute && <Footer />}
    </Container>
  );
};

const Container = tw.div`
  bg-lt-page-bg dark:bg-dt-page-bg 

  flex flex-col w-full h-full min-h-screen pt-12
`;

const Limiter = tw.div`
  py-6 flex-grow
  
  px-2 md:px-[5%]
`;

export default PageInner;
