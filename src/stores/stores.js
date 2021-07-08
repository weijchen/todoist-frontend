import { createContext, useContext } from 'react';
import TasksStore from './tasks.store';
import UsersStore from './users.store';
import WindowStore from './window.store';

const storeContext = createContext({
  tasksStore: new TasksStore(),
  usersStore: new UsersStore(),
  windowStore: new WindowStore(),
});
const useStores = () => useContext(storeContext); // 利用 context hook

export default useStores;
