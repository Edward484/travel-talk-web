import React, { useEffect, useState } from 'react';
import { CategoryApiResponse } from '../../../api/types/categories';
import { getAllCategories } from '../../../api/requests/categories/categories-api-requests';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import colors from '../../../lib/theme/colors';
import Logo from '../logo/Logo';
import useIsLoggedIn from '../../../lib/hooks/auth/useIsLoggedIn';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentUserAtom } from '../../../global/atoms/AuthAtoms';
import { Link } from 'react-router-dom';
import { allCategoriesAtom } from '../../../global/atoms/CategoryAtoms';

const Navbar = () => {
  const [categories, setCategories] = useRecoilState(allCategoriesAtom);
  const navigate = useNavigate();
  const isLoggedIn = useIsLoggedIn();
  const profile = useRecoilValue(currentUserAtom);

  //Get all the categories on page load
  useEffect(() => {
    getAllCategories().then(setCategories);
    console.log("Categ:",categories )
  }, []);

  const renderCategories = () =>
    categories.map(category => (
      <Button variant="text" key={category.categoryId}>
        <Link to={`/${category.categoryId}`}>
          <Typography variant="h5">{category.name}</Typography>
        </Link>
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
      <Link to={'/'}>
        <Logo />
      </Link>
      <Box display="flex" marginLeft="0.25rem">
        {renderCategories()}
      </Box>
      <Box marginLeft="auto">
        {!isLoggedIn && (
          <Button onClick={goToAuthPage} variant="text">
            <Typography variant="button">Sign In</Typography>
          </Button>
        )}
        {isLoggedIn && (
          <Button onClick={() => navigate('/settings/profile')} variant="text">
            <Typography variant="button">
              {profile ? `@${profile.username}` : 'Settings'}
            </Typography>
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
