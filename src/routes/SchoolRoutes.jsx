import {
  // AssignTeacher,
  CreateStudent,
  // CreateTeacher,
  EditStudent,
  // EditTeacher,
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
  // SchoolTeachers,
  ShowStudent,
AcademicInternship,
// AcademicInternshipTask,
AcademicInternshipParticipants,
AcademicInternshipParticipantProgress,
AcademicInternshipTask
  // ShowTeacher,
} from '@/pages';
import { StudentProfile } from '@/pages';

import { getUserDataFromLocalStorage } from '@/utils/services';
const userData = JSON.parse(getUserDataFromLocalStorage());
//checking the school type, as the school type is public (0). the school should not have access to add student.
const isAllowed = userData?.school_type !== 0;
const SchoolRoutes = [
  // Add school routes here
  { path: 'dashboard', element: <SchoolDashboard /> },
  // { path: 'teachers', element: <SchoolTeachers /> },
  // { path: 'trainers/create', element: <CreateTeacher /> },
  // {
  //   path: 'trainers/:teacherId/show',
  //   element: <ShowTeacher title="Teacher Details" />,
  // },
  // { path: 'trainers/:teacherId/edit', element: <EditTeacher /> },
  // { path: 'trainers/:teacherId/assign', element: <AssignTeacher /> },
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
    path: 'students/public-students/:studentId/show-profile',
    element: (
      <StudentProfile
        title="Student Profile Students"
        isAdmin="true"
        isStudent="false"
      />
    ),
  },
  {
    path: 'students/:studentId/:classId/assessment-result',
    element: <SchoolAssessmentResults title="Assessment Result" />,
  },
  {
    path: 'internship',
    element: <AcademicInternship title="AcademicInternship" />,
  },
  {
    path: 'internship/:internshipId/participants',
    element: <AcademicInternshipParticipants title="AcademicInternship Participants" />,
  },
  {
    path: 'internship/:internshipId/participants/:studentId/progress',
    element: <AcademicInternshipParticipantProgress title="AcademicInternship Student Progress" />,
  },
  {
    path: 'internship/:internshipId/tasks',
    element: <AcademicInternshipTask title="AcademicInternship Task" />,
  },
  // {
  //   path: 'internship/:taskId',
  //   element: <AcademicInternshipTask title="AcademicInternship Tasks" />,
  // },

  
].filter(Boolean);

export default SchoolRoutes;
