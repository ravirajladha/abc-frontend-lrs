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
  // JobDetail,

} from '@/pages/Recruiter';
import {
  Job,
  JobEdit,
  JobShow,
  JobCreate,
  JobResult,
  Company,
  JobDetail,
  JobBulletin,

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
  {
    path: 'jobs/bulletin',
    element: (
      <JobBulletin
        title="Show Job Student Result"
        isAdmin={true}
        isRecruiter={false}
      />
    ),
  },
  //Term Tests
  { path: 'jobs/tests', element: <JobTest title="All Job Tests"  isAdmin={false}
    isRecruiter={true}/> },
    {
      path: 'jobs/jobDetail',
      element: (
        <JobDetail
          title="Show Job Detail"
          isAdmin={true}
          isRecruiter={false}
        />
      ),
    },
  {
    path: 'jobs/tests/create',
    element: <JobTestCreate title="Create New Job Tests" isAdmin={false}
    isRecruiter={true} />,
  },
  {
    path: 'companies',
    element: <Company title="Companies List" isAdmin={false} isRecruiter={true}  isStudent={false}/>,
  },
  {
    path: 'jobs/tests/:testId/edit',
    element: <JobTestEdit title="Edit Job Tests" isAdmin={false}
    isRecruiter={true} />,
  },
  {
    path: 'jobs/tests/:testId',
    element: <JobTestShow title="Show Job Test Details" isAdmin={false}
    isRecruiter={true} />,
  },
  // {
  //   path: 'tests/:testId/results',
  //   element: <JobTestResult title="Show Job Test Results" />,
  // },

  //Term Test Question
  {
    path: 'jobs/tests/question-bank',
    element: <JobTestQuestionBank title="Job Test Questions"  isAdmin={false}
    isRecruiter={true} />,
  },
  {
    path: 'jobs/tests/question-bank/create',
    element: <JobTestQuestionCreate title="Create Job Test Question"  isAdmin={false}
    isRecruiter={true} />,
  },
  {
    path: 'jobs/tests/question-bank/:questionId/edit',
    element: <JobTestQuestionEdit title="Edit Job Test Question" isAdmin={false}
    isRecruiter={true}  />,
  },
  {
    path: 'jobs/tests/question-bank/:questionId',
    element: <JobTestQuestionShow title="Show Job Test Question" isAdmin={false}
    isRecruiter={true} />,
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
  {
    path: 'jobs/:jobId/applications/:applicationsId/result',
    element: (
      <JobResult
        title="Show Job Student Result"
        isAdmin={true}
        isRecruiter={false}
      />
    ),
  },
];

export default RecruiterRoutes;
