import {
  AssessmentsShow,
  CreateZoomCall,
  EditZoomCall,
  TeacherAssessmentResult,
  TeacherChapters,
  TeacherClassResults,
  TeacherClasses,
  TeacherDashboard,
  TeacherFAQs,
  TeacherFAQsCreate,
  TeacherLiveQnaSessions,
  TeacherQna,
  TeacherReviews,
  TeacherSettings,
  TeacherShowChapter,
  TeacherSubjectResults,
  TeacherSubjects,
  TeacherVideoDetails,
} from '@/pages';

const TeacherRoutes = [
  // Add teacher routes here
  { path: 'dashboard', element: <TeacherDashboard /> },
  { path: 'qna', element: <TeacherQna /> },
  { path: 'subjects', element: <TeacherClasses /> },
  { path: 'subjects/:classId/results', element: <TeacherClassResults /> },
  { path: 'subjects/:classId/courses', element: <TeacherSubjects /> },
  {
    path: 'subjects/:classId/courses/:subjectId/results',
    element: <TeacherSubjectResults />,
  },
  {
    path: 'subjects/:classId/courses/:subjectId/reviews',
    element: <TeacherReviews />,
  },
  {
    path: 'subjects/:classId/courses/:subjectId/faqs',
    element: <TeacherFAQs />,
  },
  {
    path: 'subjects/:classId/courses/:subjectId/faqs/create',
    element: <TeacherFAQsCreate />,
  },
  { path: 'settings', element: <TeacherSettings title="Settings" /> },
  { path: 'subjects/:classId/results/:studentId/assessment-result', element: <TeacherAssessmentResult title="Assessment Result" /> },

  {
    path: 'subjects/:classId/courses/:subjectId/chapters',
    element: <TeacherChapters title='Chapters' />,
  },
  {
    path: 'subjects/:classId/courses/:subjectId/chapters/:chapterId',
    element: <TeacherShowChapter title="Show Chapter Details" />,
  },
  {
    path: 'subjects/:classId/courses/:subjectId/chapters/:chapterId/content/:contentId',
    element: <TeacherVideoDetails title="Show Content" />,
  },
  {
    path: 'assessments/:assessmentId',
    element: <AssessmentsShow title="Show Content" />,
  },
  {
    path: 'live-sessions',
    element: <TeacherLiveQnaSessions title="Live QnA Session" />,
  },
  {
    path: 'live-sessions/create',
    element: <CreateZoomCall title="Create QnA Session" />,
  },
  {
    path: 'live-sessions/:zoomCallId/edit',
    element: <EditZoomCall title="Create QnA Session" />,
  },
];

export default TeacherRoutes;
