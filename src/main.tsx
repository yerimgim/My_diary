import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './errorPage';
import Diary from './components/Diary.tsx';
import DiaryList from './components/DiaryList.tsx';
import Calendar from './components/Calendar.tsx';

const router = createBrowserRouter([
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
    path: '/login',
    element: <div>Hello world!</div>,
  },
  {
    path: '/calendar',
    element: <Calendar />,
  },
  {
    path: '/diary',
    element: <Diary />,
  },
  {
    path: '/diaryList',
    element: <DiaryList />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
