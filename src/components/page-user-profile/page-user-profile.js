import './page-user-profile.css';

import React, { Component } from 'react';

import AppMessage from '../app-message/app-message';
import AppSpinner from '../app-spinner/app-spinner';
import ApiService from '../../services/api-service';

export default class PageUserProfile extends Component {

  state = {
    subscriptions: [],
    subscriptionsChecked: [],
    password: '',
    loading: true,
    error: false
  };

  apiService = new ApiService();

  componentDidMount() {
    this.updateItems();
  }

  onCheckboxClick = (e) => {
    let { subscriptionsChecked } = this.state;

    if (e.target.checked) {
      subscriptionsChecked.push(e.target.id);
    } else {
      subscriptionsChecked = subscriptionsChecked.filter((item) => {
        return item !== e.target.id;
      });
    }

    this.setState({
      subscriptionsChecked
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
    // console.log(json.data);
    this.setState({
      subscriptionsChecked: json.data.user.subscriptions,
      subscriptions: json.data.sources,
      password: '',
      loading: false
    });
  };

  updateItems = () => {
    this.onFetchLoading();

    let userData = {};
    let sourcesData = {};
    const allData = { data: {} };

    const getUser = () => {
      return new Promise((resolve, reject) => {
        this.apiService.getUserProfile()
          .then((data) => {
            userData = data;
            resolve();
          })
          .catch(() => {
            reject();
          });
      });
    };

    const getSources = () => {
      return new Promise((resolve, reject) => {
        this.apiService.getSources()
          .then((data) => {
            sourcesData = data;
            resolve();
          })
          .catch(() => {
            reject();
          });
      });
    };

    Promise.all([getUser(), getSources()])
      .then(() => {
        console.log('Все промисы выполнились успешно.');
        allData.data.user = userData.data;
        allData.data.sources = sourcesData.data;
        this.onFetchLoaded(allData);
      })
      .catch((error) => {
        console.log('Не все промисы выполнились успешно.');
        this.onFetchError(error);
      });

    // this.apiService.getUserProfile()
    //   .then(this.onFetchLoaded)
    //   .catch(this.onFetchError);
  };

  onSubmit = async (e) => {
    e.preventDefault();
    this.onFetchLoading();

    const { password, subscriptionsChecked: subscriptions } = this.state;

    const body = { subscriptions };
    if (password.trim()) {
      body.password = password;
    }

    this.apiService
      .changeUserProfile(body)
      .then(this.updateItems)
      .catch(this.onError);
  };


  render() {
    const { subscriptions, subscriptionsChecked, password, loading, error } = this.state;

    subscriptions.forEach((item) => {
      if (subscriptionsChecked.includes(item._id)) {
        item.is_subscribed = true;
      }
    });

    const checkboxes = subscriptions.map(({ _id, is_subscribed, site, section }) => {
      return (
        <li key={_id}>
          <input
            className="user-profile__checkbox"
            type="checkbox"
            id={_id}
            name={_id}
            defaultChecked={is_subscribed}
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








