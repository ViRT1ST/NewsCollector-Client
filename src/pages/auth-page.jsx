import tw from 'tailwind-styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { createCookies } from '../utils/cookies';

import {
  useLoginUserMutation,
  useCreateUserMutation,
  updateAccountData
} from '../store';

const authConfig = {
  login: {
    formTitle: 'Login',
    buttonText: 'Login',
    swichingLink: '/auth/register',
    swichingText: 'Sign Up',
    apiHook: useLoginUserMutation,
  },
  register: {
    formTitle: 'Registration',
    buttonText: 'Register',
    swichingLink: '/auth/login',
    swichingText: 'Log In',
    apiHook: useCreateUserMutation,
  }
};

const AuthPage = ({ type }) => {
  const [userInput, setUserInput] = useState({ email: '', password: '' });
  const [authUser, authResults] = authConfig[type].apiHook();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let errorHint = authResults.error?.data?.message;

  useEffect(() => {
    if (authResults.data?.data) {
      const { token, user } = authResults.data.data;
      const { _id, email } = user;

      const userData = { _id, email, token };
      dispatch(updateAccountData(userData));
      createCookies(userData);

      navigate('/u/unreaded');
    }
  }, [authResults.data]);
 
  const onFormSubmit = (e) => {
    e.preventDefault();
    authUser(userInput);
  };

  const onInputChange = (e) =>{
    setUserInput((current) => (
      { ...current, [e.target.name]: e.target.value })
    );
  };

  return (
    <PageContainer>
      <ContentContainer>

        <Form onSubmit={onFormSubmit}>
          <Header>{authConfig[type].formTitle}</Header>
          
          <Label htmlFor="email">Email</Label>
          <Input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            required="required"

            value={userInput.email}
            onChange={onInputChange}
          />

          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required="required"
            value={userInput.password}
            onChange={onInputChange}
          />

          <ButtonsArea>
            <Button type="submit">{authConfig[type].buttonText}</Button>
          </ButtonsArea>
        </Form>

        <LinksArea>
          <LinksAreaItem to={authConfig[type].swichingLink}>
            {authConfig[type].swichingText}
          </LinksAreaItem>
          {' | '}
          <LinksAreaItem to="/restore">
            Restore Password
          </LinksAreaItem>
        </LinksArea>

        {errorHint && <ErrorMessage>{errorHint}</ErrorMessage>}

      </ContentContainer>
    </PageContainer>
  );
};

const PageContainer = tw.div`
  bg-zinc-100

  w-full h-full min-h-screen-svh pt-[10%]
  font-roboto leading-4
`;

const ContentContainer = tw.div`
  bg-zinc-100

  py-5 px-[5%]
`;

const Form = tw.form`
  bg-white
  border-teal-600
  
  min-w-64 max-w-[400px] mx-auto my-5 p-5 
  border-l-[5px] rounded-xl 
`;

const Header = tw.h1`
  text-neutral-800

  mt-1 mb-2 font-medium text-center text-3xl leading-tight
`;

const Label = tw.label`
  block mb-3
`;

const Input = tw.input`
  bg-white
  border-gray-300
  text-neutral-800

  block w-full mb-3 py-2.5 px-3
  border rounded bg-clip-padding outline-0
  font-roboto leading-4 appearance-none
  transition-all duration-100 ease-in-out

  focus:border-blue-300
  focus:[box-shadow:0px_0px_0px_4px_rgba(13,109,252,0.25)]
  focus:outline-0

  placeholder:text-gray-500
`;

const ButtonsArea = tw.div`
  flex flex-col items-end
`;

const Button = tw.button`
  text-emerald-700 
  border-emerald-700

  block w-[45%] mt-2.5 mb-0.5 py-1.5 px-3
  bg-transparent border rounded text-lg text-center
  transition-all duration-100 ease-in-out

  hover:bg-emerald-700 
  hover:text-white

  focus:bg-emerald-700 
  focus:text-white
  focus:border-emerald-700
  focus:[box-shadow:0px_0px_0px_4px_rgba(4,120,87,0.35)]
  focus:outline-0
`;

const LinksArea = tw.div`
  text-neutral-800

  mt-5 text-center leading-8
`;

const LinksAreaItem = tw(Link)`
  text-sky-600

  hover:underline
`;

const ErrorMessage = tw.p`
  text-red-500
  
  leading-8 text-center
`;

export default AuthPage;
