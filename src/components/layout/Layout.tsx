import React from 'react';
import { Box } from '@mui/material';
import colors from '../../lib/theme/colors';
import Navbar from './navbar/Navbar';

const Layout: React.FC = ({ children }) => {
  return (
    <Box backgroundColor={colors.background} py="0.25rem" px="0.5rem">
      <Box mb="0.5rem">
        <Navbar />
      </Box>
      {children}
    </Box>
  );
};
