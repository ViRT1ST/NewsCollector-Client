import React, { Component } from 'react';

import PageAuth from '../page-auth/page-auth';

import ApiService from '../../services/api-service';

export default class PageAuthLogin extends Component {

  apiService = new ApiService();

  render() {

    const apiMethod = this.apiService.loginUser;
    const formTitle = 'Login';
    const buttonText = 'Login';
    const antonymLink = '/register';
    const antonymText = 'Sign Up';

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
