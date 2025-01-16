import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { ThemeProvider } from './components';
import { RouterProvider } from 'react-router-dom';
import { appRoutes } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={appRoutes} />
    </ThemeProvider>
  </StrictMode>
);
