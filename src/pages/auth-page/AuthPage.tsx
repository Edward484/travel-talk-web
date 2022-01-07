import React, { useState } from 'react';
import { Alert, Box, Snackbar, Typography } from '@mui/material';
import colors from '../../lib/theme/colors';
import LoginForm from '../../components/auth/login-form/LoginForm';
import RegisterForm from '../../components/auth/register-form/RegisterForm';

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showSuccessRegisterToast, setShowRegisterToast] = useState(false);
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
        ) : (
          <RegisterForm
            toggleForm={() => setIsSignIn(x => !x)}
            showSuccessToast={() => setShowRegisterToast(true)}
          />
        )}
      </Box>
      <Snackbar
        open={showSuccessRegisterToast}
        onClose={() => setShowRegisterToast(false)}
        autoHideDuration={2000}
      >
        <Alert onClose={() => setShowRegisterToast(false)} severity="success">
          Register successful
        </Alert>
      </Snackbar>
    </Box>
  );
};
export default AuthPage;
