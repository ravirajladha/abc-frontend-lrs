import USER_TYPES from '../auth.constants';

const USERS = [
  { name: 'Admin', type: USER_TYPES.ADMIN, path: '/admin/dashboard', value: 0 },
  {
    name: 'School',
    type: USER_TYPES.SCHOOL,
    path: '/school/dashboard',
    value: 1,
  },
  {
    name: 'Teacher',
    type: USER_TYPES.TEACHER,
    path: '/teacher/dashboard',
    value: 2,
  },
  {
    name: 'Parent',
    type: USER_TYPES.PARENT,
    path: '/parent/dashboard',
    value: 3,
  },
  {
    name: 'Student',
    type: USER_TYPES.STUDENT,
    path: '/student/dashboard',
    value: 4,
  },
  {
    name: 'Recruiter',
    type: USER_TYPES.RECRUITER, 
    path: '/recruiter/dashboard',
    value: 5,
  },
];

export default USERS;
