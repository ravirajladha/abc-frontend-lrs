export function getTokenFromLocalStorage(token) {
  const storedItem = localStorage.getItem(`${token}`);
  if (storedItem !== null) {
    try {
      return storedItem;
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return null;
    }
  }
  return null;
}

export function setTokenInLocalStorage(token, value) {
  try {
    localStorage.setItem(token, value);
    return getTokenFromLocalStorage(token);
  } catch (error) {
    console.error('Error setting localStorage:', error);
    return null;
  }
}

export const setUserDataInLocalStorage = (userData) => {
  if (userData) {
    localStorage.setItem('user', JSON.stringify(userData));
  }
};

export const setStudentDataInLocalStorage = (studentData) => {
  if (studentData) {
    localStorage.setItem('student_data', JSON.stringify(studentData));
  }
};

export const updateParentDataInLocalStorage = (parentData) => {
  let studentData = JSON.parse(localStorage.getItem('student_data'));

  if (studentData) {
    studentData = { ...studentData, ...parentData };
    localStorage.setItem('student_data', JSON.stringify(studentData));
  }
};

export const setUserTypeInLocalStorage = (type) => {
  localStorage.setItem('type', JSON.stringify(type));
};

export const removeAuthFromLocalStorage = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('type');
  localStorage.removeItem('access_token');
  localStorage.removeItem('student_data');
};
