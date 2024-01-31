import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { useLogoutUserMutation, removeAccountData } from '../store/';
import { removeCookies } from '../utils/cookies';

const Logout = () => {
  const [logoutUser] = useLogoutUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    logoutUser();

    removeCookies(['_id', 'email', 'token']);
    dispatch(removeAccountData());

    navigate('/auth/login');
  }, []);

  return null;
};

export default Logout;
