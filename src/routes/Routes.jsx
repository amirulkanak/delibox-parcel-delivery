import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';

import NotFoundPage from '@/pages/NotFoundPage';
import HomePage from '@/pages/Home/HomePage';
import LoginPage from '@/pages/Auth/Login/LoginPage';
import ForgetPasswordPage from '@/pages/Auth/ForgetPassword/ForgetPasswordPage';
import Signup from '@/pages/Auth/Signup/SignupPage';
import Dashboard from '@/pages/dashboard/Dashboard';
import BookParcel from '@/pages/dashboard/user/BookParcel';

const routes = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
        children: [
          {
            path: 'book-parcel',
            element: <BookParcel />,
          },
        ],
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/forget-password',
        element: <ForgetPasswordPage />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
    ],
  },
]);

export default routes;
