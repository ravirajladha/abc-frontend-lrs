const getUserDataFromLocalStorage = () => {
  const storedUser = localStorage.getItem('user');
  if (storedUser !== null) {
    try {
      return storedUser;
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return null;
    }
  }
  return null;
};

const getStudentDataFromLocalStorage = () => {
  const storedStudent = localStorage.getItem('student_data');
  if (storedStudent !== null) {
    try {
      return storedStudent;
    } catch (error) {
      console.error('Error parsing student data JSON:', error);
      return null;
    }
  }
  return null;
};

export { getUserDataFromLocalStorage, getStudentDataFromLocalStorage };
