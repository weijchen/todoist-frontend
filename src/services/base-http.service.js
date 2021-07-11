import axios from 'axios';
import { API_ROOT } from '../constants/config';

axios.defaults.baseURL = API_ROOT;
// axios.defaults.headers.common['Content-Type'] = 'application/json';

class BaseHttpService {
  BASE_URL = API_ROOT || 'http://localhost:3000';

  constructor(routerStore) {
    this.routerStore = routerStore;
  }

  async get(endpoint, options = {}) {
    Object.assign(options, this.getCommonOptions());
    return axios.get(`${this.BASE_URL}/${endpoint}`, options).catch((error) => this.handleHttpError(error));
  }

  async post(endpoint, data = {}, options = {}) {
    Object.assign(options, this.getCommonOptions());
    return axios.post(`${this.BASE_URL}/${endpoint}`, data, options).catch((error) => this.handleHttpError(error));
  }

  async delete(endpoint, options = {}) {
    Object.assign(options, this.getCommonOptions());
    return axios.delete(`${this.BASE_URL}/${endpoint}`, options).catch((error) => this.handleHttpError(error));
  }

  async patch(endpoint, data = {}, options = {}) {
    Object.assign(options, this.getCommonOptions());
    return axios.patch(`${this.BASE_URL}/${endpoint}`, data, options).catch((error) => this.handleHttpError(error));
  }

  handleHttpError(error) {
    const { statusCode } = error.response.data;

    if (statusCode !== 401) {
      throw error;
    } else {
      return this.handle401();
    }
  }

  handle401() {
    window.location = '/signin';
  }

  getCommonOptions() {
    const token = this.loadToken();

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  getAccessToken() {
    return this.accessToken ? this.accessToken : this.loadToken();
  }

  saveToken(accessToken) {
    this.accessToken = accessToken;
    return localStorage.setItem('accessToken', accessToken);
  }

  loadToken() {
    const token = localStorage.getItem('accessToken');
    this.accessToken = token;
    return token;
  }

  removeToken() {
    localStorage.removeItem('accessToken');
  }
}

export default BaseHttpService;
