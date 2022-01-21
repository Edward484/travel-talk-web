import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import AuthPage from '../pages/auth-page/AuthPage';
import Layout from '../components/layout/Layout';
import ProtectedRoute from './components/protected-route/ProtectedRoute';
import useIsLoggedIn from '../lib/hooks/auth/useIsLoggedIn';
import SettingsPage from '../pages/settings-page/SettingsPage';
import ProfileScene from '../components/settings/profile-scene/ProfileScene';
import RolesScene from '../components/settings/role-scene/RoleScene';
import CategoryScene from '../components/settings/category-scene/CategoryScene';
import TestPage from "../pages/test-page/TestPage";

const Router = () => {
  const isLoggedIn = useIsLoggedIn();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="auth" element={<AuthPage />} />
          <Route
            path="settings"
            element={
              <ProtectedRoute validation={() => isLoggedIn} fallbackRoute={'/'}>
                <SettingsPage />
              </ProtectedRoute>
            }
          >
            <Route path="profile" element={<ProfileScene />} />
            <Route path="roles" element={<RolesScene />} />
            <Route path="categories" element={<CategoryScene />} />
          </Route>
          <Route path="" element={<TestPage/>}  />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
