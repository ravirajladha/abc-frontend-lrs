import { apiService } from '@/utils/services';
import { stringify } from 'qs';
import axios from 'axios';

export const fetchDashboard = async () => {
  const response = await apiService.fetchData(`/admin/dashboard`);
  return response.data;
};

export const updateSettings = async (data) => {
  const response = await apiService.putData(`/admin/update`, data);
  return response;
};

export const fetchInternshipAdmins = () => {
  return apiService
    .fetchData('/admin/internshipAdmins')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // console.error('Error fetching internshipAdmins:', error);
      throw error;
    });
};

export const getInternshipAdminData = async (internshipAdminId) => {
  return apiService
    .fetchData(`/admin/internshipAdmins/${internshipAdminId}`)
    .then((response) => {
      return response.data.internshipAdmin;
    })
    .catch((error) => {
      // console.error('Error fetching internship Admins details:', error);
      throw error;
    });
};


export const getTrainers = async (internshipAdminId) => {
  const response = await apiService.fetchData(
    `/admin/internshipAdmins/${internshipAdminId}/trainers`
  );
  return response.data;
};

export const getStudents = async (internshipAdminId) => {
  const response = await apiService.fetchData(
    `/admin/internshipAdmins/${internshipAdminId}/students`
  );
  return response.data;
};
export const getPublicStudents = async (page = 1, subjectId = '', sectionId = '') => {
  const response = await apiService.fetchData(
    `/admin/students/get-public-students?page=${page}&subjectId=${subjectId}&sectionId=${sectionId}`
  );
  return response.data;
};

export const getPrivateStudents = async (page = 1, internshipAdminId = '', subjectId = '', sectionId = '') => {
  const response = await apiService.fetchData(
    `/school/students/get-private-students?page=${page}&internshipAdminId=${internshipAdminId}&subjectId=${subjectId}&sectionId=${sectionId}`
  );
  return response.data;
};

export const getDinacharyaLogs = async (page = 1, internshipAdminId = '', subjectId = '') => {
  const response = await apiService.fetchData(
    `/admin/get-dinacharya-logs?page=${page}&internshipAdminId=${internshipAdminId}&subjectId=${subjectId}`
  );
  console.log("Dinacharya Logs", response.data)
  return response.data;
};

export const addStudentImages = async (data) => {
  return apiService.postData(`/internshipAdmin/students/add-student-images`, data);
};

export const getStudentImages = async (studentId) => {
  return apiService
    .fetchData(`/internshipAdmin/students/${studentId}/get-images`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // console.error('Error fetching internshipAdmin
    });
};

export const deleteStudentImage = (imageId) => {
  return apiService.deleteData(`/internshipAdmin/students/${imageId}/delete`);
};
export const getApplications = async (internshipAdminId) => {
  const response = await apiService.fetchData(
    `/admin/internshipAdmins/${internshipAdminId}/applications`
  );
  return response.data;
};

export const createInternshipAdmin = async (data) => {
  return apiService.postData(`/admin/internshipAdmins/store`, data);
};

export const editInternshipAdmin= async (internshipAdminId, data) => {
  return apiService
    .postData(`/admin/internshipAdmins/${internshipAdminId}/update`, data, { method: 'POST' })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

export const createSubject = (data) => {
  return apiService.postData(`/admin/subject/store`, data);
};

export const updateSubject= (subjectId, data) => {
  return apiService.putData(`/admin/subject/${subjectId}/update`, data);
};

export const deleteSubject = (subjectId) => {
  return apiService.deleteData(`/admin/subject/${subjectId}/delete`);
};


// Subject APIs

export const createCourse = (data) => {
  return apiService
    .postData(`/admin/courses/store`, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // console.error(error);
      throw error;
    });
};

export const updateCourse = (courseId, data) => {
  return apiService
    .postData(`/admin/courses/${courseId}/update`, data, { method: 'POST' })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const deleteCourse = (courseId) => {
  return apiService.deleteData(`/admin/courses/${courseId}/delete`);
};

//pending
export const fetchSuperSubjects = async () => {
  const response = await apiService.fetchData(
    `/admin/super-subjects`
  );
  return response.data;
};

// Chapter APIs
export const createChapter = (data) => {
  return apiService.postData(`/admin/chapters/store`, data);
};

export const updateChapter = (chapterId, data) => {
  return apiService.postData(`/admin/chapters/${chapterId}/update`, data, {
    method: 'POST',
  });
};

export const deleteChapter = (chapterId) => {
  return apiService.deleteData(`/admin/chapters/${chapterId}/delete`);
};

//Assessment Questions APIs
export const fetchAssessmentQuestions = async (subjectId, courseId) => {
  const response = await apiService.fetchData(
    `/admin/assessment-questions?subjectId=${subjectId}&courseId=${courseId}`
  );
  return response.data;
};

export const fetchAssessmentQuestionDetails = async (assessmentQuestionId) => {
  const response = await apiService.fetchData(
    `/admin/assessment-questions/${assessmentQuestionId}/show`
  );
  return response.data;
};

export const createAssessmentQuestion = (data) => {
  return apiService.postData(`admin/assessment-questions/store`, data);
};

export const editAssessmentQuestion = (assessmentQuestionId, data) => {
  return apiService.putData(
    `admin/assessment-questions/${assessmentQuestionId}/update`,
    data
  );
};

export const deleteAssessmentQuestion = (assessmentQuestionId) => {
  return apiService.deleteData(
    `/admin/assessment-questions/${assessmentQuestionId}/delete`
  );
};

//Assessment APIs
export const fetchSingleAssessment = async (assessmentId) => {
  const response = await apiService.fetchData(
    `/admin/assessments/${assessmentId}`
  );
  return response.data;
};

export const fetchAssessmentDetails = async (assessmentId) => {
  const response = await apiService.fetchData(
    `/admin/assessments/${assessmentId}/show`
  );
  return response.data;
};

export const fetchAssessments = async (subjectId, courseId) => {
  const response = await apiService.fetchData(
    `/admin/assessments?subjectId=${subjectId}&courseId=${courseId}`
  );
  return response.data;
};

export const fetchAssessmentQuestionsByIds = async (subjectId, courseId) => {
  const response = await apiService.fetchData(
    `/admin/assessment-questions?subjectId=${subjectId}&courseId=${courseId}`
  );
  return response.data;
};

export const fetchAssessmentQuestionsCount = async (courseId) => {
  const response = await apiService.fetchData(
    `/minimal/get-assessment-questions-count?courseId=${courseId}`
  );
  return response.data;
};

export const createAssessment = (data) => {
  return apiService.postData(`admin/assessments/store`, data);
};

export const deleteAssessment = (assessmentId) => {
  return apiService.deleteData(`/admin/assessments/${assessmentId}/delete`);
};

export const updateAssessment = async (assessmentId, data) => {
  return apiService.putData(`/admin/assessments/${assessmentId}/update`, data);
};

export const fetchAssessmentResult = async (assessmentId) => {
  const response = await apiService.fetchData(
    `/admin/assessments/${assessmentId}/results`
  );
  return response.data;
};

//Test Questions APIs
export const fetchTestQuestions = async (subjectId, courseId) => {
  const response = await apiService.fetchData(
    `/admin/tests-questions?subjectId=${subjectId}&courseId=${courseId}`
  );
  return response.data;
};

export const fetchTestQuestionDetails = async (questionId) => {
  const response = await apiService.fetchData(
    `/admin/tests-questions/${questionId}/show`
  );
  console.log("question test data", response.data)
  return response.data;
};

export const editTestQuestion = (questionId, data) => {
  return apiService.putData(`admin/tests-questions/${questionId}/update`, data);
};

export const createTestQuestion = (data) => {
  return apiService.postData(`admin/tests-questions/store`, data);
};

export const deleteTestQuestion = (testQuestionId) => {
  return apiService.deleteData(
    `/admin/tests-questions/${testQuestionId}/delete`
  );
};

// Test APIs

export const fetchTestDetails = async (testId) => {
  const response = await apiService.fetchData(`/admin/tests/${testId}`);
  return response.data;
};

export const fetchTests = async (subjectId, courseId) => {
  const response = await apiService.fetchData(
    `/admin/tests?subjectId=${subjectId}&courseId=${courseId}`
  );
  console.log("tests data", response)
  return response.data;
};

export const fetchTestResult = async (testId) => {
  const response = await apiService.fetchData(
    `/admin/tests/${testId}/results`
  );
  return response.data;
};

export const fetchTestQuestionsByIds = async (courseId) => {
  const response = await apiService.fetchData(
    `/minimal/test-questions?courseId=${courseId}`
  );
  return response.data;
};
export const fetchTestQuestionsBySubjectIds = async (subjectsIds) => {
  const idsArray = Array.isArray(subjectsIds) ? subjectsIds : [subjectsIds];
  
  // Join the array into a comma-separated string
  const ids = idsArray.join(',');
  // const ids = classIds.join(',');
  const response = await apiService.fetchData(`/minimal/test-questions-by-subject-id?subjectsIds=${ids}`);
  return response.data;
};

export const createTest = (data) => {
return apiService.postData(`admin/tests/store`, data);
  console.log("response print from route", response);
  // return response.data;
};

export const deleteTest = (testId) => {
  return apiService.deleteData(`/admin/tests/${testId}/delete`);
};

export const updateTest = async (testId, data) => {
  return apiService.putData(`/admin/tests/${testId}/update`, data);
};

export const checkTestAvailability = async (subjectId) => {
  const response = await apiService.fetchData(
    `/admin/tests/availability/${courseId}`
  );
  return response.data;
};

//Ebook APIs
export const createEbook = async (data) => {
  const response = await apiService.postData(`/admin/ebooks/store`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const fetchEbooks = async () => {
  const response = await apiService.fetchData(`/admin/ebooks`);
  return response.data;
};

export const deleteEbook = async (ebookId) => {
  const response = await apiService.deleteData(
    `/admin/ebooks/${ebookId}/delete`
  );
  return response.data;
};

export const updateEbook = async (ebookId, data) => {
  const response = await apiService.postData(
    `/admin/ebooks/${ebookId}/update`,
    data,
    { method: 'POST' }
  );
  return response.data;
};

export const fetchEbookDetails = async (ebookId) => {
  const response = await apiService.fetchData(`/admin/ebooks/${ebookId}`);
  return response.data;
};

// To fetch ebook with modules, sections, elements for preview page
export const fetchEbook = async (ebookId) => {
  const response = await apiService.fetchData(
    `/admin/ebooks/${ebookId}/getEbook`
  );
  return response.data;
};

export const fetchEbookMobile = async (ebookId) => {
  const apiUrl = import.meta.env.VITE_BASE_URL + `api/mobile/ebooks/${ebookId}/get-ebook-mobile`;
  try {
    const response = await axios.get(apiUrl);
    console.log(response.data.data.ebook);
    return response.data.data;
  } catch (error) {
    // Handle errors if needed
    console.error('Error fetching ebook:', error);
    throw error; // rethrow the error or handle it gracefully
  }
};


// Ebook Modules
export const fetchEbookModules = async (ebookId) => {
  const response = await apiService.fetchData(
    `/admin/ebooks-modules/${ebookId}`
  );
  return response.data;
};

export const createEbookModules = async (ebookId, data) => {
  const response = await apiService.postData(
    `/admin/ebooks-modules/${ebookId}/store`,
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

export const editEbookModule = async (moduleId, data) => {
  const response = await apiService.postData(
    `/admin/ebooks-modules/${moduleId}/update`,
    data,
  );
  return response.data;
};

export const fetchEbookModuleDetails = async (moduleId) => {
  const response = await apiService.fetchData(
    `/admin/ebooks-modules/${moduleId}/detail`
  );
  return response.data;
};

// Ebook Sections
export const fetchEbookSections = async (ebookId, moduleId) => {
  const response = await apiService.fetchData(
    `/admin/ebooks-sections/${ebookId}/${moduleId}`
  );
  return response.data;
};

export const createEbookSections = async (ebookId, moduleId, data) => {
  const response = await apiService.postData(
    `/admin/ebooks-sections/${ebookId}/${moduleId}/store`,
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

export const editEbookSection = async (sectionId, data) => {
  const response = await apiService.postData(
    `/admin/ebooks-sections/${sectionId}/update`,
    data,
  );
  return response.data;
};

export const fetchEbookSectionDetails = async (sectionId) => {
  const response = await apiService.fetchData(
    `/admin/ebooks-sections/${sectionId}/detail`
  );
  return response.data;
};

// Ebook elements
export const fetchEbookElementTypes = async () => {
  const response = await apiService.fetchData(`/admin/ebooks-elements/types`);
  return response.data;
};

export const createEbookElement = async (sectionId, data) => {
  return await apiService.postData(
    `/admin/ebooks-elements/store-or-update`,
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};

export const fetchEbookElement = async ($elementId) => {
  const response = await apiService.fetchData(
    `/admin/ebooks-elements/get-element/${$elementId}`
  );
  return response.data;
};
export const updateEbookElement = async (elementId, data) => {
  const response = await apiService.postData(
    `/admin/ebooks-elements/store-or-update/${elementId}`,
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

export const deleteEbookElement = async (elementId) => {
  const response = await apiService.deleteData(
    `/admin/ebooks-elements/${elementId}/delete`
  );
  return response.data;
};

//Project Report APIs
export const createProjectReport = async (data) => {
  const response = await apiService.postData(
    `/admin/project-reports/store`,
    data
  );
  return response.data;
};

export const fetchProjectReports = async () => {
  const response = await apiService.fetchData(`/admin/project-reports`);
  return response.data;
};

export const updateProjectReport = async (projectReportId, data) => {
  const response = await apiService.postData(
    `/admin/project-reports/${projectReportId}/update`,
    data,
    { method: 'POST' }
  );
  return response.data;
};

export const fetchProjectReportDetails = async (projectReportId) => {
  const response = await apiService.fetchData(
    `/admin/project-reports/${projectReportId}`
  );
  return response.data;
};

export const deleteProjectReport = async (projectReportId) => {
  const response = await apiService.deleteData(
    `/admin/project-reports/${projectReportId}/delete`
  );
  return response.data;
};

// To fetch Project report with modules, sections, elements for preview page
export const fetchProjectReport = async (projectReportId) => {
  const response = await apiService.fetchData(
    `/admin/project-reports/${projectReportId}/get-project-report`
  );
  return response.data;
};

export const fetchProjectReportMobile = async (projectReportId) => {
  const apiUrl = import.meta.env.VITE_BASE_URL + `api/mobile/project-reports/${projectReportId}/get-project-report-mobile`;
  try {
    const response = await axios.get(apiUrl);
    return response.data.data;
  } catch (error) {
    // Handle errors if needed
    console.error('Error fetching ebook:', error);
    throw error; // rethrow the error or handle it gracefully
  }
};

// Project report Modules
export const fetchProjectReportModules = async (projectReportId) => {
  const response = await apiService.fetchData(
    `/admin/project-report-modules/${projectReportId}`
  );
  return response.data;
};

export const createProjectReportModules = async (projectReportId, data) => {
  const response = await apiService.postData(
    `/admin/project-report-modules/${projectReportId}/store`,
    data
  );
  return response.data;
};

export const editProjectReportModule = async (moduleId, data) => {
  const response = await apiService.postData(
    `/admin/project-report-modules/${moduleId}/update`,
    data,
  );
  return response.data;
};

export const fetchProjectReportModuleDetails = async (moduleId) => {
  const response = await apiService.fetchData(
    `/admin/project-report-modules/${moduleId}/detail`
  );
  return response.data;
};

// Project Report Sections
export const fetchProjectReportSections = async (projectReportId, moduleId) => {
  const response = await apiService.fetchData(
    `/admin/project-report-sections/${projectReportId}/${moduleId}`
  );
  return response.data;
};
export const createProjectReportSections = async (
  projectReportId,
  moduleId,
  data
) => {
  const response = await apiService.postData(
    `/admin/project-report-sections/${projectReportId}/${moduleId}/store`,
    data
  );
  return response.data;
};

export const editProjectReportSection = async (sectionId, data) => {
  const response = await apiService.postData(
    `/admin/project-report-sections/${sectionId}/update`,
    data,
  );
  return response.data;
};

export const fetchProjectReportSectionDetails = async (sectionId) => {
  const response = await apiService.fetchData(
    `/admin/project-report-sections/${sectionId}/detail`
  );
  return response.data;
};
// Project Report elements
export const createProjectReportElement = async (sectionId, data) => {
  return await apiService.postData(
    `/admin/project-report-elements/store-or-update`,
    data
  );
};
export const updateProjectReportElement = async (elementId, data) => {
  const response = await apiService.postData(
    `/admin/project-report-elements/store-or-update/${elementId}`,
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};
export const deleteProjectReportElement = async (elementId) => {
  const response = await apiService.deleteData(
    `/admin/project-report-elements/${elementId}/delete`
  );
  return response;
};
export const fetchProjectReportElement = async ($elementId) => {
  const response = await apiService.fetchData(
    `/admin/project-report-elements/get-element/${$elementId}`
  );
  return response.data;
};

// Case Study APIs
export const createCaseStudy = async (data) => {
  const response = await apiService.postData(`/admin/case-study/store`, data);
  return response.data;
};

export const fetchCaseStudies = async () => {
  const response = await apiService.fetchData(`/admin/case-study`);
  return response.data;
};

export const updateCaseStudy = async (caseStudyId, data) => {
  const response = await apiService.postData(
    `/admin/case-study/${caseStudyId}/update`,
    data,
    { method: 'POST' }
  );
  return response.data;
};

export const fetchCaseStudyDetails = async (caseStudyId) => {
  const response = await apiService.fetchData(
    `/admin/case-study/${caseStudyId}`
  );
  return response.data;
};

export const deleteCaseStudy = async (caseStudyId) => {
  const response = await apiService.deleteData(
    `/admin/case-study/${caseStudyId}/delete`
  );
  return response.data;
};

// To fetch Case Study with modules, sections, elements for preview page
export const fetchCaseStudy = async (caseStudyId) => {
  const response = await apiService.fetchData(
    `/admin/case-study/${caseStudyId}/get-case-study`
  );
  return response.data;
};
export const fetchCaseStudyMobile = async (caseStudyId) => {
  const apiUrl = import.meta.env.VITE_BASE_URL + `api/mobile/case-study/${caseStudyId}/get-case-study-mobile`;
  try {
    const response = await axios.get(apiUrl);
    return response.data.data;
  } catch (error) {
    // Handle errors if needed
    console.error('Error fetching case study:', error);
    throw error; // rethrow the error or handle it gracefully
  }
};
// Case Study Modules
export const fetchCaseStudyModules = async (caseStudyId) => {
  const response = await apiService.fetchData(
    `/admin/case-study-modules/${caseStudyId}`
  );
  return response.data;
};

export const createCaseStudyModules = async (caseStudyId, data) => {
  const response = await apiService.postData(
    `/admin/case-study-modules/${caseStudyId}/store`,
    data
  );
  return response.data;
};

export const editCaseStudyModule = async (moduleId, data) => {
  const response = await apiService.postData(
    `/admin/case-study-modules/${moduleId}/update`,
    data,
  );
  return response.data;
};

export const fetchCaseStudyModuleDetails = async (moduleId) => {
  const response = await apiService.fetchData(
    `/admin/case-study-modules/${moduleId}/detail`
  );
  return response.data;
};
// Case Study Sections
export const fetchCaseStudySections = async (caseStudyId, moduleId) => {
  const response = await apiService.fetchData(
    `/admin/case-study-sections/${caseStudyId}/${moduleId}`
  );
  return response.data;
};
export const createCaseStudySections = async (caseStudyId, moduleId, data) => {
  const response = await apiService.postData(
    `/admin/case-study-sections/${caseStudyId}/${moduleId}/store`,
    data
  );
  return response.data;
};
export const editCaseStudySection = async (sectionId, data) => {
  const response = await apiService.postData(
    `/admin/case-study-sections/${sectionId}/update`,
    data,
  );
  return response.data;
};

export const fetchCaseStudySectionDetails = async (sectionId) => {
  const response = await apiService.fetchData(
    `/admin/case-study-sections/${sectionId}/detail`
  );
  return response.data;
};

// Case Study elements
export const createCaseStudyElement = async (sectionId, data) => {
  return await apiService.postData(
    `/admin/case-study-elements/store-or-update`,
    data
  );
};
export const updateCaseStudyElement = async (elementId, data) => {
  const response = await apiService.postData(
    `/admin/case-study-elements/store-or-update/${elementId}`,
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};
export const deleteCaseStudyElement = async (elementId) => {
  const response = await apiService.deleteData(
    `/admin/case-study-elements/${elementId}/delete`
  );
  return response;
};
export const fetchCaseStudyElement = async ($elementId) => {
  const response = await apiService.fetchData(
    `/admin/case-study-elements/get-element/${$elementId}`
  );
  return response.data;
};
// Readable COurses
export const createReadableCourses = async (data) => {
  const response = await apiService.postData(
    `/admin/readable-courses/store`,
    data
  );
  return response.data;
};

export const fetchReadableCoursesList = async () => {
  const response = await apiService.fetchData(
    `/admin/readable-courses`
  );
  return response.data;
};
//Video APIs
export const createVideo = (data) => {
  return apiService
    .postData(`/admin/videos/store`, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // console.error(error);
      throw error;
    });
};

export const fetchVideoDetails = async (contentId) => {
  const response = await apiService.fetchData(`/admin/videos/${contentId}`);
  return response.data;
};

export const updateVideo = (contentId, data) => {
  return apiService
    .postData(`/admin/videos/${contentId}/update`, data, { method: 'POST' })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const deleteVideo = (contentId) => {
  return apiService.deleteData(`/admin/videos/${contentId}/delete`);
};

//Job APIs
export const createJobDetails = (data) => {
  return apiService
    .postData(`/admin/jobs`, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
export const fetchJobTests = async () => {
  const response = await apiService.fetchData(
    `/recruiter/job-tests`
  );
  console.log("job tests", response.data)
  return response.data;
};

export const fetchJobList = async () => {
  const response = await apiService.fetchData(`/admin/jobs`);
  console.log("response", response.data)
  return response.data;
};

export const fetchJobApplicationsList = async (jobId, filters) => {
  console.log("filters", filters);
  const response = await apiService.fetchData(`/admin/jobs/${jobId}/applications`, filters);
  return response.data;
};


export const fetchJobDetails = async (jobId) => {
  const response = await apiService.fetchData(`/admin/jobs/${jobId}`);
  return response.data;
};

export const updateJobDetails = (jobId, data) => {
  const stringifiedData = stringify(data);
  return apiService
    .postData(`/admin/jobs/${jobId}/update`, data, { method: 'POST' })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const deleteJobDetails = (jobId) => {
  return apiService.deleteData(`/admin/jobs/${jobId}`);
};


export const createElab = async (data) => {
    const response = await apiService
      .postData(`/admin/elabs/store`, data);
    return response.data;

};

export const getElabDetails = async (elabId, studentId = null) => {
  // Construct the API endpoint based on whether studentId is provided
  const endpoint = studentId !== null ? `/admin/elabs/${elabId}?studentId=${studentId}` : `/admin/elabs/${elabId}`;

  try {
    const response = await apiService.fetchData(endpoint);
    return response.data.elab;
  } catch (error) {
    throw error;
  }
};
export const getElabSubmittedCode = async (id) => {
  // Construct the API endpoint based on whether studentId is provided

  // const response = await apiService.fetchData(`/admin/elabs/get-elab-submitted-code/${id}`);
  // console.log("response", response.data);

  // return response.data;

  const endpoint = `/admin/elabs/get-elab-submitted-code/${id}`;

  try {
    const response = await apiService.fetchData(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const editElab = async (elabId, data) => {
  return apiService
    .postData(`/admin/elabs/${elabId}/update`, data, { method: 'POST' })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};




export const getElabParticipants = async (elabId) => {
  const response = await apiService.fetchData(`/admin/elabs/get-elab-participant/${elabId}`);
  console.log("response", response.data);

  return response.data;
};


export const deleteElabParticipantCodeBase = async (id) => {
  const response = await apiService.deleteData(
    `/admin/elabs/delete-elab-participant-codebase/${id}/delete`
  );
  return response;
};


export const deleteMiniProject = async (id) => {
  const response = await apiService.deleteData(
    `/admin/mini-projects/delete-mini-project/${id}/delete`
  );
  return response;
};
export const deleteMiniProjectTask = async (id) => {
  const response = await apiService.deleteData(
    `/admin/mini-projects/delete-mini-project-task/${id}/delete`
  );
  return response;
};
export const deleteMiniProjectParticipant = async (id) => {
  const response = await apiService.deleteData(
    `/admin/mini-projects/delete-mini-project-participant/${id}/delete`
  );
  return response;
};
export const deleteInternship = async (id) => {
  const response = await apiService.deleteData(
    `/admin/internships/delete-internship/${id}/delete`
  );
  return response;
};
export const deleteInternshipTask = async (id) => {
  const response = await apiService.deleteData(
    `/admin/internships/delete-internship-task/${id}/delete`
  );
  return response;
};
export const deleteInternshipParticipant = async (id) => {
  const response = await apiService.deleteData(
    `/admin/internships/delete-internship-participant/${id}/delete`
  );
  return response;
};


export const updateElabStatus = async (id, status) => {
  console.log(id, status)
  const response = await apiService.putData(`/admin/elabs/${id}/update-status`, { status });
  console.log(response);

  return response;
};

export const fetchElabs = (page = 1) => {
  return apiService
    .fetchData(`/admin/elabs?page=${page}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // console.error('Error fetching internshipAdmins:', error);
      throw error;
    });
};

// mini project

export const createMiniProject = async (data) => {
  return await apiService.postData(
    `/admin/mini-projects/store`,
    data
  );
};
export const createMiniProjectTask = async (data) => {
  return await apiService.postData(
    `/admin/mini-project-tasks/store`,
    data
  );
};

export const getMiniProjectTaskDetail = async (miniProjectTaskId) => {
  const response = await apiService.fetchData(`/admin/mini-project-tasks/${miniProjectTaskId}`);
  // console.log("internship task detail", response.data.miniProjectTask);
  return response.data.miniProjectTask;
};
export const getInternshipTaskDetail = async (internshipTaskId) => {
  const response = await apiService.fetchData(`/admin/internship-tasks/${internshipTaskId}`);
  // console.log("internship task detail", response.data.miniProjectTask);
  return response.data.internshipTask;
};
 

export const getMiniProjects = async () => {
  const response = await apiService.fetchData(`/admin/mini-projects`);
  return response.data;
};

export const getMiniProjectParticipants = async (projectId) => {
  const response = await apiService.fetchData(`/admin/mini-projects/participants/${projectId}`);
  console.log("respionse for partuicapnt", response.data);
  return response.data;
};
export const getInternshipParticipants = async (projectId) => {
  const response = await apiService.fetchData(`/admin/internships/participants/${projectId}`);
  console.log("respionse for partuicapnt", response.data);
  return response.data;
};


export const getMiniProjectTasks = async (projectId,studentId) => {
  const response = await apiService.fetchData(`/admin/mini-project-tasks/${projectId}/${studentId}`);
  return response.data;
};


export const editMiniProjectTask = (miniProjectTaskId, data) => {
  // console.log("minin project",data)
  return apiService
    .postData(`/admin/mini-project-tasks/${miniProjectTaskId}/update`, data, { method: 'POST' })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
export const editInternshipTask = (internshipTaskId, data) => {
  return apiService
    .postData(`/admin/internship-tasks/${internshipTaskId}/update`, data, { method: 'POST' })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getMiniProjectDetail = async (miniProjectId) => {
  const response = await apiService.fetchData(`/admin/mini-projects/${miniProjectId}`);
  // console.log("internship task detail", response.data);
  return response.data;
};
export const getInternshipDetail = async (internshipId) => {
  const response = await apiService.fetchData(`/admin/internships/${internshipId}`);
  // console.log("internship task detail", response.data);
  return response.data;
};


// export const editMiniProject = async (miniProjectId, data) => {
//   return apiService.putData(`/admin/mini-projects/${elabId}/update`, data);
// };


export const editMiniProject = (miniProjectId, data) => {
  console.log("minin project",data)
  return apiService
    .postData(`/admin/mini-projects/${miniProjectId}/update`, data, { method: 'POST' })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
export const editInternship = (internshipId, data) => {
  console.log("internship",data)
  return apiService
    .postData(`/admin/internships/${internshipId}/update`, data, { method: 'POST' })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};


//internships

export const createInternship = async (data) => {
  return await apiService.postData(
    `/admin/internships/store`,
    data
  );
};
export const createInternshipTask = async (data) => {
  return await apiService.postData(
    `/admin/internship-tasks/store`,
    data
  );
};

export const getInternships = async () => {
  const response = await apiService.fetchData(`/admin/internships`);
  // console.log(response);
  return response.data;
};

export const getInternshipTasks = async (internshipId,studentId) => {
  const response = await apiService.fetchData(`/admin/internship-tasks/${internshipId}/${studentId}`);
  // console.log("internship task detail", response.data);
  return response.data;
};

export const getAllInternshipTasks = async (internshipId) => {
  // console.log("internship task detail1", internshipId);
  const response = await apiService.fetchData(`/admin/internship-tasks/all/${internshipId}`);
  console.log("internship task detail", response.data);
  return response.data;
};
export const getAllMiniProjectTasks = async (miniProjectId) => {
  // console.log("internship task detail1", internshipId);
  const response = await apiService.fetchData(`/admin/mini-project-tasks/all/${miniProjectId}`);
  console.log("mini project task detail", response.data);
  return response.data;
};

// export const getMiniProjectTasksProcess = async (projectId,status) => {
//   const response = await apiService.fetchData(`/admin/mini-project-task-processes/${projectId}/${status}`);
//   console.log("mini project task process detail", response.data);
//   return response.data;
// };


export const fetchFeeDetails = async () => {
  const response = await apiService.fetchData(`/admin/fee`);
  return response.data;
};

export const validateReferralCode = async (data) => {
  console.log("referal code", data)
  const response = await apiService.postData('/admin/fee/validate-referral-name', data);
  return response.data;
};


export const updateFeeDetails = async (data) => {
  const response = await apiService.postData(`/admin/fees/update`, data);
  return response.data;

};
export const createFees = async (data) => {
  const response = await apiService.postData(`/admin/fees/store`, data);
  return response.data;
};

export const fetchFees = async () => {
  const response = await apiService.fetchData(`/admin/fees`);
  return response.data;
};

export const fetchFeeDetail = async (feeId) => {
  const response = await apiService.fetchData(`/admin/fees/${feeId}`);
  return response.data;
};

export const updateFee = async (data, feeId) => {
  const response = await apiService.postData(`/admin/fees/${feeId}/update`, data);
  return response.data;

};
//Recruiter APIS
//Trainer APIs

export const fetchRecruiters= async () => {
  const response = await apiService.fetchData('/admin/recruiters');
  return response.data;
};

export const createRecruiter = async (data) => {
  const response = await apiService.postData(`/admin/recruiters/store`, data);
  return response.data;
};

export const fetchRecruiter = async (recruiterId) => {
  const response = await apiService.fetchData(`/admin/recruiters/${recruiterId}`);
  return response.data;
};

export const fetchRecruiterClassSubject = async (recruiterId) => {
  const response = await apiService.fetchData(
    `/admin/recruiters/${recruiterId}/assign`
  );
  return response.data;
};

export const editRecruiter = async (recruiterId, data) => {
  return apiService
    .postData(`/admin/recruiters/${recruiterId}/update`, data, { method: 'POST' })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

export const resetRecruiterPassword = async (recruiterId, data) => {
  return apiService.putData(`/internshipAdmin/trainers/${recruiterId}/reset`, data);
};

export const assignTrainer = async (recruiterId, data) => {
  const response = await apiService.postData(
    `/internshipAdmin/trainers/${recruiterId}/assign`,
    data
  );
  return response.data;
};

export const deleteTrainer = (recruiterId) => {
  return apiService.deleteData(`/internshipAdmin/trainers/${recruiterId}/delete`);
};

export const fetchQuotes = (currentPage) => {
  return apiService
    .fetchData(`/admin/quotes?page=${currentPage}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // console.error('Error fetching internshipAdmins:', error);
      throw error;
    });
};
export const createQuote = async (data) => {
  return apiService.postData(`/admin/quotes/store`, data);
};
export const createQuotesBulk = async (data) => {
  return apiService.postData(`/admin/quotes/bulk-store`, data);
};


export const getQuoteDetail = async (quoteId) => {
  return apiService
    .fetchData(`/admin/quotes/${quoteId}`)
    .then((response) => {
      return response.data.quote;
    })
    .catch((error) => {
      // console.error('Error fetching internshipAdmin details:', error);
      throw error;
    });
};
export const editQuote = async (quoteId, data) => {
  return apiService
    .postData(`/admin/quotes/${quoteId}/update`, data, { method: 'POST' })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};
export const deleteQuote = (quoteId) => {
  return apiService.deleteData(`/admin/quotes/${quoteId}/delete`);
};


// zoom call
export const createZoomCall = async (data) => {
  const response = await apiService.postData(`/admin/zoom-calls/store`, data);
  return response.data;
};

export const fetchZoomCalls = async () => {
  const response = await apiService.fetchData(`/admin/zoom-calls`);
  return response.data;
};

export const fetchZoomCallDetail = async (zoomCallId) => {
  const response = await apiService.fetchData(`/admin/zoom-calls/${zoomCallId}`);
  return response.data;
};

export const updateZoomCall = async (data, zoomCallId) => {
  const response = await apiService.postData(`/admin/zoom-calls/${zoomCallId}/edit`, data);
  return response.data;
};

export const fetchSessionAttendies = async (zoomCallId) => {
  const response = await apiService.fetchData(`/admin/zoom-calls/${zoomCallId}/students`);
  return response.data;
};

export const sendDinacharyaMessages = async () => {
  const response = await apiService.fetchData(`/admin/send-dinacharya-messages`);
  return response.data;
};

export const fetchForumQuestions = async (page = 1) => {
  const response = await apiService.fetchData(`/admin/forums/questions?page=${page}`);
  return response.data;
};
export const updateForumStatus = async (data) => {
  const response = await apiService.postData(`/admin/forums/update-status`,data);
  return response.data;
};
export const updateForumAnswerStatus = async (data) => {
  const response = await apiService.postData(`/admin/forums/answer/update-status`,data);
  return response.data;
};
export const fetchForumQuestionDetails = async (forumId) => {
  const response = await apiService.fetchData(`/admin/forums/questions/${forumId}/answers`);
  return response.data;
};

export const fetchTransactions = async (page = 1) => {
  const response = await apiService.fetchData(`/admin/transactions?page=${page}`);
  return response.data;
};

export const updateStudentStatus = async (data) => {
  const response = await apiService.postData(`/admin/students/update-status`,data);
  return response.data;
};

export const fetchColleges = async () => {
  const response = await apiService.fetchData(
    `/admin/colleges`
  );
  return response.data;
};
export const getCollegeDetails = async (collegeId) => {
  const response = await apiService.fetchData(
    `/admin/colleges/${collegeId}`
  );
  return response.data;
};

export const storeCollege = async (data) => {
  const response = await apiService.postData(
    `/admin/colleges`, data
  );
  return response.data;
};

export const updateCollege = async (collegeId, data) => {
  const response = await apiService.putData(
    `/admin/colleges/${collegeId}`, data
  );
  return response.data;
};
export const updateCollegeStatus = async (collegeId, status) => {
  const response = await apiService.putData(
    `/admin/colleges/${collegeId}/update-status`, {status}
  );
  return response.data;
};

export const fetchFAQs = async (courseId) => {
  const response = await apiService.fetchData(
    `/trainer/faq/${courseId}`
  );
  return response.data;
};