import * as React from 'react';
import { NextAppProvider } from '@toolpad/core/nextjs';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import LinearProgress from '@mui/material/LinearProgress'
import type { Navigation } from '@toolpad/core/AppProvider';

import theme from '../theme';

export const metadeta = {
  title: 'ParkPals',
  description: 'This is a companion app to the coding challenge for entratus.ai',
};

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: '',
    title: 'National Park Weather',
    icon: <DashboardIcon />,
  },
 
];

const BRANDING = {
  title: 'Entratus.ai',
};



export default function RootLayout(props: { children: React.ReactNode }) {
  

  return (
    <html lang="en" data-toolpad-color-scheme="light" suppressHydrationWarning>
      <body>
        
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <React.Suspense fallback={<LinearProgress />}>
            <NextAppProvider
              navigation={NAVIGATION}
              branding={BRANDING}
              
              theme={theme}
            >
              {props.children}
            </NextAppProvider>
            </React.Suspense>
          </AppRouterCacheProvider>
        
      </body>
    </html>
  );
}
