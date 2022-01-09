import React from 'react';
import { Box } from '@mui/material';
import colors from '../../lib/theme/colors';
import Navbar from './navbar/Navbar';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  //TODO: Check cookie for auth token
  return (
    <Box
      width="100vw"
      height="100vh"
      bgcolor={colors.background}
      py="0.25rem"
      px="0.5rem"
    >
      <Box width="fit-content" mx="auto" mb="0.5rem">
        <Navbar />
      </Box>
      <Outlet />
    </Box>
  );
};
export default Layout;
