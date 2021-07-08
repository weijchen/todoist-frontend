import { action, makeObservable, observable } from 'mobx';

export default class WindowStore {
  width = 'sm';

  constructor(windowStore) {
    makeObservable(this, {
      width: observable,
      setWindowWidth: action.bound,
    });
    this.windowStore = windowStore;
  }

  setWindowWidth(payload) {
    this.width = payload;
  }
}
