import { post } from 'axios';
import BaseHttpService from './base-http.service';

export default class AuthService extends BaseHttpService {
  async signin(username, password) {
    try {
      const result = await post(`${this.BASE_URL}/auth/signin`, {
        username,
        password,
      });
      const { accessToken } = result.data;
      this.saveToken(accessToken);
      return true;
    } catch (err) {
      throw new Error('SignIn Error');
    }
  }

  async signup(username, password) {
    try {
      await post(`${this.BASE_URL}/auth/signup`, {
        username,
        password,
      });
      return true;
    } catch (err) {
      console.log(err);
      throw new Error('SignUp Error');
    }
  }

  async signout() {
    this.removeToken();
  }
}
