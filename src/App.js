import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react';

import Home from './containers/Home/Home';
import SignIn from './containers/Auth/SignIn';
import SignUp from './containers/Auth/SignUp';
import useStores from './stores/stores';
import { useWindowSize } from './lib/reactHook';

import './App.css';

export const App = observer(() => {
  const { windowStore } = useStores();
  const width = useWindowSize();

  useEffect(() => {
    if (!width) return;
    windowStore.setWindowWidth(width);
  }, [width]);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route path="/signin/" component={SignIn} />
        <Route path="/signup/" component={SignUp} />
        <Route exact path="/home" component={Home} />
      </Switch>
    </div>
  );
});
