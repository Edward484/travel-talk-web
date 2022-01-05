import React, { useState } from 'react';
import colors from '../../../lib/theme/colors';
import { Box, Button, TextField, Typography } from '@mui/material';
import { loginApiReq } from '../../../api/requests/auth/auth-api-requests';
import { isLoginError, LoginErrorType } from '../../../api/types/auth';
import { EMAIL_REGEX } from '../../../global/constants/utils';

interface LoginFormProps {
  /**
   * Toggle between login and register form
   */
  toggleForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ toggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<string | undefined>(
    undefined,
  );

  const validatePassword = () => {
    let error = undefined;
    if (password.length < 6) {
      error = 'Password must have at least 6 characters';
    } else if (!password.match(/[a-z]/)) {
      error = 'Password must have at least one lowercase letter';
    } else if (!password.match(/[A-Z]/)) {
      error = 'Password must have at least one uppercase letter';
    } else if (!password.match(/\d/)) {
      error = 'Password must have at least one digit';
    } else if (!password.match(/[^\w\d]/)) {
      error = 'Password must have at least one non alphanumeric character';
    }

    setPasswordError(error);
    return !error;
  };

  const validateEmail = () => {
    const isValid = !!email.match(EMAIL_REGEX);
    setEmailError(isValid ? undefined : 'Invalid email');
    return isValid;
  };

  const signIn = async () => {
    const isPasswordValid = validatePassword();
    const isEmailValid = validateEmail();

    if (isPasswordValid && isEmailValid) {
      const res = await loginApiReq({ email, password });
      if (isLoginError(res)) {
        switch (res.type) {
          case LoginErrorType.INTERNAL_SERVER_ERROR: {
            //Set error on both fields, but show the message only on one
            setEmailError(res.message);
            setPasswordError('');
            break;
          }
          case LoginErrorType.UNKNOWN: {
            //Set error on both fields, but show the message only on one
            setEmailError(res.message);
            setPasswordError('');
            break;
          }
          case LoginErrorType.USER_NOT_FOUND: {
            setEmailError(res.message);
            break;
          }
          case LoginErrorType.WRONG_PASSWORD: {
            setPasswordError(res.message);
            break;
          }
        }
      } else {
        //TODO: Fetch the current user
        // TODO: Redirect
      }
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      bgcolor={colors.paper}
      width="100%"
    >
      <Box marginBottom="0.5rem" width="50%">
        <TextField
          style={{ width: '100%' }}
          label="Email"
          variant="standard"
          value={email}
          onChange={e => setEmail(e.target.value)}
          error={emailError !== undefined}
          helperText={emailError}
        />
      </Box>
      <Box marginBottom="1.5rem" width="50%">
        <TextField
          style={{ width: '100%' }}
          label="Password"
          variant="standard"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          error={passwordError !== undefined}
          helperText={passwordError}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="40%"
      >
        <Button variant="contained" onClick={signIn}>
          <Typography variant="h5" fontSize="1rem">
            Sign In
          </Typography>
        </Button>
        <Button variant="text" onClick={toggleForm}>
          <Typography variant="h5" fontSize="1rem">
            Sign Up
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
