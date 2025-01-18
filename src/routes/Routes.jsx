import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';

import NotFoundPage from '@/pages/NotFoundPage';
import HomePage from '@/pages/Home/HomePage';
import LoginPage from '@/pages/Auth/Login/LoginPage';
import ForgetPasswordPage from '@/pages/Auth/ForgetPassword/ForgetPasswordPage';
import Signup from '@/pages/Auth/Signup/SignupPage';
import Dashboard from '@/pages/dashboard/Dashboard';
import BookParcelPage from '@/pages/dashboard/user/BookParcelPage';
import PrivateRoute from './PrivateRoute';
import UserRoute from './UserRoute';
import MyParcelPage from './../pages/dashboard/user/MyParcelPage';
import MyProfilePage from '@/pages/dashboard/MyProfilePage';
import DeliveryManRoute from './DeliveryManRoute';
import DeliveryListPage from '@/pages/dashboard/deliveryMan/DeliveryListPage';
import MyReviewPage from '@/pages/dashboard/deliveryMan/MyReviewPage';
import AdminRoute from './AdminRoute';
import AllParcelPage from '@/pages/dashboard/admin/AllParcelPage';
import AllUserPage from '@/pages/dashboard/admin/AllUserPage';
import AllDeliveryMen from '@/pages/dashboard/admin/AllDeliveryMen';
import AdminStatisticsPage from '@/pages/dashboard/admin/AdminStatisticsPage';
import ParcelUpdatePage from '@/pages/dashboard/user/ParcelUpdatePage';

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
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        children: [
          {
            path: 'my-profile',
            element: (
              <PrivateRoute>
                <MyProfilePage />
              </PrivateRoute>
            ),
          },
          // User routes
          {
            path: 'book-parcel',
            element: (
              <PrivateRoute>
                <UserRoute>
                  <BookParcelPage />
                </UserRoute>
              </PrivateRoute>
            ),
          },
          {
            path: 'my-parcels',
            element: (
              <PrivateRoute>
                <UserRoute>
                  <MyParcelPage />
                </UserRoute>
              </PrivateRoute>
            ),
          },
          {
            path: 'update-parcel/:id',
            element: (
              <PrivateRoute>
                <UserRoute>
                  <ParcelUpdatePage />
                </UserRoute>
              </PrivateRoute>
            ),
          },
          // Delivery Man routes
          {
            path: 'delivery-list',
            element: (
              <PrivateRoute>
                <DeliveryManRoute>
                  <DeliveryListPage />
                </DeliveryManRoute>
              </PrivateRoute>
            ),
          },
          {
            path: 'my-reviews',
            element: (
              <PrivateRoute>
                <DeliveryManRoute>
                  <MyReviewPage />
                </DeliveryManRoute>
              </PrivateRoute>
            ),
          },
          // Admin routes
          {
            path: 'all-parcels',
            element: (
              <PrivateRoute>
                <AdminRoute>
                  <AllParcelPage />
                </AdminRoute>
              </PrivateRoute>
            ),
          },
          {
            path: 'all-users',
            element: (
              <PrivateRoute>
                <AdminRoute>
                  <AllUserPage />
                </AdminRoute>
              </PrivateRoute>
            ),
          },
          {
            path: 'all-delivery-men',
            element: (
              <PrivateRoute>
                <AdminRoute>
                  <AllDeliveryMen />
                </AdminRoute>
              </PrivateRoute>
            ),
          },
          {
            path: 'admin-statistics',
            element: (
              <PrivateRoute>
                <AdminRoute>
                  <AdminStatisticsPage />
                </AdminRoute>
              </PrivateRoute>
            ),
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
