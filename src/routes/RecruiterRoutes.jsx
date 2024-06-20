import {
  // RecruiterAssessmentResult,
  // RecruiterClassResults,
  // RecruiterClasses,
  RecruiterDashboard,
  // RecruiterQna,
  RecruiterSettings,
  // RecruiterSubjectResults,
  // RecruiterSubjects,
  JobTest,
  JobTestCreate,
  JobTestShow,
  JobTestEdit,
  JobTestQuestionBank,
  JobTestQuestionCreate,
  JobTestQuestionEdit,
  JobTestQuestionShow,

} from '@/pages/Recruiter';
import {
  Job,
  JobEdit,
  JobShow,
  JobCreate,
} from '@/pages/Admin';
const RecruiterRoutes = [
  // Add Recruiter routes here
  { path: 'dashboard', element: <RecruiterDashboard /> },
  // { path: 'qna', element: <RecruiterQna /> },
  // { path: 'classes', element: <RecruiterClasses /> },
  // { path: 'subjects/:classId/results', element: <RecruiterClassResults /> },
  // { path: 'subjects/:classId/courses', element: <RecruiterSubjects /> },
  // {
  //   path: 'subjects/:classId/courses/:subjectId/results',
  //   element: <RecruiterSubjectResults />,
  // },
  { path: 'settings', element: <RecruiterSettings title="Settings" /> },
  // { path: 'subjects/:classId/results/:studentId/assessment-result', element: <RecruiterAssessmentResult title="Assessment Result" /> },
  
  //Term Tests
  { path: 'tests', element: <JobTest title="All Job Tests" /> },
  {
    path: 'tests/create',
    element: <JobTestCreate title="Create New Job Tests" />,
  },
  {
    path: 'tests/:testId/edit',
    element: <JobTestEdit title="Edit Job Tests" />,
  },
  {
    path: 'tests/:testId',
    element: <JobTestShow title="Show Job Test Details" />,
  },
  // {
  //   path: 'tests/:testId/results',
  //   element: <JobTestResult title="Show Job Test Results" />,
  // },

  //Term Test Question
  {
    path: 'tests/question-bank',
    element: <JobTestQuestionBank title="Job Test Questions" />,
  },
  {
    path: 'tests/question-bank/create',
    element: <JobTestQuestionCreate title="Create Job Test Question" />,
  },
  {
    path: 'tests/question-bank/:questionId/edit',
    element: <JobTestQuestionEdit title="Edit Job Test Question" />,
  },
  {
    path: 'tests/question-bank/:questionId',
    element: <JobTestQuestionShow title="Show Job Test Question" />,
  },
  { path: 'jobs', element: <Job title="Jobs List" isAdmin={false} isRecruiter={true}/> },
  {
    path: 'jobs/create',
    element: <JobCreate title="Add New Job Description" isAdmin={false} isRecruiter={true} />,
  },
  {
    path: 'jobs/:jobId/edit',
    element: <JobEdit title="Edit Job Description" isAdmin={false} isRecruiter={true}/>,
  },
  {
    path: 'jobs/:jobId/applications',
    element: <JobShow title="Show Job Applications" isAdmin={false} isRecruiter={true}/>,
  },
];

export default RecruiterRoutes;
