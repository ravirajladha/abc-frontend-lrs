import { apiService } from '@/utils/services';

export const fetchDashboard = async () => {
  const response = await apiService.fetchData(`/recruiter/dashboard`);
  return response.data;
};

export const updateSettings = async (recruiterId, data) => {
  const response = await apiService.putData(`/recruiter/${recruiterId}/update`, data);
  return response;
};

export const fetchStudents = async () => {
  const response = await apiService.fetchData(`/trainer/get-students`);
  return response.data;
};

//Test Questions APIs
export const fetchTestQuestions = async (subjectId, courseId) => {
  const response = await apiService.fetchData(
    `/recruiter/job-tests-questions?subjectId=${subjectId}&courseId=${courseId}`
  );
  return response.data;
};

export const fetchTestQuestionDetails = async (questionId) => {
  const response = await apiService.fetchData(
    `/recruiter/job-tests-questions/${questionId}/show`
  );
  return response.data;
};

export const editTestQuestion = (questionId, data) => {
  return apiService.putData(`recruiter/job-tests-questions/${questionId}/update`, data);
};

export const createTestQuestion = (data) => {
  return apiService.postData(`recruiter/job-tests-questions/store`, data);
};

export const deleteTestQuestion = (testQuestionId) => {
  return apiService.deleteData(
    `/recruiter/job-tests-questions/${testQuestionId}/delete`
  );
};

//Test APIs
export const fetchTestDetails = async (testId) => {
  const response = await apiService.fetchData(`/recruiter/job-tests/${testId}`);
  return response.data;
};

export const fetchJobTests = async (subjectId) => {
  const response = await apiService.fetchData(
    `/recruiter/job-tests?subjectId=${subjectId}`
  );
  return response.data;
};

// export const fetchJobListForRecruiter = async (recruiterId) => {
//   const response = await apiService.fetchData(`/recruiter/jobs?recruiterId=${recruiterId}`);
//   console.log("Recruiter response", response.data);
//   return response.data;
// };
export const fetchTestResult = async (testId) => {
  const response = await apiService.fetchData(
    `/recruiter/job-tests/${testId}/results`
  );
  return response.data;
};

export const fetchTestQuestionsByIds = async (courseId) => {
  const response = await apiService.fetchData(
    `/minimal/test-questions?courseId=${courseId}`
  );
  return response.data;
};

export const fetchTestQuestionsBySubjectIds = async (subjectIds) => {
  const idsArray = Array.isArray(subjectIds) ? subjectIds : [subjectIds];
  const ids = idsArray.join(',');

  // const ids = classIds.join(',');
  const response = await apiService.fetchData(`/minimal/test-questions-by-subject-id?subjectIds=${ids}`);
  console.log("call from api", response.data)
  return response.data;
};

export const createTest = (data) => {
  return apiService.postData(`recruiter/job-tests/store`, data);
};

export const deleteTest = (testId) => {
  return apiService.deleteData(`/recruiter/job-tests/${testId}/delete`);
};

export const updateTest = async (testId, data) => {
  return apiService.putData(`/recruiter/job-tests/${testId}/update`, data);
};

export const checkTestAvailability = async (courseId) => {
  const response = await apiService.fetchData(
    `/recruiter/job-tests/availability/${courseId}`
  );
  return response.data;
};
