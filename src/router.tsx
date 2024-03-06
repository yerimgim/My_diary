import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import GoogleCallback from './auth/GoogleCallback.tsx';
import PrivateRoute from './auth/PrivateRoute.tsx';

const ErrorPage = lazy(() => import('@/errorPage.tsx'));
const Calendar = lazy(() => import('@/components/Calendar.tsx'));
const Diary = lazy(() => import('@/components/Diary.tsx'));
const DiaryList = lazy(() => import('@/components/DiaryList.tsx'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/mainHome',
    element: <App />,
  },
  {
    path: '/calendar',
    element: (
      <PrivateRoute fallback="...">
        <Calendar />
      </PrivateRoute>
    ),
  },
  {
    path: '/diary',
    element: (
      <PrivateRoute fallback="...">
        <Diary />
      </PrivateRoute>
    ),
  },
  {
    path: '/diaryList',
    element: (
      <PrivateRoute fallback="...">
        <DiaryList />
      </PrivateRoute>
    ),
  },
  {
    path: '/api/auth/google/callback',
    element: (
      <Suspense fallback="...">
        <GoogleCallback />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: (
      <Suspense fallback="...">
        <ErrorPage />
      </Suspense>
    ),
  },
]);
