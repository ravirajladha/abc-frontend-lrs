// import { lazy } from 'react';

// const AdminDashboard = lazy(() => import('@/pages'));

import { AdminDashboard, EditStudent } from '@/pages';
import {
  Settings,
  Payment,
  CreateClass,
  EditClass,
  Classes,
  EditChapter,
  ShowChapter,
  Chapter,
  CreateChapter,
  Subject,
  SubjectEdit,
  SubjectCreate,
  School,
  ShowSchoolDetail,
  EditSchool,
  CreateSchool,
  // AcademicAdmin,
  // // ShowAcademicAdminDetail,
  // EditAcademicAdmin,
  // CreateAcademicAdmin,
  // AcademicAdminShowApplication,
  // AcademicAdminShowTeacher,
  // AcademicAdminShowStudent,
  Quote,
  CreateQuote,
  EditQuote,
  // ShowSchool,
  // EditSchool,
  // CreateSchool,
  EbookEdit,
  EbookIndex,
  EbookCreate,
  EbookModuleCreate,
  EbookModuleEdit,
  EbookSectionCreate,
  EbookSectionEdit,
  Elab,
  Participants,
  ElabShow,
  ElabEdit,
  ElabCreate,
  ProjectReport,
  ProjectReportShow,
  ProjectReportEdit,
  ProjectReportCreate,
  MiniProject,
  MiniProjectCreate,
  MiniProjectTaskCreate,
  MiniProjectTaskEdit,
  MiniProjectTasks,
  MiniProjectEdit,
  MiniProjectShow,
  MiniProjectParticipants,
  InternshipParticipants,
  Internship,
  InternshipCreate,
  InternshipTaskCreate,
  InternshipTasks,
  InternshipEdit,
  InternshipShow,
  InternshipTaskEdit,
  CaseStudy,
  CaseStudyCreate,
  CaseStudyShow,
  CaseStudyEdit,
  PaymentCreate,
  PaymentEdit,
  VideoCreate,
  VideoDetails,
  VideoEdit,
  Assessments,
  AssessmentsCreate,
  AssessmentsEdit,
  AssessmentsShow,
  AssessmentQuestionBank,
  AssessmentQuestionCreate,
  AssessmentQuestionShow,
  AssessmentQuestionEdit,
  TermTest,
  TermTestCreate,
  TermTestShow,
  TermTestEdit,
  TermTestQuestionBank,
  TermTestQuestionCreate,
  TermTestQuestionEdit,
  TermTestQuestionShow,
  EbookModuleShow,
  EbookSectionShow,
  EbookElementCreate,
  EbookElementEdit,
  AssessmentsResult,
  TermTestResult,
  SubjectResult,
  ClassResult,
  ProjectReportModuleShow,
  ProjectReportModuleCreate,
  ProjectReportSectionShow,
  ProjectReportSectionCreate,
  ProjectReportElementCreate,
  ProjectReportElementEdit,
  SchoolShowApplication,
  SchoolShowTeacher,
  SchoolShowStudent,
  AssignTeacher,
  CreateTeacher,
  EditTeacher,
  SchoolTeachers,
  ShowTeacher,

  Job,
  JobEdit,
  JobShow,
  JobCreate,
  JobResult,
  JobDetail,
  JobBulletin,
  Company,
  CompanyEdit,
  CompanyShow,
  CompanyCreate,
  CompanyResult,
  Recruiter,
  // AssignRecruiter,
  CreateRecruiter,
  EditRecruiter,
  ShowRecruiter,
  CaseStudyModuleShow,
  CaseStudyModuleCreate,
  CaseStudySectionCreate,
  CaseStudySectionShow,
  CaseStudyElementCreate,
  CaseStudyElementEdit,
  ProjectReportModuleEdit,
  CaseStudyModuleEdit,
  CaseStudySectionEdit,
  ProjectReportSectionEdit,
  EbookShow,
  ReadableCourses,
  ReadableCourseCreate,
  Fees,
  FeesEdit,
  // FeesCreate,
  ZoomCall,
  CreateZoomCall,
  EditZoomCall,
  Students,
  StudentsShow,
  DinacharyaLogs,
  ForumQuestions,
  ForumQuestionAnswers,
  StudentsCreate,
} from '@/pages/Admin';
import{


StudentSubjectResults,

// Home
} from '@/pages';

import {
  JobTest,
  JobTestCreate,
  JobTestShow,
  JobTestEdit,
  // JobTestResult,
  JobTestQuestionBank,
  JobTestQuestionCreate,
  JobTestQuestionEdit,
  JobTestQuestionShow,
} from '@/pages/Recruiter';

import { StudentProfile } from '@/pages';
const AdminRoutes = [
  // Add admin routes here
  { path: 'dashboard', element: <AdminDashboard title="Dashboard" /> },

  // Classes Routes
  { path: 'subjects', element: <Classes title="Subjects" /> },
  { path: 'subjects/create', element: <CreateClass title="Create Subject" /> },
  {
    path: 'subjects/:classId/edit',
    element: <EditClass title="Edit Subject" />,
  },
  {
    path: 'subjects/:classId/results',
    element: <ClassResult title="Show Subject Results" />,
  },
  // Subjects Routes
  {
    path: 'subjects/:classId/courses',
    element: <Subject title="Courses" />,
  },
  {
    path: 'subjects/:classId/courses/create',
    element: <SubjectCreate title="Courses" />,
  },
  {
    path: 'subjects/:classId/courses/:subjectId/edit',
    element: <SubjectEdit title="Courses" />,
  },
  {
    path: 'subjects/:classId/courses/:subjectId/results',
    element: <SubjectResult title="Show Course Results" />,
  },

  // Chapters Routes
  {
    path: 'subjects/:classId/courses/:subjectId/chapters',
    element: <Chapter title="Chapters" />,
  },
  {
    path: 'subjects/:classId/courses/:subjectId/chapters/create',
    element: <CreateChapter title="Add New Chapter" />,
  },
  {
    path: 'subjects/:classId/courses/:subjectId/chapters/:chapterId/edit',
    element: <EditChapter title="Edit Chapter Details" />,
  },
  {
    path: 'subjects/:classId/courses/:subjectId/chapters/:chapterId',
    element: <ShowChapter title="Show Chapter Details" />,
  },

  //Contents
  {
    path: 'subjects/:classId/courses/:subjectId/chapters/:chapterId/create',
    element: <VideoCreate title="Create New Content" />,
  },
  {
    path: 'subjects/:classId/courses/:subjectId/chapters/:chapterId/content/:contentId',
    element: <VideoDetails title="Show Content" />,
  },
  {
    path: 'subjects/:classId/courses/:subjectId/chapters/:chapterId/content/:contentId/edit',
    element: <VideoEdit title="Edit Content" />,
  },

  //School Routes
  {
    path: 'quotes',
    element: <Quote title="All" subtitle="Quotes" />,
  },
  {
    path: 'quotes/create',
    element: <CreateQuote title="Add Quote" subtitle="Quotes" />,
  },
  {
    path: 'quotes/:quoteId/edit',
    element: <EditQuote title="Edit" subtitle="Quotes" />,
  },
  {
    path: 'academic-admin',
    element: <School title="All" subtitle="Academic Admins" />,
  },
  { path: 'academic-admin/create', element: <CreateSchool title="Add  Corporate/Academic Admin" /> },
  {
    path: 'academic-admin/:schoolId/applications',
    element: <SchoolShowApplication title="Academic Admin Applications" />,
  },
  {
    path: 'academic-admin/:schoolId/trainers',
    element: <SchoolShowTeacher title="Academic Admin Teachers" />,
  },
  {
    path: 'academic-admin/:schoolId/students',
    element: <SchoolShowStudent title="Academic Admin Students" />,
  },
  {
    path: 'academic-admin/:schoolId/students/:studentId',
    element: (
      <StudentProfile
        title="Student Profile Students"
        isAdmin="true"
        isStudent="false"
      />
    ),
  },
  {
    path: 'academic-admin/:schoolId',
    element: <ShowSchoolDetail title="Internship Admin  Details" />,
  },
  {
    path: 'academic-admin/:schoolId/school',
    element: <ShowSchoolDetail title="Internship Admin  Details" />,
  },
  {
    path: 'academic-admin/:schoolId/edit',
    element: <EditSchool title="Edit Academic Admin" />,
  },



  // // {
  // //   path: 'academic-admin/:schoolId/students/:studentId',
  // //   element: (
  // //     <StudentProfile
  // //       title="Student Profile Students"
  // //       isAdmin="true"
  // //       isStudent="false"
  // //     />
  // //   ),
  // // },


  //trainers

  { path: 'trainers', element: <SchoolTeachers /> },
  { path: 'trainers/create', element: <CreateTeacher /> },
  {
    path: 'trainers/:teacherId/show',
    element: <ShowTeacher title="Teacher Details" />,
  },
  { path: 'trainers/:teacherId/edit', element: <EditTeacher /> },
  { path: 'trainers/:teacherId/assign', element: <AssignTeacher /> },
  //Assessments
  { path: 'assessments', element: <Assessments title="Assessments List" /> },
  {
    path: 'assessments/create',
    element: <AssessmentsCreate title="Create Assessment" />,
  },
  {
    path: 'assessments/:assessmentId/edit',
    element: <AssessmentsEdit title="Edit Assessment" />,
  },
  {
    path: 'assessments/:assessmentId',
    element: <AssessmentsShow title="Show Assessment" />,
  },
  {
    path: 'assessments/:assessmentId/results',
    element: <AssessmentsResult title="Result Assessment" />,
  },

  //Assessment Question Bank
  {
    path: 'assessments/question-bank',
    element: <AssessmentQuestionBank title="Assessment Questions" />,
  },
  {
    path: 'assessments/question-bank/create',
    element: <AssessmentQuestionCreate title="Create Assessment Question" />,
  },
  {
    path: 'assessments/question-bank/:questionId/edit',
    element: <AssessmentQuestionEdit title="Edit Assessment Question" />,
  },
  {
    path: 'assessments/question-bank/:questionId',
    element: <AssessmentQuestionShow title="Show Assessment Question" />,
  },

  //Term Tests
  { path: 'tests', element: <TermTest title="All Term Tests" /> },
  {
    path: 'tests/create',
    element: <TermTestCreate title="Create New Term Tests" />,
  },
  {
    path: 'tests/:testId/edit',
    element: <TermTestEdit title="Edit Term Tests" />,
  },
  {
    path: 'tests/:testId',
    element: <TermTestShow title="Show Term Test Details" />,
  },
  {
    path: 'tests/:testId/results',
    element: <TermTestResult title="Show Term Test Results" />,
  },
  { path: 'tests/:testId/results/:subjectId/:studentId', element: <StudentSubjectResults isAdmin={true} isStudent={false}/>  },
  //Term Test Question
  {
    path: 'tests/question-bank',
    element: <TermTestQuestionBank title="Term Test Questions" />,
  },
  {
    path: 'tests/question-bank/create',
    element: <TermTestQuestionCreate title="Create Term Test Question" />,
  },
  {
    path: 'tests/question-bank/:questionId/edit',
    element: <TermTestQuestionEdit title="Edit Term Test Question" />,
  },
  {
    path: 'tests/question-bank/:questionId',
    element: <TermTestQuestionShow title="Show Term Test Question" />,
  },

  //Mini Projects
  { path: 'mini-projects', element: <MiniProject title="All Mini Projects" /> },
  {
    path: 'mini-projects/create',
    element: <MiniProjectCreate title="Create Mini Project" />,
  },
  {
    path: 'mini-projects/:miniProjectId/edit',
    element: <MiniProjectEdit title="Edit Mini Project" />,
  },
  {
    path: 'mini-project/:miniProjectId/participants',
    element: <MiniProjectParticipants title="Show Mini Project Participant" />,
  },
  {
    path: 'mini-projects/:miniProjectId',
    element: <MiniProjectShow title="Show Mini Project" />,
  },

  //mini project tasks
  {
    path: 'mini-project-tasks/:projectId',
    element: <MiniProjectTasks title="Mini Project Tasks" />,
  },

  {
    path: 'mini-project-tasks/:projectId/create',
    element: <MiniProjectTaskCreate title="Create Mini Project Task" />,
  },
  {
    path: 'mini-project-tasks/:miniProjectId/edit/:miniProjectTaskId',
    element: <MiniProjectTaskEdit title="Edit Mini Project Task" />,
  },
  // internship
  //Internships Routes
  { path: 'internships', element: <Internship title="Internship List" /> },
  // {
  //   path: 'internship/create',
  //   element: <InternshipCreate title="Create Internships" />,
  // },
  // {
  //   path: 'internship/:internshipId',
  //   element: <InternshipShow title="Internship Details" />,
  // },
  // {
  //   path: 'internship/:internshipId/edit',
  //   element: <InternshipEdit title="Edit Internships" />,
  // },
  {
    path: 'internship/:internshipId/participants',
    element: <InternshipParticipants title="Show Internship Participant" />,
  },
  {
    path: 'internships/create',
    element: <InternshipCreate title="Create Internship" />,
  },
  {
    path: 'internship/:internshipId/edit',
    element: <InternshipEdit title="Edit Internship" />,
  },
  {
    path: 'internships/:internshipId',
    element: <InternshipShow title="Show Internship" />,
  },

  //internship tasks
  {
    path: 'internship-tasks/:internshipId',
    element: <InternshipTasks title="Internship Tasks" />,
  },

  {
    path: 'internship-tasks/:internshipId/create',
    element: <InternshipTaskCreate title="Create Internship Task" />,
  },

  {
    path: 'internship-tasks/:internshipId/edit/:internshipTaskId',
    element: <InternshipTaskEdit title="Edit Internship Task" />,
  },
  //Ebook Routes
  { path: 'ebooks', element: <EbookIndex title="All eBooks" /> },
  { path: 'ebooks/create', element: <EbookCreate title="Create eBook" /> },
  { path: 'ebooks/:ebookId/edit', element: <EbookEdit title="Edit eBook" /> },
  {
    path: 'ebooks/:ebookId/preview',
    element: <EbookShow title="Show eBook" />,
  },
  {
    path: 'ebooks/:ebookId/modules',
    element: <EbookModuleShow title="eBook" subtitle="Modules" />,
  },
  {
    path: 'ebooks/:ebookId/modules/create',
    element: <EbookModuleCreate title="Create eBook Module" />,
  },
  {
    path: 'ebooks/:ebookId/modules/:ebookModuleId/edit',
    element: <EbookModuleEdit title="Edit eBook Module" />,
  },
  {
    path: 'ebooks/:ebookId/modules/:ebookModuleId/sections/create',
    element: <EbookSectionCreate title="Create eBook Section" />,
  },
  {
    path: 'ebooks/:ebookId/modules/:ebookModuleId/sections',
    element: <EbookSectionShow title="eBook" subtitle="Sections" />,
  },
  {
    path: 'ebooks/:ebookId/modules/:ebookModuleId/sections/:ebookSectionId/edit',
    element: <EbookSectionEdit title="Edit eBook Section" />,
  },
  {
    path: 'ebooks/:ebookId/modules/:ebookModuleId/sections/:ebookSectionId/elements/create',
    element: <EbookElementCreate title="Create" subtitle="Elements" />,
  },
  {
    path: 'ebooks/:ebookId/modules/:ebookModuleId/sections/:ebookSectionId/elements/:ebookElementId/edit',
    element: <EbookElementEdit title="Edit" subtitle="Elements" />,
  },

  //Elab Routes
  { path: 'elabs', element: <Elab title="All eLabs" /> },
  {
    path: 'elabs/:elabId/participants',
    element: <Participants title="Participants" />,
  },
  { path: 'elabs/create', element: <ElabCreate title="Create eLab" /> },
  { path: 'elabs/:elabId/edit', element: <ElabEdit title="Edit eLab" /> },
  { path: 'elabs/:elabId', element: <ElabShow title="Show eLab" /> },

  //Project Report Routes
  {
    path: 'project-reports',
    element: <ProjectReport title="Project Report List" />,
  },
  {
    path: 'project-reports/:projectReportId',
    element: <ProjectReportShow title="Project Report" />,
  },
  {
    path: 'project-reports/:projectReportId/edit',
    element: <ProjectReportEdit title="Edit Project Reports" />,
  },
  {
    path: 'project-reports/create',
    element: <ProjectReportCreate title="Create Project Reports" />,
  },

  {
    path: 'project-reports/:projectReportId/modules',
    element: (
      <ProjectReportModuleShow title="Project Report" subtitle="Modules" />
    ),
  },
  {
    path: 'project-reports/:projectReportId/modules/create',
    element: <ProjectReportModuleCreate title="Create Project Report Module" />,
  },
  {
    path: 'project-reports/:projectReportId/modules/:projectReportModuleId/edit',
    element: <ProjectReportModuleEdit title="Edit Project Report Module" />,
  },
  {
    path: 'project-reports/:projectReportId/modules/:projectReportModuleId/sections',
    element: (
      <ProjectReportSectionShow title="Project Report" subtitle="Sections" />
    ),
  },
  {
    path: 'project-reports/:projectReportId/modules/:projectReportModuleId/sections/create',
    element: (
      <ProjectReportSectionCreate title="Create Project Report Section" />
    ),
  },
  {
    path: 'project-reports/:projectReportId/modules/:projectReportModuleId/sections/:projectReportSectionId/edit',
    element: <ProjectReportSectionEdit title="Edit Project Report Section" />,
  },
  {
    path: 'project-reports/:projectReportId/modules/:projectReportModuleId/sections/:projectReportSectionId/elements/create',
    element: <ProjectReportElementCreate title="Create" subtitle="Elements" />,
  },
  {
    path: 'project-reports/:projectReportId/modules/:projectReportModuleId/sections/:projectReportSectionId/elements/:projectReportElementId/edit',
    element: <ProjectReportElementEdit title="Edit" subtitle="Elements" />,
  },

  //Case Studies Routes
  { path: 'case-studies', element: <CaseStudy title="Case Studies" /> },
  {
    path: 'case-studies/create',
    element: <CaseStudyCreate title="Create Case Studies" />,
  },
  {
    path: 'case-studies/:caseStudyId',
    element: <CaseStudyShow title="Case Study Details" />,
  },
  {
    path: 'case-studies/:caseStudyId/edit',
    element: <CaseStudyEdit title="Edit Case Studies" />,
  },

  {
    path: 'case-studies/:caseStudyId/modules',
    element: <CaseStudyModuleShow title="Case Study" subtitle="Modules" />,
  },
  {
    path: 'case-studies/:caseStudyId/modules/create',
    element: <CaseStudyModuleCreate title="Case Study Report Module" />,
  },
  {
    path: 'case-studies/:caseStudyId/modules/:caseStudyModuleId/edit',
    element: <CaseStudyModuleEdit title="Edit Case Study Module" />,
  },
  {
    path: 'case-studies/:caseStudyId/modules/:caseStudyModuleId/sections',
    element: <CaseStudySectionShow title="Case Study" subtitle="Sections" />,
  },
  {
    path: 'case-studies/:caseStudyId/modules/:caseStudyModuleId/sections/create',
    element: <CaseStudySectionCreate title="Create Case Study Section" />,
  },
  {
    path: 'case-studies/:caseStudyId/modules/:caseStudyModuleId/sections/:caseStudySectionId/edit',
    element: <CaseStudySectionEdit title="Edit Case Study Section" />,
  },
  {
    path: 'case-studies/:caseStudyId/modules/:caseStudyModuleId/sections/:caseStudySectionId/elements/create',
    element: <CaseStudyElementCreate title="Create" subtitle="Elements" />,
  },
  {
    path: 'case-studies/:caseStudyId/modules/:caseStudyModuleId/sections/:caseStudySectionId/elements/:caseStudyElementId/edit',
    element: <CaseStudyElementEdit title="Edit" subtitle="Elements" />,
  },

  // Readable courses
  {
    path: 'readable-courses',
    element: <ReadableCourses title="Readable Courses List" />,
  },
  {
    path: 'readable-courses/create',
    element: <ReadableCourseCreate title="Create Readable Course" />,
  },

  //Payments Routes
  { path: 'payments', element: <Payment title="Payments List" /> },
  {
    path: 'payments/create',
    element: <PaymentCreate title="Add New Payment" />,
  },
  {
    path: 'payments/:paymentId/edit',
    element: <PaymentEdit title="Edit Payment Details" />,
  },
  {
    path: 'jobs/tests',
    element: (
      <JobTest title="All Job Tests" isAdmin={true} isRecruiter={false} />
    ),
  },
  {
    path: 'jobs/tests/create',
    element: (
      <JobTestCreate
        title="Create New Job Tests"
        isAdmin={true}
        isRecruiter={false}
      />
    ),
  },
  {
    path: 'jobs/tests/:testId/edit',
    element: (
      <JobTestEdit title="Edit Job Tests" isAdmin={true} isRecruiter={false} />
    ),
  },
  {
    path: 'jobs/tests/:testId',
    element: (
      <JobTestShow
        title="Show Job Test Details"
        isAdmin={true}
        isRecruiter={false}
      />
    ),
  },
  // {
  //   path: 'jobs/tests/:testId/results',
  //   element: <JobTestResult title="Show Job Test Results" isAdmin={true} isRecruiter={false}/>,
  // },
  {
    path: 'jobs/tests/question-bank',
    element: (
      <JobTestQuestionBank
        title="Job Test Questions"
        isAdmin={true}
        isRecruiter={false}
      />
    ),
  },
  {
    path: 'jobs/tests/question-bank/create',
    element: (
      <JobTestQuestionCreate
        title="Create Job Test Question"
        isAdmin={true}
        isRecruiter={false}
      />
    ),
  },
  {
    path: 'jobs/tests/question-bank/:questionId/edit',
    element: (
      <JobTestQuestionEdit
        title="Edit Job Test Question"
        isAdmin={true}
        isRecruiter={false}
      />
    ),
  },
  {
    path: 'jobs/tests/question-bank/:questionId',
    element: (
      <JobTestQuestionShow
        title="Show Job Test Question"
        isAdmin={true}
        isRecruiter={false}
      />
    ),
  },
  //Payments Routes
  {
    path: 'jobs',
    element: <Job title="Jobs List" isAdmin={true} isRecruiter={false} />,
  },
  {
    path: 'jobs/create',
    element: (
      <JobCreate
        title="Add New Job Description"
        isAdmin={true}
        isRecruiter={false}
      />
    ),
  },
  {
    path: 'jobs/:jobId/edit',
    element: (
      <JobEdit
        title="Edit Job Description"
        isAdmin={true}
        isRecruiter={false}
      />
    ),
  },
  {
    path: 'jobs/:jobId/applications',
    element: (
      <JobShow
        title="Show Job Applications"
        isAdmin={true}
        isRecruiter={false}
      />
    ),
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
    path: 'jobs/bulletin',
    element: (
      <JobBulletin
        title="Show Job Student Result"
        isAdmin={true}
        isRecruiter={false}
      />
    ),
  },
  {
    path: 'companies',
    element: <Company title="Companies List" isAdmin={true} isRecruiter={false}  isStudent={false}/>,
  },
  {
    path: 'companies/create',
    element: (
      <CompanyCreate
        title="Add New Company Description"
        isAdmin={true}
        isRecruiter={false}
      />
    ),
  },
  {
    path: 'companies/:companyId/edit',
    element: (
      <CompanyEdit
        title="Edit Company Description"
        isAdmin={true}
        isRecruiter={false}
      />
    ),
  },
  {
    path: 'companies/:companyId/applications',
    element: (
      <CompanyShow
        title="Show Company Applications"
        isAdmin={true}
        isRecruiter={false}
      />
    ),
  },
  {
    path: 'companies/:companyId/applications/:applicationsId/result',
    element: (
      <CompanyResult
        title="Show Company Student Result"
        isAdmin={true}
        isRecruiter={false}
      />
    ),
  },

  { path: 'recruiters', element: <Recruiter title="Recruiters List" /> },
  {
    path: 'recruiters/create',
    element: <CreateRecruiter title="Add New Recruiter" />,
  },
  {
    path: 'recruiters/:recruiterId/edit',
    element: <EditRecruiter title="Edit Recruiter Description" />,
  },
  {
    path: 'recruiters/:recruiterId/show',
    element: <ShowRecruiter title="Show Recruiter" />,
  },
  //Admin Settings Routes
  { path: 'settings', element: <Settings title="Settings" /> },

  // fees routes
  { path: 'fees', element: <Fees title="Fees" /> },
  // { path: 'fees/create', element: <FeesCreate title="Create Fees" /> },
  { path: 'fees/edit', element: <FeesEdit title="Update Fees" /> },
  {
    path: 'public-students',
    element: (
      <Students title="All School Students" isPrivate={false} isPublic={true} />
    ),
  },
  {
    path: 'public-students/:studentId/show',
    element: (
      <StudentsShow title="All Images" isPrivate={false} isPublic={true} />
    ),
  },
  { path: 'public-students/create', element: <StudentsCreate /> },
  
  {
    path: 'private-students',
    element: (
      <Students
        title="All Private Students"
        isPrivate={true}
        isPublic={false}
      />
    ),
  },
  {
    path: 'private-students/:studentId/show',
    element: (
      <StudentsShow title="All Images" isPrivate={true} isPublic={false} />
    ),
  },

  // Live Qns session

  { path: 'live-sessions', element: <ZoomCall title="Live QnA Session" /> },
  {
    path: 'live-sessions/create',
    element: <CreateZoomCall title="Create QnA Session" />,
  },
  {
    path: 'live-sessions/:zoomCallId/edit',
    element: <EditZoomCall title="Create QnA Session" />,
  },

  {
    path: 'dinacharya-logs',
    element: <DinacharyaLogs title="All Dinacharya Logs" />,
  },

  {
    path: 'tests/:testId/results/:studentId/show-profile',
    element: (
      <StudentProfile
        title="Student Profile Students"
        isAdmin="true"
        isStudent="false"
      />
    ),
  },

  {
    path: 'public-students/:studentId/show-profile',
    element: (
      <StudentProfile
        title="Student Profile Students"
        isAdmin="true"
        isStudent="false"
      />
    ),
  },
  {
    path: 'public-students/:studentId/edit-profile',
    element: (
      <EditStudent
        title="Student Profile Students"
      />
    ),
  },

  {
    path: 'forums',
    element: <ForumQuestions title="Forum Questions" />,
  },
  {
    path: 'forums/:forumId/answers',
    element: <ForumQuestionAnswers title="Forum Answers" />,
  },
];

export default AdminRoutes;
