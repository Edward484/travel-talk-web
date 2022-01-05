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

const RegisterForm: React.FC<LoginFormProps> = ({ toggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const [errors, setErrors] = useState([]);

  const register = async () => {
    if (isPasswordValid && isEmailValid) {
      //  TODO: Register
      //TODO: Handle errors
    }
  };

  //TODO: Add username input
  //TODO: Add error msg mapping
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

export default RegisterForm;
