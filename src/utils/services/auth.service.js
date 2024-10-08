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
  setStudentDataInLocalStorage(response.data.student_data);
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axiosInstance.post('login', userData);
  setTokenInLocalStorage('access_token', response.data.access_token);
  setUserDataInLocalStorage(response.data.user);
  setStudentDataInLocalStorage(response.data.student_data);
  setUserTypeInLocalStorage(response.data.user_type);
  console.log(response, 'response from auth service');
  return response.data;
};

// Logout user
const logout = async () => {
  try {
    const response = await axiosInstance.post('logout');
    if (response) {
      removeAuthFromLocalStorage();
      localStorage.removeItem('is_paid');
    }
    return response;
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};

const verifyEmailAndSendOtp = async (userData) => {
  try {
    const response = await axiosInstance.post('verify-email-and-send-otp', userData);
    return response;
  } catch (error) {
    console.error('Error during verify:', error);
    throw error;
  }
}

const verifyPhoneAndSendOtp = async (userData) => {
  try {
    const response = await axiosInstance.post('verify-phone-and-send-otp', userData);
    return response;
  } catch (error) {
    console.error('Error during verify:', error);
    throw error;
  }
}

const verifyOtp = async (userData) => {
  try {
    const response = await axiosInstance.post('verify-otp', userData);
    return response;
  } catch (error) {
    console.error('Error during verify:', error);
    throw error;
  }
}
const resetPassword = async (userData) => {
  try {
    const response = await axiosInstance.post('reset-password', userData);
    return response;
  } catch (error) {
    console.error('Error during reset:', error);
    throw error;
  }
}
// Update payment status

const updatePaymentStatus = async (data) => {
  const response = await axiosInstance.post(`/update-payment-status`, data);
  if (response.status === 200) {
    // Get the current student data from local storage
    const studentData = JSON.parse(localStorage.getItem('student_data'));

    // Update the is_paid field
    studentData.is_paid = true;

    // Save the updated student data back to local storage
    setStudentDataInLocalStorage(studentData);

    // Also update the separate is_paid item in local storage
    localStorage.setItem('is_paid', 'true');

    return response.data;
  } else {
    throw new Error('Failed to update payment status');
  }
};


const authService = {
  register,
  login,
  logout,
  verifyEmailAndSendOtp,
  verifyPhoneAndSendOtp,
  verifyOtp,
  resetPassword,
  updatePaymentStatus,
};

export default authService;
