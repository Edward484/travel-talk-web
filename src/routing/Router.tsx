import React from 'react';
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import AuthPage from '../pages/auth-page/AuthPage';
import Layout from '../components/layout/Layout';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="auth" element={<AuthPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
export default Router;
