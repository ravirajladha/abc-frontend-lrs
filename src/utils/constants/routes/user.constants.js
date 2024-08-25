import USER_TYPES from '../auth.constants';

const USERS = [
  { name: 'Admin', type: USER_TYPES.ADMIN, path: '/admin/dashboard', value: 0 },
  {
    name: 'Student',
    type: USER_TYPES.STUDENT,
    path: '/student/dashboard',
    value: 1,
  },
  {
    name: 'TRAINER',
    type: USER_TYPES.TRAINER,
    path: '/trainer/dashboard',
    value: 2,
  },
  {
    name: 'Recruiter',
    type: USER_TYPES.RECRUITER, 
    path: '/recruiter/dashboard',
    value: 3,
  },
  {
    name: 'School',
    type: USER_TYPES.INTERNSHIP_ADMIN,
    path: '/academic-admin/dashboard',
    value: 4,
  },

];

export default USERS;
