import { axiosInstance } from '@/utils/services';

import {
  setTokenInLocalStorage,
  setUserDataInLocalStorage,
  setUserTypeInLocalStorage,
  removeAuthFromLocalStorage,
  setStudentDataInLocalStorage,
} from '@/utils/helpers/auth.helper';

// Register user
const register = async (userData) => {
  const response = await axiosInstance.post('signup', userData);

  setTokenInLocalStorage('access_token', response.data.access_token);
  setUserDataInLocalStorage(response.data.user);

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axiosInstance.post('login', userData);
  setTokenInLocalStorage('access_token', response.data.access_token);
  setUserDataInLocalStorage(response.data.user);
  setStudentDataInLocalStorage(response.data.student_data);
  setUserTypeInLocalStorage(response.data.user_type);

  return response.data;
};

// Logout user
const logout = async () => {
  try {
    const response = await axiosInstance.post('logout');
    if (response) {
      removeAuthFromLocalStorage();
    }
    return response;
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
