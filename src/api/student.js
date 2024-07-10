import { apiService } from '@/utils/services';

export const fetchDashboard = async (studentId) => {
  const response = await apiService.fetchData(
    `/student/dashboard?studentId=${studentId}`
  );
  return response.data;
};

export const fetchWalletDetails  = async (studentAuthId) => {
  const response = await apiService.fetchData(
    `/student/wallet-details/${studentAuthId}`
  );
  return response.data;
};
// export const fetchWalletLogs   = async (studentAuthId) => {
//   const response = await apiService.fetchData(
//     `/student/wallets?studentId=${studentAuthId}/logs`
//   );
//   return response.data;
// };
export const fetchReportCard = async (studentId, classId, sectionId) => {
  const response = await apiService.fetchData(
    `/student/get-report-card?studentId=${studentId}&classId=${classId}&sectionId=${sectionId}`
  );
  return response.data;
};

export const updateSettings = async (studentId, data) => {
  const response = await apiService.putData(
    `/student/${studentId}/update`,
    data
  );
  return response;
};

export const connectToParent = async (data) => {
  const response = await apiService.postData(`/student/connect-parent`, data);
  return response;
};

export const fetchClasses = async () => {
  const response = await apiService.fetchData('/classes');
  return response.data.classes;
};

export const fetchSubjectsWithResults = async (classId, studentId) => {
  const response = await apiService.fetchData(
    `student/subjects?classId=${classId}&studentId=${studentId}`
  );
  return response.data;
};

export const fetchContents = async (subjectId) => {
  const response = await apiService.fetchData(
    `student/subjects/${subjectId}/contents`
  );
  return response.data;
};

export const fetchExternalStudentContents = async (subjectId) => {
  const response = await apiService.fetchData(
    `student/subjects/${subjectId}/external-student-contents`
  );
  return response.data;
};

// Learn Page APIs
export const fetchNotes = async (studentId, videoId) => {
  const response = await apiService.fetchData(
    `student/notes?studentId=${studentId}&videoId=${videoId}`
  );
  return response.data;
};

export const storeNotes = async (data) => {
  const response = await apiService.postData(`student/notes`, data);
  return response.data;
};

export const storeVideoLog = async (data) => {
  const response = await apiService.postData(`student/video-log/store`, data);
  return response.data;
};

export const fetchQnA = async (studentId, teacherId, subjectId) => {
  const response = await apiService.fetchData(
    `student/qna/${studentId}/${teacherId}/${subjectId}`
  );
  return response.data;
};

export const searchQuestion = async (question) => {
  const response = await apiService.fetchData(`student/qna/search/${question}`);
  return response.data;
};

export const storeQnA = async (data) => {
  const response = await apiService.postData(`student/qna`, data);
  return response.data;
};

//Assessments
export const fetchAssessmentDetails = async (assessmentId) => {
  const response = await apiService.fetchData(
    `/student/assessments/${assessmentId}`
  );
  return response.data;
};

export const storeAssessmentResponse = async (data) => {
  const response = await apiService.postData(`student/assessments`, data);
  return response.data;
};

//Test APIs
export const fetchTestDetails = async (testId) => {
  const response = await apiService.fetchData(`/student/term-tests/${testId}`);
  return response.data;
};
export const fetchTestDetailsByToken = async (token, testId) => {
  const response = await apiService.fetchData(`/student/term-tests/get-details-by-token/${token}/${testId}`);
  console.log("respnse from cstudent api call", response);
  return response;
};
export const fetchJobDetailsByToken = async (token, jobId) => {
  const response = await apiService.fetchData(`/student/job-tests/get-details-by-token/${token}/${jobId}`);
  console.log("respnse from cstudent api call", response);
  return response;
};

export const storeTestResponse = async (data) => {
  const response = await apiService.postData(`student/term-tests`, data);
  return response.data;
};

export const storeTestResponseWithToken = async (data) => {
  const response = await apiService.postData(`student/term-tests/token`, data);
  return response.data;
};
export const storeJobResponseWithToken = async (data) => {
  const response = await apiService.postData(`student/job-tests/token`, data);
  return response.data;
};
export const storeJobResponseWithoutToken = async (data) => {
  const response = await apiService.postData(`student/job-tests/withoutToken`, data);
  return response.data;
};
export const startTest = async (data) => {
  const response = await apiService.postData(`student/term-tests/start`, data);
  return response.data;
};

//Subject Term Test Results
export const fetchStudentResultsBySubject = async (studentId, subjectId) => {
  const response = await apiService.fetchData(
    `/student/get-subject-results?studentId=${studentId}&subjectId=${subjectId}`
  );
  return response.data;
};

//Forum APIs

export const fetchForum = (studentId) => {
  return apiService
    .fetchData(`student/forums?studentId=${studentId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const storeForumQuestion = async (data) => {
  const response = await apiService.postData(`student/forums`, data);
  return response;
};

export const storeForumAnswer = async (data) => {
  const response = await apiService.postData(`student/forums/answer`, data);
  return response;
};

export const fetchForumQuestionDetails = async (forumId) => {
  const response = await apiService.fetchData(`/student/forums/${forumId}`);
  return response.data;
};

export const searchForumQuestion = async (searchQuery) => {
  const response = await apiService.fetchData(
    `student/forums/search/${searchQuery}`
  );
  return response;
};

export const voteForumAnswer = async (data) => {
  const response = await apiService.postData(`student/forums/answer-vote`, data);
  return response;
};

//Job APIs
export const fetchJobList = async () => {
  const response = await apiService.fetchData(`/student/jobs`);
  return response.data;
};

export const submitJobApplication = async (data) => {
  const response = await apiService.postData(`student/jobs`, data);
  console.log("response from jobs", response);
  console.log("response from jobs data", response.data)
  return response.data;
};

// export const startTest = async (data) => {
//   const response = await apiService.postData(`student/term-tests/start`, data);
//   return response.data;
// };

export const getElabDetails = async (elabId,studentId) => {
  const response = await apiService.fetchData(`/student/elabs/${elabId}/${studentId}`);
  return response.data;
};

export const submitElab = async (data) => {
  const response = await apiService.postData(`student/elabs/elab-submission`, data);
  return response;
};

export const getElabSubmissionByStudent = async (userId,elabId) => {
  const response = await apiService.fetchData(`/admin/elabs/submission/${userId}/${elabId}`);
  console.log("response", response.data);
  return response.data;
};

// fetch all the ebook , case studies, and project reports for student of that class
export const fetchReadableCourses = async () => {
  const response = await apiService.fetchData(`student/readable-courses`);
  console.log(response.data,"response for readable-courses");
  return response.data;
}
//later shift to the student api, currently sending to the admin

export const startMiniProject = async (data) => {
  const response = await apiService.postData(`/admin/mini-project-task-processes/start-mini-project`, data);
  return response.data;
};

export const getParentDetails = async (studentId) => {
  const response = await apiService.fetchData(`student/parent-details/${studentId}`);
  return response.data;
}

export const getInternships = async (studentId) => {
  const response = await apiService.fetchData(`/student/internships?studentId=${studentId}`);
  // console.log(response);
  return response.data;
};





export const startInternship = async (data) => {
  const response = await apiService.postData(`/admin/internship-task-processes/start-internship`, data);
  return response.data;
};

export const generateCertificateForInternship = async (data) => {
  const response = await apiService.postData(`/student/internship/generate-certificate`, data);
  console.log("response for certificate", response);
  return response;
};

export const completeMiniProject = async (data) => {
  const response = await apiService.postData(`/student/mini-project-tasks/complete-status-for-student`, data);
  console.log("response for mini projectg complete", response);
  return response;
};

export const fetchMyCourses = async () => {
  const response = await apiService.fetchData(
    `student/my-courses`
  );
  return response.data;
};

export const fetchCoursePreviewData = async (subjectId) => {
  const response = await apiService.fetchData(`/student/course-preview/${subjectId}`);
  return response.data;
};