import React, { useCallback, useState } from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {authTokenAtom, currentUserAtom} from '../../../global/atoms/AuthAtoms';
import { Box, Button, TextField, Typography } from '@mui/material';
import {changeUserName} from "../../../api/requests/profile/profile-api-requests";

const ProfileScene: React.FC = () => {
  const apiToken = useRecoilValue(authTokenAtom);
  const [profile, setProfile] = useRecoilState(currentUserAtom);
  const [username, setUsername] = useState('@' + profile?.username ?? '');

  const updateUsername = useCallback((value: string) => {
    if (value === '') {
      setUsername('@');
    } else {
      setUsername(value);
    }
  }, []);

  const onSubmit = async () => {
    if (profile) {
      setProfile(currentVal => ({
        ...currentVal!!,
        // Remove the @
        username: username.substring(1),
      }));
    }

    if (apiToken) {
      const res = await changeUserName(username.substring(1), apiToken.token)
    }
    //TODO: Check the PATCH
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
