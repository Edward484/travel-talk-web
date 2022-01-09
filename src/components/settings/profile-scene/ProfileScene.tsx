import React, { useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentUserAtom } from '../../../global/atoms/AuthAtoms';
import { Box, Button, TextField, Typography } from '@mui/material';

const ProfileScene: React.FC = () => {
  const [profile, setProfile] = useRecoilState(currentUserAtom);
  const [username, setUsername] = useState('@' + profile?.username ?? '');

  const updateUsername = useCallback((value: string) => {
    if (value === '') {
      setUsername('@');
    } else {
      setUsername(value);
    }
  }, []);

  const onSubmit = () => {
    if (profile) {
      setProfile(currentVal => ({
        ...currentVal!!,
        // Remove the @
        username: username.substring(1),
      }));
    }

    //TODO: Send the PATCH
  };

  return (
    <Box>
      <Box marginBottom="1rem">
        <Typography variant="h3" fontSize="1.25rem" fontWeight="700">
          New username
        </Typography>
      </Box>
      <Box marginBottom="1rem" fontSize="0.75rem">
        <TextField
          value={username}
          onChange={e => updateUsername(e.target.value)}
          inputProps={{ style: { height: '1rem', fontSize: '0.75' } }}
          variant="standard"
        />
      </Box>
      <Box>
        <Button onClick={onSubmit} disabled={username === '@'}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileScene;
