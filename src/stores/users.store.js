import { observable, action, makeObservable } from 'mobx';

export default class UserStore {
  username = null;

  constructor(authService) {
    makeObservable(this, {
      username: observable,
      signin: action.bound,
      signup: action.bound,
      signout: action.bound,
    });
    this.authService = authService;
  }

  async signin(username, password) {
    this.username = await this.authService.signin(username, password);
  }

  async signup(username, password) {
    return this.authService.signup(username, password);
  }

  signout() {
    this.username = null;
    this.authService.removeToken();
  }
}
