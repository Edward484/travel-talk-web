import React from 'react';
import colors from '../../../lib/theme/colors';
import { Box, Button, TextField, Typography } from '@mui/material';
import useLogin from '../../../lib/hooks/auth/useLogin';

interface LoginFormProps {
  /**
   * Toggle between login and register form
   */
  toggleForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ toggleForm }) => {
  const {
    setPassword,
    password,
    setEmail,
    passwordError,
    emailError,
    email,
    signIn,
  } = useLogin();

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
