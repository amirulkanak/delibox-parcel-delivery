import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import routes from './routes/Routes';
import '@/styles/globalStyle.css';
import UserAuthContextProvider from '@/context/UserAuthContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserAuthContextProvider>
      <RouterProvider router={routes} />
    </UserAuthContextProvider>
  </StrictMode>
);
