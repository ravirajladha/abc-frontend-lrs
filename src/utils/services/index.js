import apiService from './api.service';
import axiosInstance from './axios.service';
import authService from './auth.service';
import { getUserDataFromLocalStorage, getStudentDataFromLocalStorage } from './user.service';

export {
  authService,
  axiosInstance,
  apiService,
  getUserDataFromLocalStorage,
  getStudentDataFromLocalStorage
};
