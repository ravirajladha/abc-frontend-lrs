import { MdDashboard } from "react-icons/md";
import { GrResources } from "react-icons/gr";
import { FaLaptopCode } from "react-icons/fa";
import { FaHandshakeSimple, FaBookOpenReader } from "react-icons/fa6";
import { HiCurrencyRupee } from "react-icons/hi";

const ADMIN_ROUTES = {
  dashboard: {
    title: 'Dashboard',
    icon: MdDashboard,
    routes: [
      { path: '/admin/dashboard', title: 'Home', icon: 'feather-home' },
    { path: '/admin/public-students', title: 'Students', icon: 'feather-user' },
    ],
  },
  studySupport: {
    title: 'Study & Support',
    icon: FaBookOpenReader,
    routes: [
      { path: '/admin/subjects', title: 'Courses', icon: 'feather-book-open' },
      { path: '/admin/tests', title: 'Tests', icon: 'feather-target' },
      { path: '/admin/assessments', title: 'Assessments', icon: 'feather-activity' },
      { path: '/admin/trainers', title: 'Trainers', icon: 'feather-user-check' },
    ],
  },
  resources: {
    title: 'Resources',
    icon: GrResources,
    routes: [
      { path: '/admin/forums', title: 'Forums', icon: 'feather-airplay' },
      { path: '/admin/ebooks', title: 'eBook', icon: 'feather-book' },
      { path: '/admin/case-studies', title: 'Case Study', icon: 'feather-codepen' },
      { path: '/admin/project-reports', title: 'Project Report', icon: 'feather-file' },
      { path: '/admin/readable-courses', title: 'Readable Courses', icon: 'feather-command' },
    ],
  },
  practicals: {
    title: 'Practicals',
    icon: FaLaptopCode,
    routes: [
      { path: '/admin/elabs', title: 'eLab', icon: 'feather-code' },
      { path: '/admin/internships', title: 'Internship', icon: 'feather-file-plus' },
      { path: '/admin/mini-projects', title: 'Mini Projects', icon: 'feather-shopping-bag' },
    ],
  },
  recruitments: {
    title: 'Recruitments',
    icon: FaHandshakeSimple,
    routes: [
      { path: '/admin/recruiters', title: 'Recruiters', icon: 'feather-user-plus' },
      { path: '/admin/jobs', title: 'Jobs', icon: 'feather-briefcase' },
    ],
  },
  financials: {
    title: 'Financials',
    icon: HiCurrencyRupee,
    routes: [
      { path: '/admin/fees', title: 'Fees', icon: 'feather-dollar-sign' },
    { path: '/admin/payments', title: 'Payments', icon: 'feather-credit-card' },
    ],
  },
};

export default ADMIN_ROUTES;
