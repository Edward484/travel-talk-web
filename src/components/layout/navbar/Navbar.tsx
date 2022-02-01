import React, { useEffect, useState } from 'react';
import { CategoryApiResponse } from '../../../api/types/categories';
import { getAllCategories } from '../../../api/requests/categories/categories-api-requests';
import {Box, Button, Grid, Popover, Typography} from '@mui/material';
import { useNavigate } from 'react-router';
import colors from '../../../lib/theme/colors';
import Logo from '../logo/Logo';
import useIsLoggedIn from '../../../lib/hooks/auth/useIsLoggedIn';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentUserAtom } from '../../../global/atoms/AuthAtoms';
import { Link } from 'react-router-dom';
import { allCategoriesAtom } from '../../../global/atoms/CategoryAtoms';
import { TabScrollButton } from '@mui/material';
import Notifications from "../../notification/Notifications";
import NotificationsList from "../../notification/NotificationsList";


const Navbar = () => {
  const [categories, setCategories] = useRecoilState(allCategoriesAtom);
  const navigate = useNavigate();
  const isLoggedIn = useIsLoggedIn();
  const profile = useRecoilValue(currentUserAtom);

  //Get all the categories on page load
  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);



  const renderCategories = () =>
    categories.map(category => (
      <Button variant="text" key={category.categoryId}>
        <Link to={`/${category.categoryId}`}
              style={{ textDecoration: 'none' }}
        >
          <Typography
              variant="h5"
              sx={{color:'primary.main'}}
          >
            {category.name}</Typography>
        </Link>
      </Button>
    ));

  const notificationPopover = () => {}

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
      <Grid
        style={{display:'flex'}}
        marginLeft="auto" >
        {!isLoggedIn && (
          <Button onClick={goToAuthPage} variant="text">
            <Typography variant="button">Sign In</Typography>
          </Button>
        )}
        {isLoggedIn && (
            <Notifications/>
        )}
        {isLoggedIn && (
          <Button onClick={() => navigate('/settings/profile')} variant="text">
            <Typography variant="button">
              {profile ? `@${profile.username}` : 'Settings'}
            </Typography>
          </Button>
        )}
      </Grid>
    </Box>
  );
};

export default Navbar;
