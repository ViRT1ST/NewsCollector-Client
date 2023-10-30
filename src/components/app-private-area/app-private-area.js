import './app-private-area.css';

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

import Cookies from 'universal-cookie';

import { getPayloadFromJwtToken } from '../../services/common';
import ApiService from '../../services/api-service';

import AppHeader from '../app-header/app-header';
import AppFooter from '../app-footer/app-footer';

import AppSpinner from '../app-spinner/app-spinner';

/* ======================================================================== */
/*   This JSX element serves as middleware and verifies user page access    */
/*   by comparing token from cookes with user info from server              */
/* ======================================================================== */

export default class AppPrivateArea extends Component {

  apiService = new ApiService();

  state = {
    isLoading: true,
    isError: false,
    isAuthenticated: false
  };

  componentDidMount() {
    this.updateItems();
  }

  onFetchLoading = () => {
    this.setState({
      isLoading: true,
      isError: false,
      isAuthenticated: false
    });
  };

  onFetchError = (err) => {
    console.log(err);
    this.setState({
      isLoading: false,
      isError: true,
      isAuthenticated: false
    });
  };

  authenticateUser = (data) => {
    const cookieToken = new Cookies().get('token');
    const cookiePayload = getPayloadFromJwtToken(cookieToken);
    return cookiePayload._id === data._id;
  };

  onFetchSuccess = (data) => {
    const isAuthenticated = this.authenticateUser(data);

    this.setState({
      isAuthenticated,
      isLoading: false,
      isError: false
    });
  };

  updateItems = async () => {
    this.onFetchLoading();

    try {
      const json = await this.apiService.getUserBaseInfo();

      if (!json.success) {
        this.onFetchError(json.message);
      }

      if (json.data) {
        this.onFetchSuccess(json.data);
      }

    } catch (err) {
      this.onFetchError(err);
    }

  };

  render() {

    const { children } = this.props;
    const { isAuthenticated, isError, isLoading } = this.state;

    if (isLoading) {
      return <AppSpinner />;
    }

    if (isError) {
      return <Navigate to="/login" />;
    }

    if (isAuthenticated) {
      return (
        <Fragment>
          <AppHeader />
          <div className="main-wrapper">
            <div className="main-content">
              {children}
            </div>
          </div>
          <AppFooter />
        </Fragment>
      );
    }
  }

}

AppPrivateArea.propTypes = {
  children: PropTypes.element,
};


