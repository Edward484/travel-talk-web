import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import colors from '../../lib/theme/colors';
import LoginForm from '../../components/auth/login-form/LoginForm';

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  return (
    <Box
      width="100%"
      height="calc(100% - 72px)"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        py="0.5rem"
        bgcolor={colors.paper}
        boxShadow="1px 4px 4px #ACACAC"
        width="30%"
      >
        <Box marginBottom="0.75rem">
          <Typography variant="h2" fontSize="2.5rem" fontWeight="500">
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </Typography>
        </Box>
        {isSignIn ? (
          <LoginForm toggleForm={() => setIsSignIn(x => !x)} />
        ) : null}
      </Box>
    </Box>
  );
};
export default AuthPage;
