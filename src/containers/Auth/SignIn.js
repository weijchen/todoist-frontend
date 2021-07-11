import React, { useState } from 'react';

import Layout from '../../components/Auth/SignIn';
import AuthService from '../../services/auth.service';

function SignIn() {
  const authService = new AuthService();
  const [isWaiting, setIsWaiting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const userSignIn = async (username, password) => {
    setIsWaiting(true);
    setErrorMsg('');

    try {
      const result = await authService.signin(username, password);
      setIsWaiting(false);
      return result;
    } catch (err) {
      console.log('[containers/Auth/SignIn userSignIn()] Error', err);
      setErrorMsg(err);
      setIsWaiting(false);
      return false;
    }
  };

  return <Layout isWaiting={isWaiting} errorMsg={errorMsg} userSignIn={userSignIn} />;
}

export default SignIn;
