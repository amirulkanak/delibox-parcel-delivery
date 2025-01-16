// axios instance for public api
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../useAuth';

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

export const useAxiosPublic = () => {
  const axiosPublic = axios.create({
    baseURL: BACKEND_API_URL,
  });

  return axiosPublic;
};

// axios instance for secure api with token in header from the local storage
export const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const axiosSecure = axios.create({
    baseURL: BACKEND_API_URL,
  });

  // Add a request interceptor to add token in header
  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('delibox-token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // interceptor to handle 401 and 403 errors
  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response.status === 401 || error.response.status === 403) {
        await user.logout();
        navigate('/login');
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};
