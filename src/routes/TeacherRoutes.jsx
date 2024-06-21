import {
  AssessmentsShow,
  TeacherAssessmentResult,
  TeacherChapters,
  TeacherClassResults,
  TeacherClasses,
  TeacherDashboard,
  TeacherQna,
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
];

export default TeacherRoutes;
