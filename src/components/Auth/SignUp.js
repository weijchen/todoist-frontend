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

function SignUp(props) {
  const { errorMsg, userSignUp } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    const result = await userSignUp(username, password);
    if (result) {
      window.location = '/signin';
    }
  };

  useEffect(() => {
    if (errorMsg) alert(errorMsg);
  }, [errorMsg]);

  return (
    <div className="signup__fullscreen-wrapper">
      <FormContainer>
        <Heading>Join us!</Heading>
        <p>Start managing tasks easily.</p>

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
        <p>
          Passwords must contain at least 1 upper case letter, 1 lower case letter and one number AND special character.
        </p>
        <hr />
        <div>
          <Button fullWidth variant="contained" color="primary" onClick={submit}>
            SIGN UP
          </Button>
        </div>
      </FormContainer>
    </div>
  );
}

SignUp.propTypes = {
  errorMsg: PropTypes.string.isRequired,
  userSignUp: PropTypes.func.isRequired,
};

export default SignUp;
