import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Button, TextField } from '@material-ui/core';

const Heading = styled.h1`
  margin-top: 0;
`;

const FormContainer = styled.div`
  max-width: 480px;
  width: 100%;
  background-color: #edf4ff;
  padding: 30px;
  border-radius: 5px;
`;

const FormField = styled(TextField)`
  width: 100%;
`;

function SignIn(props) {
  const { errorMsg, userSignIn } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    const result = await userSignIn(username, password);
    if (result) {
      window.location = '/home';
    }
  };

  const goToSignUp = () => {
    window.location = '/signup';
  };

  useEffect(() => {
    if (errorMsg) alert(errorMsg);
  }, [errorMsg]);

  return (
    <div className="signin__fullscreen-wrapper">
      <FormContainer>
        <Heading>Hello!</Heading>
        <p>Fill in your username and password to sign in.</p>

        <div>
          <FormField
            id="outlined-name"
            label="Username"
            margin="dense"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <FormField
            id="outlined-name"
            label="Password"
            margin="dense"
            variant="outlined"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <hr />
        <div>
          <Button style={{ marginBottom: '10px' }} fullWidth variant="contained" color="primary" onClick={submit}>
            SIGN IN
          </Button>

          <Button fullWidth onClick={goToSignUp}>
            Do not have an account? Sign up now!
          </Button>
        </div>
      </FormContainer>
    </div>
  );
}

SignIn.propTypes = {
  errorMsg: PropTypes.string.isRequired,
  userSignIn: PropTypes.func.isRequired,
};

export default SignIn;
