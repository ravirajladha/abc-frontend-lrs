// import { lazy } from 'react';

// const Login = lazy(() => import('@/pages'));
// const SignUp = lazy(() => import('@/pages'));

import {
  Login,
  Register,
  EbookPreview,
  CaseStudyPreview,
  ProjectReportPreview,
  ForgotPassword,
} from '@/pages';

const GuestRoutes = [
  // Add guest routes here
  { path: '/login', element: <Login  title="" /> },
  { path: '/forgot-password', element: <ForgotPassword  title="" /> },
  { path: '/register', element: <Register title=""  /> },
  // { path: '/mobile/ebooks/:ebookId/preview/:moduleId?/:sectionId?', element: <EbookPreview title="Show eBook" isAdmin={false} isMobile={true} /> },

  // {
  //   path: '/mobile/project-reports/:projectReportId/preview',
  //   element: <ProjectReportPreview title="Show Project Report"  isAdmin={false} isMobile={true}/>,
  // },
  // { path: '/mobile/case-studies/:caseStudyId/preview', element: <CaseStudyPreview title="Show Case Study"  isAdmin={false} isMobile={true}/> },
];

export default GuestRoutes;
