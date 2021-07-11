import React, { useState } from 'react';

import Layout from '../../components/Auth/SignUp';
import AuthService from '../../services/auth.service';

function SignUp() {
  const authService = new AuthService();
  const [isWaiting, setIsWaiting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const userSignUp = async (username, password) => {
    setIsWaiting(true);
    setErrorMsg('');

    try {
      const result = await authService.signup(username, password);
      setIsWaiting(false);
      return result;
    } catch (err) {
      console.log('[containers/Auth/SignUp userSignUp()] Error', err);
      setErrorMsg(err);
      setIsWaiting(false);
      return false;
    }
  };

  return <Layout isWaiting={isWaiting} errorMsg={errorMsg} userSignUp={userSignUp} />;
}

export default SignUp;
