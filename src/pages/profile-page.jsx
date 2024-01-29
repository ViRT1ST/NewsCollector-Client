import tw from 'tailwind-styled-components';

import { useGetProfileQuery, useUpdateUserMutation } from '../store';
import { useState, useEffect } from 'react';

import PageInner from '../components/page-inner';

import LoadingSpinner from '../components/loading-spinner';
import ErrorMessage from '../components/error-message';
import Checkbox from '../components/checkbox';

const ProfilePage = () => {
  const [passwordInput, setPasswordInput] = useState('');
  const [subscriptions, setSubscriptions] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  const { data, error, isFetching, refetch } = useGetProfileQuery();
  const [updateUser, updateResults] = useUpdateUserMutation();
  
  const onPasswordInput = (e) => {
    setPasswordInput(e.target.value);
  };

  useEffect(() => {
    if (data?.data?.subscriptions) {
      setSubscriptions(data.data.subscriptions);
    }
  }, [data]);

  useEffect(() => {
    if (updateResults.status === 'fulfilled') {
      refetch();
      setIsUpdated(true);
    }
  }, [updateResults.status]);

  const onCheckboxClick = (e) => {
    const newArray = subscriptions.map((item) => {
      const isSubscribed = item._id === e.target.name
        ? e.target.checked 
        : item.isSubscribed;

      return { ...item, isSubscribed };
    });

    setSubscriptions(newArray);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    const checkedSubscriptions = subscriptions
      .filter((item) => item.isSubscribed)
      .map((item) => item._id);

    const data = {
      subscriptions: checkedSubscriptions
    };

    const password = passwordInput.trim();
    
    if (password) {
      data.password = password;
    }

    updateUser(data);
  };

  const createSubscriptionsList = (arr = []) => {
    const items = arr.map(({ _id, site, section, isSubscribed }) => (
      <li key={_id}>
        <Checkbox
          id={_id}
          name={_id}
          isChecked={isSubscribed}
          onClick={onCheckboxClick}
        >
          {site} &middot; {section}
        </Checkbox>
      </li>
    ));

    return (
      <ul>{items}</ul>
    );
  };
  
  const renderContent = () => {
    if (isFetching || updateResults.isFetching) {
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

    if (data?.data?.subscriptions) {
      return (
        <Form onSubmit={onFormSubmit}>

          <SectionTitle>Change subscriptions</SectionTitle>
          <SectionContent>
            {createSubscriptionsList(data?.data?.subscriptions)}
          </SectionContent>

          <SectionTitle>Change password</SectionTitle>
          <SectionContent>
            <PasswordInput
              placeholder="Password (at least 8 characters)"
              type="password"
              value={passwordInput}
              onChange={onPasswordInput}
            />
            <PasswordMessage>
              Leave it empty if you don&apos;t need to change your password.
            </PasswordMessage>
          </SectionContent>
  
          <FormSubmitButton type="submit">Save changes</FormSubmitButton>

          {isUpdated && <UpdateMessage>Your data was updated.</UpdateMessage>}

        </Form>
      );
    }
  };

  return (
    <PageInner>
      {renderContent()}
    </PageInner>
  );
};

const Form = tw.form`
  text-lt-page-fg dark:text-dt-page-fg/60
  
  mx-2.5 my-5 leading-loose font-roboto
`;

const SectionTitle = tw.h1`
  text-[1.3rem] font-medium
`;

const SectionContent = tw.div`
  px-8 py-4
`;

const PasswordInput = tw.input`
  text-lt-page-fg dark:text-neutral-950

  bg-neutral-200

  w-64 px-1.5 rounded border

  focus:outline-0
  focus:[box-shadow:0px_0px_0px_4px_rgba(128,128,128,0.3)]

  placeholder:text-neutral-500
`;

const PasswordMessage = tw.span`
  block mt-1
`;

const FormSubmitButton = tw.button`
  block my-4
  
  bg-lt-btn-default-bg/30 dark:bg-dt-btn-default-bg/[0.03]
  text-lt-btn-default-fg dark:text-dt-btn-default-fg
  border-lt-btn-default-bg/30 dark:border-dt-btn-default-bg/30

  px-4 py-3 border rounded font-roboto uppercase
  text-lg leading-4

  hover:text-lt-btn-safe-fg hover:dark:text-dt-btn-safe-fg
  hover:bg-lt-btn-safe-bg hover:dark:bg-dt-btn-safe-bg
  hover:border-lt-btn-safe-bg hover:dark:border-dt-btn-safe-bg
`;

const UpdateMessage = tw.span`
  block mt-1 font-medium
`;

export default ProfilePage;
