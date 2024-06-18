import {
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
  { path: 'classes', element: <TeacherClasses /> },
  { path: 'classes/:classId/results', element: <TeacherClassResults /> },
  { path: 'classes/:classId/subjects', element: <TeacherSubjects /> },
  {
    path: 'classes/:classId/subjects/:subjectId/results',
    element: <TeacherSubjectResults />,
  },
  { path: 'settings', element: <TeacherSettings title="Settings" /> },
  { path: 'classes/:classId/results/:studentId/assessment-result', element: <TeacherAssessmentResult title="Assessment Result" /> },

  {
    path: 'classes/:classId/subjects/:subjectId/chapters',
    element: <TeacherChapters title='Chapters' />,
  },
  {
    path: 'classes/:classId/subjects/:subjectId/chapters/:chapterId',
    element: <TeacherShowChapter title="Show Chapter Details" />,
  },
  {
    path: 'classes/:classId/subjects/:subjectId/chapters/:chapterId/content/:contentId',
    element: <TeacherVideoDetails title="Show Content" />,
  },
];

export default TeacherRoutes;
