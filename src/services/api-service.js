import { getUserTokenFromCookies } from './common';

export default class ApiService {

  _apiBase = 'http://localhost:7733/api';

  async _operateWithServer(path, method, body) {
    const url = `${this._apiBase}${path}`;

    const config = {
      method,
      body: body ? JSON.stringify(body) : null,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getUserTokenFromCookies()}`,
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
    return this._operateWithServer('/articles/unreaded');
  };

  getSavedNews = async () => {
    return this._operateWithServer('/articles/saved');
  };

  getSources = async () => {
    return this._operateWithServer('/sources');
  };

  // ???
  getUserBaseInfo = async () => {
    return this._operateWithServer('/users/me');
  };

  getUserProfile = async () => {
    return this._operateWithServer('/users/me');
  };

  changeUserProfile = async (body) => {
    return this._operateWithServer('/users/me', 'PATCH', body);
  };

  loginUser = async (email, password) => {
    const body = { email, password };
    return this._operateWithServer('/users/login', 'POST', body);
  };

  registerUser = async (email, password) => {
    const body = { email, password };
    return this._operateWithServer('/users', 'POST', body);
  };

  saveUnreadedArticle = (_id) => {
    this._operateWithServer(`/articles/${_id}/save`, 'PATCH');
  };

  hideUnreadedArticle = (_id) => {
    this._operateWithServer(`/articles/${_id}/hide`, 'PATCH');
  };

  hideSavedArticle = (_id) => {
    this._operateWithServer(`/articles/${_id}/hide`, 'PATCH');
  };

}
