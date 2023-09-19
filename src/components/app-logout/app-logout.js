import './app-logout.css';

import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';


function AppLogout() {
  new Cookies().remove('token', { path: '/' });
  return <Navigate replace to="/login" />;
}

export default AppLogout;
