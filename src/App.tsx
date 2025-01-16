import { ComponentType, lazy, Suspense } from 'react';

import { createBrowserRouter, Outlet } from 'react-router-dom';

import { AppLayout, LoadingSection } from './components';
import { RoutePath } from './constant/route.ts';

const FancyForm = lazy(() => import('./pages/fancy-form'));
const MessyReact = lazy(() => import('./pages/messy-react'));
const SumToN = lazy(() => import('./pages/sum-to-n'));
const NotFound = lazy(() => import('./pages/not-found'));

const withLayoutSuspense = (Component: ComponentType) => (
  <AppLayout>
    <Suspense fallback={<LoadingSection />}>
      <Component />
    </Suspense>
  </AppLayout>
);

export const appRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    errorElement: withLayoutSuspense(NotFound),
    children: [
      {
        index: true,
        element: withLayoutSuspense(FancyForm),
      },
      {
        path: RoutePath.MESSY_REACT,
        element: withLayoutSuspense(MessyReact),
      },
      {
        path: RoutePath.SUM_TO_N,
        element: withLayoutSuspense(SumToN),
      },
    ],
  },
]);
