import './app.css';

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import AppPrivateArea from '../app-private-area/app-private-area';
import AppRedirect from '../app-redirect/app-redirect';
import AppLogout from '../app-logout/app-logout';

import PageAuthRegister from '../page-auth-register/page-auth-register';
import PageAuthLogin from '../page-auth-login/page-auth-login';

import PageArticlesUnreaded from '../page-articles-unreaded/page-articles-unreaded';
import PageArticlesSaved from '../page-articles-saved/page-articles-saved';

import PageUserProfile from '../page-user-profile/page-user-profile';

export default class App extends Component {

  makePrivate = (element) => <AppPrivateArea>{element}</AppPrivateArea>;

  render() {

    const theme = localStorage.getItem('theme') || 'default';

    return (
      <div className="theme-container" data-theme={theme}>
        <Router>
          <Routes>

            {/* Public routes */}
            <Route path="/register" element={<PageAuthRegister />} />
            <Route path="/login" element={<PageAuthLogin />} />

            {/* Private routes */}
            <Route path="/nc/unreaded" element={this.makePrivate(<PageArticlesUnreaded />)} />
            <Route path="/nc/saved" element={this.makePrivate(<PageArticlesSaved />)} />
            <Route path="/nc/profile" element={this.makePrivate(<PageUserProfile />)} />

            {/* Service routes and redirects */}
            <Route path="/404" element={<AppRedirect code="404" message="Page not found" />} />
            <Route path="/logout" element={<AppLogout />} />
            <Route path="/" element={<Navigate replace to="/nc/unreaded" />} />
            <Route path="*" element={<Navigate replace to="/404" />} />

          </Routes>
        </Router>
      </div>
    );
  }

}




// TODO: react dom router navigate to /login on error and pass the error message to the page
// TODO: mobile menu without bootstrap
// TODO: footer with classes

