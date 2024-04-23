import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import GoogleCallback from './auth/GoogleCallback.tsx';
import PrivateRoute from './auth/PrivateRoute.tsx';
import Mypage from './components/Mypage.tsx';

const ErrorPage = lazy(() => import('@/errorPage.tsx'));
const Calendar = lazy(() => import('@/components/Calendar.tsx'));
const Diary = lazy(() => import('@/components/Diary.tsx'));
const DiaryList = lazy(() => import('@/components/DiaryList.tsx'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage textContent="" />,
  },
  {
    path: '/mainHome',
    element: <App />,
  },
  {
    path: '/calendar',
    element: (
      <PrivateRoute>
        <Calendar />
      </PrivateRoute>
    ),
  },
  {
    path: '/diary',
    element: (
      <PrivateRoute>
        <Diary />
      </PrivateRoute>
    ),
  },
  {
    path: '/diaryList',
    element: (
      <PrivateRoute>
        <DiaryList />
      </PrivateRoute>
    ),
  },
  {
    path: '/api/auth/google/callback',
    element: (
      <Suspense>
        <GoogleCallback />
      </Suspense>
    ),
  },
  {
    path: '/mypage',
    element: (
      <Suspense>
        <Mypage />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: (
      <Suspense fallback="...">
        <ErrorPage textContent="잘못된 접근입니다." />
      </Suspense>
    ),
  },
]);
