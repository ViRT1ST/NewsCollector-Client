import './page-user-profile.css';

import React, { Component } from 'react';

import AppMessage from '../app-message/app-message';
import AppSpinner from '../app-spinner/app-spinner';
import ApiService from '../../services/api-service';

export default class PageUserProfile extends Component {

  state = {
    subscriptions: [],
    password: '',
    loading: true,
    error: false
  };

  apiService = new ApiService();

  componentDidMount() {
    this.updateItems();
  }

  onCheckboxClick = (e) => {
    const { subscriptions } = this.state;

    const newArray = subscriptions.map((item) => {
      if (item._id === e.target.name) {
        item.isSubscribed = e.target.checked;
      }
      return item;
    });

    this.setState({
      subscriptions: newArray
    });
  };

  onPasswordInput = (e) => {
    this.setState({
      password: e.target.value
    });
  };

  onFetchLoading = () => {
    this.setState({
      subscriptions: [],
      loading: true,
      error: false
    });
  };

  onFetchError = (err) => {
    console.log(err);
    this.setState({
      subscriptions: [],
      loading: false,
      error: true
    });
  };

  onFetchLoaded = (json) => {
    console.log(json.data.subscriptions);
    this.setState({
      subscriptions: json.data.subscriptions,
      password: '',
      loading: false
    });
  };

  updateItems = () => {
    this.onFetchLoading();

    this.apiService.getUserProfile()
      .then(this.onFetchLoaded)
      .catch(this.onFetchError);
  };

  onSubmit = async (e) => {
    e.preventDefault();
    this.onFetchLoading();

    const { password, subscriptions } = this.state;

    const checkedIds = subscriptions
      .filter((item) => item.isSubscribed)
      .map((item) => item._id);

    const body = { subscriptions: checkedIds };

    if (password.trim()) {
      body.password = password;
    }

    this.apiService
      .changeUserProfile(body)
      .then(this.updateItems)
      .catch(this.onError);
  };


  render() {
    const { subscriptions, password, loading, error } = this.state;

    const checkboxes = subscriptions.map(({ _id, site, section, isSubscribed }) => {
      return (
        <li key={_id}>
          <input
            className="user-profile__checkbox"
            type="checkbox"
            id={_id}
            name={_id}
            defaultChecked={isSubscribed}
            onClick={this.onCheckboxClick}
          />
          <label htmlFor={_id}>{site} &middot; {section}</label>
        </li>
      );
    });

    if (loading) {
      return <AppSpinner />;
    }

    if (error) {
      return <AppMessage message="Server error." />;
    }

    if (subscriptions.length) {
      return (
        <form className="user-profile__form" noValidate onSubmit={this.onSubmit}>

          <h1 className="user-profile__section-title">Change subscriptions</h1>
          <ul className="user-profile__subscriptions-list">
            {checkboxes}
          </ul>

          <h1 className="user-profile__section-title">Change password</h1>
          <div className="user-profile__password-container">
            <input
              className="user-profile__password-input"
              placeholder="Password (at least 8 characters)"
              type="password"
              value={password}
              onChange={this.onPasswordInput}
            />
            <div className="user-profile__password-message">
              Leave it empty if you don&apos;t need to change your password.
            </div>
          </div>

          <input className="user-profile__submit-button" type="submit" value="Save changes" />
        </form>
      );
    }
  }
}








