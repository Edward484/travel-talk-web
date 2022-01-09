import React, { useState } from 'react';
import colors from '../../../lib/theme/colors';
import {
  Box,
  Button,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import { registerApiReq } from '../../../api/requests/auth/auth-api-requests';
import { isRegisterError } from '../../../api/types/auth';

interface RegisterFormProps {
  /**
   * Toggle between login and register form
   */
  toggleForm: () => void;
  showSuccessToast: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  toggleForm,
  showSuccessToast,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const [errors, setErrors] = useState<string[]>([]);

  const register = async () => {
    try {
      await registerApiReq({ email, password, username });
      toggleForm();
      showSuccessToast();
    } catch (e) {
      if (isRegisterError(e)) {
        if (typeof e === 'string') {
          setErrors([e]);
        } else {
          setErrors(e.map(error => error.description));
        }
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
      {errors.length > 0 && (
        <Box ml="2.5rem" mr="0.5rem" width="50%">
          <List sx={{ listStyle: 'disc', color: colors.error }}>
            {errors.map(e => (
              <ListItem sx={{ px: 0, display: 'list-item' }}>
                <Typography color={colors.error}>{e}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
      <Box marginBottom="0.5rem" width="50%">
        <TextField
          style={{ width: '100%' }}
          label="Email"
          variant="standard"
          value={email}
          onChange={e => setEmail(e.target.value)}
          error={errors.length > 0}
        />
      </Box>
      <Box marginBottom="0.5rem" width="50%">
        <TextField
          style={{ width: '100%' }}
          label="Username"
          variant="standard"
          value={username}
          onChange={e => setUsername(e.target.value)}
          error={errors.length > 0}
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
          error={errors.length > 0}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="40%"
      >
        <Button variant="contained" onClick={register}>
          <Typography variant="h5" fontSize="1rem">
            Sign Up
          </Typography>
        </Button>
        <Button variant="text" onClick={toggleForm}>
          <Typography variant="h5" fontSize="1rem">
            Sign Ip
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterForm;
