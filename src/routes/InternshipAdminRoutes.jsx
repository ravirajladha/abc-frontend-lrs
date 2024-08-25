import {
  // AssignTrainer,
  CreateStudent,
  // CreateTrainer,
  EditStudent,
  // EditTrainer,
  // InternshipAdminApplication,
  // InternshipAdminApplicationDetails,
  InternshipAdminAssessmentResults,
  // InternshipAdminBlackListedApplication,
  InternshipAdminDashboard,
  // InternshipAdminOldApplication,
  // InternshipAdminOldApplicationDetails,
  // InternshipAdminOldApplicationUpload,
  InternshipAdminResults,
  InternshipAdminSettings,
  InternshipAdminStudents,
  // SchoolTrainers,
  ShowStudent,
  // InternshipAdmin,
  // AcademicInternshipTask,
  InternshipAdminParticipants,
  InternshipAdminParticipantProgress,
  InternshipAdminTask,
  // ShowTrainer,
} from '@/pages';
import { StudentProfile } from '@/pages';

import { getUserDataFromLocalStorage } from '@/utils/services';
const userData = JSON.parse(getUserDataFromLocalStorage());
//checking the school type, as the school type is public (0). the school should not have access to add student.
const isAllowed = userData?.school_type !== 0;
const InternshipAdminRoutes = [
  // Add school routes here
  { path: 'dashboard', element: <InternshipAdminDashboard /> },

  { path: 'students', element: <InternshipAdminStudents /> },
  isAllowed && { path: 'students/create', element: <CreateStudent /> },

  { path: 'students/:studentId/edit', element: <EditStudent /> },
  {
    path: 'students/:studentId/show',
    element: <ShowStudent title="Student Details" />,
  },
  { path: 'results', element: <InternshipAdminResults /> },

  // { path: 'applications', element: <InternshipAdminApplication /> },
  // {
  //   path: 'applications/:applicationId/view',
  //   element: <InternshipAdminApplicationDetails />,
  // },

  // {
  //   path: 'applications/black-listed-applications',
  //   element: <InternshipAdminBlackListedApplication />,
  // },

  { path: 'settings', element: <InternshipAdminSettings title="Settings" /> },
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
    element: <InternshipAdminAssessmentResults title="Assessment Result" />,
  },
  // {
  //   path: 'internship',
  //   element: <InternshipAdmin title="Internship Admin" />,
  // },
  {
    path: 'internship/:internshipId/participants',
    element: (
      <InternshipAdminParticipants title="Internship Admin  Participants" />
    ),
  },
  {
    path: 'internship/:internshipId/participants/:studentId/progress',
    element: (
      <InternshipAdminParticipantProgress title="Internship Admin Student Progress" />
    ),
  },
  {
    path: 'internship/:internshipId/tasks',
    element: <InternshipAdminTask title="Internship Admin Task" />,
  },
  // {
  //   path: 'internship/:taskId',
  //   element: <AcademicInternshipTask title="AcademicInternship Tasks" />,
  // },
].filter(Boolean);

export default InternshipAdminRoutes;
