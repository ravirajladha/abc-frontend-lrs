import {
  AssessmentsShow,
  CreateZoomCall,
  EditZoomCall,
  TrainerAssessmentResult,
  TrainerChapters,
  TrainerSubjectResults,
  TrainerSubjects,
  TrainerDashboard,
  TrainerFAQs,
  TrainerFAQsCreate,
  TrainerLiveQnaSessions,
  TrainerQna,
  TrainerReviews,
  TrainerSettings,
  TrainerShowChapter,
  TrainerCourseResults,
  TrainerCourses,
  TrainerVideoDetails,
  TrainerFAQsEdit,
  ZoomCall,
  SessionStudents,
  TrainerProfile,
  TrainerProfileEdit,
  ShowTrainer,
} from '@/pages';

const TrainerRoutes = [
  // Add trainer routes here
  { path: 'dashboard', element: <TrainerDashboard /> },
  { path: 'qna', element: <TrainerQna /> },
  { path: 'subjects', element: <TrainerSubjects /> },
  { path: 'subjects/:subjectId/results', element: <TrainerSubjectResults /> },
  { path: 'subjects/:subjectId/courses', element: <TrainerCourses /> },
  {
    path: 'subjects/:subjectId/courses/:courseId/results',
    element: <TrainerCourseResults />,
  },
  {
    path: 'subjects/:subjectId/courses/:courseId/reviews',
    element: <TrainerReviews />,
  },
  {
    path: 'subjects/:subjectId/courses/:courseId/faqs',
    element: <TrainerFAQs />,
  },
  {
    path: 'subjects/:subjectId/courses/:courseId/faqs/create',
    element: <TrainerFAQsCreate />,
  },
  {
    path: 'subjects/:subjectId/courses/:courseId/faqs/:faqId/edit',
    element: <TrainerFAQsEdit />,
  },
  { path: 'settings', element: <TrainerSettings title="Settings" /> },
  { path: 'subjects/:subjectId/results/:studentId/assessment-result', element: <TrainerAssessmentResult title="Assessment Result" /> },

  {
    path: 'subjects/:subjectId/courses/:courseId/chapters',
    element: <TrainerChapters title='Chapters' />,
  },
  {
    path: 'subjects/:subjectId/courses/:courseId/chapters/:chapterId',
    element: <TrainerShowChapter title="Show Chapter Details" />,
  },
  {
    path: 'subjects/:subjectId/courses/:courseId/chapters/:chapterId/content/:contentId',
    element: <TrainerVideoDetails title="Show Content" />,
  },
  {
    path: 'assessments/:assessmentId',
    element: <AssessmentsShow title="Show Content" />,
  },
  {
    path: 'live-sessions',
    element: <ZoomCall title="Live Session" />,
  },
  {
    path: 'live-sessions/create',
    element: <CreateZoomCall title="Create Session" />,
  },
  {
    path: 'live-sessions/:zoomCallId/edit',
    element: <EditZoomCall title="Create Session" />,
  },
  {
    path: 'live-sessions/:zoomCallId/students',
    element: <SessionStudents title="Session Attendies" />,
  },
  {
    path: 'profile',
    element: <TrainerProfile title="Profile" />,
  },
  {
    path: 'profile/:trainerId/edit',
    element: <TrainerProfileEdit title="Profile" />,
  },
];

export default TrainerRoutes;
