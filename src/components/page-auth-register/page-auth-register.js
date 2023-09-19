import React, { Component } from 'react';

import PageAuth from '../page-auth/page-auth';

import ApiService from '../../services/api-service';

export default class PageAuthRegister extends Component {

  apiService = new ApiService();

  render() {

    const apiMethod = this.apiService.registerUser;
    const formTitle = 'Registration';
    const buttonText = 'Register';
    const antonymLink = '/login';
    const antonymText = 'Log In';

    return (
      <PageAuth
        apiMethod={apiMethod}
        formTitle={formTitle}
        buttonText={buttonText}
        antonymLink={antonymLink}
        antonymText={antonymText}
      />
    );
  }

}
