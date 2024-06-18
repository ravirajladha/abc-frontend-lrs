const userToken = localStorage.getItem('access_token')
  ? localStorage.getItem('access_token')
  : null;

const user = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

const userType = user ? user.type : null;

const isAuthenticated = localStorage.getItem('user') ? true : false;

const authConfig = {
  isAuthenticated,
  user,
  userType,
  userToken,
};

export default authConfig;
