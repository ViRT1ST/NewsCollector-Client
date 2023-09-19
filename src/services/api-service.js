import { getUserTokenFromCookies } from './common';

export default class ApiService {

  _apiBase = 'http://localhost:7002';

  async _operateWithServer(path, method, body) {
    const url = `${this._apiBase}${path}`;

    const config = {
      method,
      body: body ? JSON.stringify(body) : null,
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': getUserTokenFromCookies(),
      },
    };

    const res = await fetch(url, config);

    // if (!res.ok) {
    //   throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    // }

    const json = await res.json();
    return json;
  }

  getUnreadedNews = async () => {
    return this._operateWithServer('/api/articles/unreaded');
  };

  getSavedNews = async () => {
    return this._operateWithServer('/api/articles/saved');
  };

  getUserBaseInfo = async () => {
    return this._operateWithServer('/api/users/me/info');
  };

  getUserProfile = async () => {
    return this._operateWithServer('/api/users/me/profile');
  };

  changeUserProfile = async (password, subscriptions) => {
    const body = { password, subscriptions };
    return this._operateWithServer('/api/users/me/profile', 'PUT', body);
  };

  loginUser = async (email, password) => {
    const body = { email, password };
    return this._operateWithServer('/api/users/login', 'POST', body);
  };

  registerUser = async (email, password) => {
    const body = { email, password };
    return this._operateWithServer('/api/users/register', 'POST', body);
  };

  saveUnreadedArticle = (id) => {
    this._operateWithServer(`/api/articles/unreaded/save/${id}`, 'PUT');
  };

  hideUnreadedArticle = (id) => {
    this._operateWithServer(`/api/articles/unreaded/hide/${id}`, 'PUT');
  };

  hideSavedArticle = (id) => {
    this._operateWithServer(`/api/articles/saved/hide/${id}`, 'PUT');
  };

}
