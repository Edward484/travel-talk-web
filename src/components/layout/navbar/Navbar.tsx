import React, { useEffect, useState } from 'react';
import { CategoryApiResponse } from '../../../api/types/categories';
import { getAllCategories } from '../../../api/requests/categories/categories-api-requests';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import colors from '../../../lib/theme/colors';
import Logo from '../logo/Logo';

const Navbar = () => {
  const [categories, setCategories] = useState<CategoryApiResponse[]>([]);
  const navigate = useNavigate();

  //Get all the categories on page load
  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  //TODO: Animate entry
  const renderCategories = () =>
    categories.map(category => (
      <Button variant="text" key={category.categoryId}>
        <Typography variant="h5">{category.name}</Typography>
      </Button>
    ));

  const goToAuthPage = () => navigate('/auth');

  return (
    <Box
      display="flex"
      px="0.5rem"
      py="0.25rem"
      height="64px"
      width="50vw"
      borderRadius="0.75rem"
      bgcolor={colors.paper}
      alignItems="center"
    >
      <Logo />
      <Box display="flex" marginLeft="0.25rem">
        {renderCategories()}
      </Box>
      <Box marginLeft="auto">
        <Button onClick={goToAuthPage} variant="text">
          <Typography variant="button">Sign In</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Navbar;
