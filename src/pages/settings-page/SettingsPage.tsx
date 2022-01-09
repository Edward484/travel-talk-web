import React from 'react';
import { Box, Icon, Typography } from '@mui/material';
import colors from '../../lib/theme/colors';
import { useRecoilValue } from 'recoil';
import { currentUserAtom } from '../../global/atoms/AuthAtoms';
import { Roles } from '../../models/user';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router';
import style from './SettingsPage.module.scss';

const SettingsPage = () => {
  const profile = useRecoilValue(currentUserAtom);
  const navigate = useNavigate();

  // @param icon is a material icon string
  const renderMenuButton = (label: string, icon: string, subRoute: string) => (
    <Box
      p="0.5rem"
      sx={{ ':hover': { bgcolor: colors.secondary, cursor: 'pointer' } }}
      onClick={() => navigate(subRoute)}
      display="flex"
      alignItems="center"
      className={style.sideMenuItem}
    >
      <Box marginRight="0.5rem">
        <Icon>{icon}</Icon>
      </Box>
      <Typography variant="h5" fontSize="1rem" fontWeight="500">
        {label}
      </Typography>
    </Box>
  );
  return (
    <Box width="50%" mx="auto" display="flex" paddingTop="10vh">
      <Box
        marginTop="2rem"
        width="200px"
        borderRadius="1rem"
        bgcolor={colors.paper}
        boxShadow={'1px 4px 4px #acacac'}
        marginRight="3rem"
        height="fit-content"
      >
        {renderMenuButton('Edit Profile', 'edit', 'profile')}
        {profile?.roles.find(role => role === Roles.Admin)
          ? renderMenuButton('Edit Roles', 'admin_panel_settings', 'roles')
          : null}
        {profile?.roles.find(role => role === Roles.Admin)
          ? renderMenuButton('Add categories', 'add', 'categories')
          : null}
      </Box>
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default SettingsPage;
