import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';

import { Home } from './components/Home/Home';
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
        <Route sensitive exact path="/" component={Home} />
        <Redirect from="*" to="/notfound" />
      </Switch>
    </div>
  );
});
