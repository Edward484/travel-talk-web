import React from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './api/utils/QueryClient';
import Router from './routing/Router';
import { ThemeProvider } from '@mui/material';
import theme from './lib/theme/theme';

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Router />
          </Layout>
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
