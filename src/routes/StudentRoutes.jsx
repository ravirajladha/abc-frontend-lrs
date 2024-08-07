// import { CertificateViewer } from '@/components/common';
import {
  StudentReadableCourses,
  StudentAssessmentTest,
  StudentDashboard,
  // StudentElab,
  StudentForum,
  StudentForumShow,
  StudentInternship,
  StudentJobs,
  StudentLearn,
  StudentMiniProject,
  StudentProfile,
  StudentSettings,
  StudentSubjectResults,
  StudentSubjects,
  StudentTermTest,
  StudentTermTestDetails,
  InternshipParticipate,
  StudentZoomCall,
  PaymentStudent,
  CertificateViewer,
  StudentCoursePreview,
// Home
} from '@/pages';
import {
  InternshipParticipants,
} from '@/pages/Admin';
import Editor1 from '@/pages/e_lab/components/Editor1';

const StudentRoutes = [
  { path: 'dashboard', element: <StudentDashboard /> },

  { path: 'courses', element: <StudentSubjects /> },
  { path: 'courses/:subjectId/results', element: <StudentSubjectResults isAdmin={false} isStudent={true}/> },

  { path: 'courses/:subjectId/learn', element: <StudentLearn /> },
  { path: 'courses/:subjectId/course-preview', element: <StudentCoursePreview /> },
  {
    path: 'courses/:subjectId/learn/:videoId/assessment/:assessmentId',
    element: <StudentAssessmentTest />,
  },
  {
    path: 'courses/:subjectId/term-test/:testId/results',
    element: <StudentTermTestDetails />,
  },
  //test element
  {
    // path: 'courses/:subjectId/term-test/:testId',
    // element: <StudentTermTest />,
  },
  {
    path: 'courses/:subjectId/mini-project/:miniProjectId',
    element: <StudentMiniProject title="My Mini Projects" />,
  },
  { path: 'internship', element: <StudentInternship /> },

  { path: 'internship/participate/:internshipId', element: <InternshipParticipate  title="My Internship Tasks"/> },
  {
    path: 'internship/participate/:internshipId/participants',
    element: <InternshipParticipants title="Show Internship Participant" />,
  },

  // { path: 'courses/:subjectId/elab/:eLabId', element: <StudentElab /> },
  // { path: 'courses/:subjectId/ebook', element: <StudentElab /> },


// { path: 'elab/show/:type/:redirecting_id/:type_id/:labId', element: <Editor1 title="Elab" /> },

  { path: 'forum', element: <StudentForum /> },
  { path: 'forum/:forumId', element: <StudentForumShow /> },
  // { path: 'elab/show', element: <Home /> },
  { path: 'jobs', element: <StudentJobs /> },

  { path: 'profile', element: <StudentProfile  isAdmin="false" isStudent="true"/> },
  { path: 'settings', element: <StudentSettings title="Settings"/> },
  { path: 'settings', element: <StudentSettings title="Settings"/> },

  { path: 'readable-courses', element: <StudentReadableCourses title="Readable Courses"/> },

  { path: 'zoom-call', element: <StudentZoomCall title="Zoom Call"/> },
  { path: 'payment/:subjectId', element: <PaymentStudent title="Payment"/> },
  { path: 'certificate/uploads/pass/:imageUrl?', element: <CertificateViewer title="Certificate"/> },
];

export default StudentRoutes;
