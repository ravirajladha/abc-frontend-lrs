// import { lazy } from 'react';

// const AdminDashboard = lazy(() => import('@/pages'));

import { AdminDashboard, TrainerFAQs, TrainerFAQsCreate, TrainerFAQsEdit, TrainerProfileEdit, TrainerReviews } from '@/pages';
import {
  Settings,
  Payment,
  CreateSubject,
  EditSubject,
  Subjects,
  EditChapter,
  ShowChapter,
  Chapter,
  CreateChapter,
  Course,
  CourseEdit,
  CourseCreate,
  InternshipAdmin,
  ShowInternshipAdminDetail,
  EditInternshipAdmin,
  CreateInternshipAdmin,
  // AcademicAdmin,
  // // ShowAcademicAdminDetail,
  // EditAcademicAdmin,
  // CreateAcademicAdmin,
  // AcademicAdminShowApplication,
  // AcademicAdminShowTrainer,
  // AcademicAdminShowStudent,
  Quote,
  CreateQuote,
  EditQuote,
  // ShowInternshipAdmin,
  // EditInternshipAdmin,
  // CreateInternshipAdmin,
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
  Test,
  TestCreate,
  TestShow,
  TestEdit,
  TestQuestionBank,
  TestQuestionCreate,
  TestQuestionEdit,
  TestQuestionShow,
  EbookModuleShow,
  EbookSectionShow,
  EbookElementCreate,
  EbookElementEdit,
  AssessmentsResult,
TestResult,
  CourseResult,
 SubjectResult,
  ProjectReportModuleShow,
  ProjectReportModuleCreate,
  ProjectReportSectionShow,
  ProjectReportSectionCreate,
  ProjectReportElementCreate,
  ProjectReportElementEdit,
  InternshipAdminShowApplication,
  InternshipAdminShowTrainer,
  InternshipAdminShowStudent,
  AssignTrainer,
  CreateTrainer,
  EditTrainer,
  InternshipAdminTrainers,
  ShowTrainer,

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
  StudentEdit,
  Colleges,
  EditCollege,
  CreateCollege,
  SessionStudents,
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
  { path: 'subjects', element: <Subjects title="Subjects" /> },
  { path: 'subjects/create', element: <CreateSubject title="Create Subject" /> },
  {
    path: 'subjects/:subjectId/edit',
    element: <EditSubject title="Edit Subject" />,
  },
  {
    path: 'subjects/:subjectId/results',
    element: <SubjectResult title="Show Subject Results" />,
  },
  // Subjects Routes
  {
    path: 'subjects/:subjectId/courses',
    element: <Course title="Courses" />,
  },
  {
    path: 'subjects/:subjectId/courses/create',
    element: <CourseCreate title="Courses" />,
  },
  {
    path: 'subjects/:subjectId/courses/:courseId/edit',
    element: <CourseEdit title="Courses" />,
  },
  {
    path: 'subjects/:subjectId/courses/:courseId/results',
    element: <CourseResult title="Show Course Results" />,
  },

  // Chapters Routes
  {
    path: 'subjects/:subjectId/courses/:courseId/chapters',
    element: <Chapter title="Chapters" />,
  },
  {
    path: 'subjects/:subjectId/courses/:courseId/chapters/create',
    element: <CreateChapter title="Add New Chapter" />,
  },
  {
    path: 'subjects/:subjectId/courses/:courseId/chapters/:chapterId/edit',
    element: <EditChapter title="Edit Chapter Details" />,
  },
  {
    path: 'subjects/:subjectId/courses/:courseId/chapters/:chapterId',
    element: <ShowChapter title="Show Chapter Details" />,
  },

  //Contents
  {
    path: 'subjects/:subjectId/courses/:courseId/chapters/:chapterId/create',
    element: <VideoCreate title="Create New Content" />,
  },
  {
    path: 'subjects/:subjectId/courses/:courseId/chapters/:chapterId/content/:contentId',
    element: <VideoDetails title="Show Content" />,
  },
  {
    path: 'subjects/:subjectId/courses/:courseId/chapters/:chapterId/content/:contentId/edit',
    element: <VideoEdit title="Edit Content" />,
  },

  //InternshipAdmin Routes
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
    path: 'internship-admin',
    element: <InternshipAdmin title="All" subtitle="Internship Admins" />,
  },
  { path: 'internship-admin/create', element: <CreateInternshipAdmin title="Add  Corporate/Internship Admin" /> },
  {
    path: 'internship-admin/:internshipAdminId/applications',
    element: <InternshipAdminShowApplication title="Internship Admin Applications" />,
  },
  {
    path: 'internship-admin/:internshipAdminId/trainers',
    element: <InternshipAdminShowTrainer title="Internship Admin Trainers" />,
  },
  {
    path: 'internship-admin/:internshipAdminId/students',
    element: <InternshipAdminShowStudent title="Internship Admin Students" />,
  },
  {
    path: 'internship-admin/:internshipAdminId/students/:studentId',
    element: (
      <StudentProfile
        title="Student Profile Students"
        isAdmin="true"
        isStudent="false"
      />
    ),
  },
  {
    path: 'internship-admin/:internshipAdminId',
    element: <ShowInternshipAdminDetail title="Internship Admin  Details" />,
  },
  {
    path: 'internship-admin/:internshipAdminId/internshipAdmin',
    element: <ShowInternshipAdminDetail title="Internship Admin  Details" />,
  },
  {
    path: 'internship-admin/:internshipAdminId/edit',
    element: <EditInternshipAdmin title="Edit Internship Admin" />,
  },



  // // {
  // //   path: 'internship-admin/:schoolId/students/:studentId',
  // //   element: (
  // //     <StudentProfile
  // //       title="Student Profile Students"
  // //       isAdmin="true"
  // //       isStudent="false"
  // //     />
  // //   ),
  // // },


  //trainers

  { path: 'trainers', element: <InternshipAdminTrainers /> },
  { path: 'trainers/create', element: <CreateTrainer /> },
  {
    path: 'trainers/:trainerId/show',
    element: <ShowTrainer title="Trainer Details" />,
  },
  // { path: 'trainers/:trainerId/edit', element: <EditTrainer /> },
  { path: 'trainers/:trainerId/edit', element: <TrainerProfileEdit /> },
  { path: 'trainers/:trainerId/assign', element: <AssignTrainer /> },
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

  //Tests
  { path: 'tests', element: <Test title="All Tests" /> },
  {
    path: 'tests/create',
    element: <TestCreate title="Create New Tests" />,
  },
  {
    path: 'tests/:testId/edit',
    element: <TestEdit title="Edit Tests" />,
  },
  {
    path: 'tests/:testId',
    element: <TestShow title="Show Tests Details" />,
  },
  {
    path: 'tests/:testId/results',
    element: <TestResult title="Show Tests Results" />,
  },
  { path: 'tests/:testId/results/:courseId/:studentId', element: <StudentSubjectResults isAdmin={true} isStudent={false}/>  },
  //Tests Question
  {
    path: 'tests/question-bank',
    element: <TestQuestionBank title="Tests Questions" />,
  },
  {
    path: 'tests/question-bank/create',
    element: <TestQuestionCreate title="Create Tests Question" />,
  },
  {
    path: 'tests/question-bank/:questionId/edit',
    element: <TestQuestionEdit title="Edit Tests Question" />,
  },
  {
    path: 'tests/question-bank/:questionId',
    element: <TestQuestionShow title="Show Tests Question" />,
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
      <Students title="All Students" isPrivate={false} isPublic={true} />
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

  // Live Qna session

  { path: 'live-sessions', element: <ZoomCall title="Live Session" /> },
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
      <StudentEdit
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
  {
    path: 'colleges',
    element: <Colleges title="Colleges" />,
  },
  {
    path: 'colleges/create',
    element: <CreateCollege title="Colleges" />,
  },
  {
    path: 'colleges/:collegeId/edit',
    element: <EditCollege title="Colleges" />,
  },
];

export default AdminRoutes;
