import React, { useEffect, useState } from 'react';
import { CategoryApiResponse } from '../../../api/types/categories';
import { getAllCategories } from '../../../api/requests/categories/categories-api-requests';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

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

  //TODO: Adjust for mobile
  return (
    <Box
      display="flex"
      px="0.5rem"
      py="0.25rem"
      height="64px"
      width="50vw"
      borderRadius="0.75rem"
      backgroundColor={colors.paper}
    >
      <Logo />
      <Box display="flex" marginLeft="0.25rem">
        {renderCategories()}
      </Box>
      <Button onClick={goToAuthPage} variant="text" margiLeft="auto">
        <Typography variant="h5">Sign In</Typography>
      </Button>
    </Box>
  );
};

export default Navbar;
