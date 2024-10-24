import { StudentTable } from '@/pages';
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

export const fetchReportCard = async (studentId, subjectId, sectionId) => {
  const response = await apiService.fetchData(
    `/student/get-report-card?studentId=${studentId}`
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

export const fetchSubjects = async () => {
  const response = await apiService.fetchData('/subjects');
  return response.data.subjects;
};

export const fetchSubjectsWithResults = async () => {
  const response = await apiService.fetchData(
    `student/courses`
  );
  console.log("response", response);
  return response.data;
};

export const fetchContents = async (courseId) => {
  const response = await apiService.fetchData(
    `student/courses/${courseId}/contents`
  );
  return response.data;
};

export const fetchExternalStudentContents = async (courseId) => {
  const response = await apiService.fetchData(
    `student/courses/${courseId}/external-student-contents`
  );
  console.log("api called for learn")
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

export const fetchQnA = async (studentId, trainerId, courseId) => {
  const response = await apiService.fetchData(
    `student/qna/${studentId}/${trainerId}/${courseId}`
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
  const response = await apiService.fetchData(`/student/tests/${testId}`);
  return response.data;
};
export const fetchTestDetailsByToken = async (token, testId) => {
  const response = await apiService.fetchData(`/student/tests/get-details-by-token/${token}/${testId}`);
  console.log("respnse from cstudent api call", response);
  return response;
};
export const fetchJobDetailsByToken = async (token, jobId) => {
  const response = await apiService.fetchData(`/student/job-tests/get-details-by-token/${token}/${jobId}`);
  console.log("respnse from cstudent api call", response);
  return response;
};

export const storeTestResponse = async (data) => {
  const response = await apiService.postData(`student/tests`, data);
  return response.data;
};

export const storeTestResponseWithToken = async (data) => {
  const response = await apiService.postData(`student/tests/token`, data);
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
  const response = await apiService.postData(`student/tests/start`, data);
  return response.data;
};

//Subject  Test Results
export const fetchStudentResultsByCourse= async (studentId, courseId) => {
  const response = await apiService.fetchData(
    `/student/get-course-results?studentId=${studentId}&courseId=${courseId}`
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
//   const response = await apiService.postData(`student/tests/start`, data);
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

export const getResource = async () => {
  const response = await apiService.fetchData(`/download-zip`);
  return response;
}
export const storeRatingReview = async (data) => {
  const response = await apiService.postData(`/student/courses/rating-review`,data);
  return response.data;
};

export const fetchRatingReview = async (courseId) => {
  const response = await apiService.fetchData(`/student/courses/${courseId}/ratings-reviews`);
  return response.data;
}

export const getStudentDetails = async (studentId) => {
  const response = await apiService.fetchData(`/student/${studentId}/details`);
  return response.data;
}

export const updateStudentProfile = async (studentId,data) => {
  const response = await apiService.postData(`/student/${studentId}/update-profile`,data);
  return response.data;
};

export const generateCertificate = async (courseId) => {
  const response = await apiService.fetchData(`/student/courses/${courseId}/generate-certificate`);
  return response.data;
};

export const trackLiveSessionClick = async (sessionId) => {
  const response = await apiService.fetchData(`/student/track-live-session-click/${sessionId}`);
  return response.data;
};