import {
  AssignTeacher,
  CreateStudent,
  CreateTeacher,
  EditStudent,
  EditTeacher,
  SchoolApplication,
  SchoolApplicationDetails,
  SchoolAssessmentResults,
  SchoolBlackListedApplication,
  SchoolDashboard,
  SchoolOldApplication,
  SchoolOldApplicationDetails,
  SchoolOldApplicationUpload,
  SchoolResults,
  SchoolSettings,
  SchoolStudents,
  SchoolTeachers,
  ShowStudent,
  ShowTeacher,
} from '@/pages';
import { getUserDataFromLocalStorage } from '@/utils/services';
const userData = JSON.parse(getUserDataFromLocalStorage());
//checking the school type, as the school type is public (0). the school should not have access to add student.
const isAllowed = userData?.school_type !== 0;
const SchoolRoutes = [
  // Add school routes here
  { path: 'dashboard', element: <SchoolDashboard /> },
  { path: 'teachers', element: <SchoolTeachers /> },
  { path: 'teachers/create', element: <CreateTeacher /> },
  {
    path: 'teachers/:teacherId/show',
    element: <ShowTeacher title="Teacher Details" />,
  },
  { path: 'teachers/:teacherId/edit', element: <EditTeacher /> },
  { path: 'teachers/:teacherId/assign', element: <AssignTeacher /> },
  { path: 'students', element: <SchoolStudents /> },
  isAllowed && { path: 'students/create', element: <CreateStudent /> },

  { path: 'students/:studentId/edit', element: <EditStudent /> },
  {
    path: 'students/:studentId/show',
    element: <ShowStudent title="Student Details" />,
  },
  { path: 'results', element: <SchoolResults /> },

  { path: 'applications', element: <SchoolApplication /> },
  {
    path: 'applications/:applicationId/view',
    element: <SchoolApplicationDetails />,
  },

  { path: 'applications/old-applications', element: <SchoolOldApplication /> },
  {
    path: 'applications/old-applications/:applicationId/view',
    element: <SchoolOldApplicationDetails />,
  },
  {
    path: 'applications/old-applications/upload',
    element: <SchoolOldApplicationUpload />,
  },

  {
    path: 'applications/black-listed-applications',
    element: <SchoolBlackListedApplication />,
  },

  { path: 'settings', element: <SchoolSettings title="Settings" /> },

  {
    path: 'students/:studentId/:classId/assessment-result',
    element: <SchoolAssessmentResults title="Assessment Result" />,
  },
].filter(Boolean);

export default SchoolRoutes;
