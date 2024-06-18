import axios from 'axios';
import { removeAuthFromLocalStorage } from '@/utils/helpers/auth.helper';

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + 'api/',
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // setting auth headers
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  async (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const {
          data: { token },
        } = await axiosInstance.post('/refresh-token', {
          refreshToken: localStorage.getItem('refreshToken'),
        });

        localStorage.setItem('access_token', token);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        console.error('Failed to refresh token:', error);
      }
    }

    if (error.response.status === 403) {
      await handleLogout();
    }

    return Promise.reject(error);
  }
);

const handleLogout = async () => {
  try {
    removeAuthFromLocalStorage();
    window.location.reload();
  } catch (logoutError) {
    console.error('Error during logout:', logoutError);
    throw logoutError;
  }
};

export default axiosInstance;
