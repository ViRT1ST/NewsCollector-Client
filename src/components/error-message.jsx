import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'tailwind-styled-components';

const urlToRedirect = '/auth/login';
const initialSeconds = 9;

const ErrorMessage = ({ code, message = 'Unknown error' }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  const navigate = useNavigate();

  useEffect(() => {
    if (seconds < 0) {
      navigate(urlToRedirect);
    }
  
    const timer = setInterval(() => {
      setSeconds((current) => current - 1);
    }, 1000);
  
    return () => clearInterval(timer);
  }, [seconds]);

  return (
    <Container>
      <ErrorCode>ERROR {code}</ErrorCode>
      <Message>{message}</Message>

      <Delimiter />

      <Countdown>
        You will be redirected to login page after<br />
        {seconds} seconds...
      </Countdown>  
    </Container>
  );
};

const Container = tw.div`
  text-lt-page-fg/80 dark:text-dt-page-fg/60

  flex flex-col items-center mt-12 px-6
  font-roboto font-medium
`;

const ErrorCode = tw.h1`
  text-3xl text-center
`;

const Message = tw.p`
  pt-4 text-2xl text-center
`;

const Delimiter = tw.hr`
  border-lt-page-fg dark:border-dt-page-fg/40

  w-64 h-px my-6
`;

const Countdown = tw.p`
  text-lt-page-fg/80 dark:text-dt-page-fg/40

  text-base text-center whitespace-break-spaces
`;

export default ErrorMessage;
