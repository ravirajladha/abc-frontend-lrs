import {
  ParentNotification,
  ParentApplication,
  ParentDashboard,
  ParentSettings,
  ParentStudent,
  ParentProfile,
  ParentPayment,
  ParentPaymentCreate,
  ParentStudentCreate,
} from '@/pages';

const ParentRoutes = [
  // Add parent routes here
  { path: 'profile', element: <ParentProfile /> },
  { path: 'dashboard', element: <ParentDashboard /> },
  { path: 'settings', element: <ParentSettings title="Settings" /> },
  { path: 'about', element: <ParentNotification title="About" /> },
  { path: 'admissions', element: <ParentApplication title="Applications" /> },
  {
    path: 'dashboard/student/:studentId',
    element: <ParentStudent title="Student Profile" />,
  },
  { path: 'payments', element: <ParentPayment /> },
  { path: 'payments/create', element: <ParentPaymentCreate /> },

  { path: 'settings/student/create', element: <ParentStudentCreate /> },
];

export default ParentRoutes;
