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
  const response = await apiService.fetchData(`/teacher/get-students`);
  return response.data;
};

//Test Questions APIs
export const fetchTestQuestions = async (classId, subjectId) => {
  const response = await apiService.fetchData(
    `/recruiter/job-tests-questions?classId=${classId}&subjectId=${subjectId}`
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
//Term Test APIs

export const fetchTestDetails = async (testId) => {
  const response = await apiService.fetchData(`/recruiter/job-tests/${testId}`);
  return response.data;
};

export const fetchJobTests = async (classId) => {
  const response = await apiService.fetchData(
    `/recruiter/job-tests?classId=${classId}`
  );
  return response.data;
};

// export const fetchJobListForRecruiter = async (recruiterId) => {
//   const response = await apiService.fetchData(`/recruiter/jobs?recruiterId=${recruiterId}`);
//   console.log("Recruiter response", response.data);
//   return response.data;
// };
export const fetchTermTestResult = async (testId) => {
  const response = await apiService.fetchData(
    `/recruiter/job-tests/${testId}/results`
  );
  return response.data;
};

export const fetchTermTestQuestionsByIds = async (subjectId) => {
  const response = await apiService.fetchData(
    `/minimal/term-test-questions?subjectId=${subjectId}`
  );
  return response.data;
};

export const fetchTermTestQuestionsByClassIds = async (classIds) => {
  const idsArray = Array.isArray(classIds) ? classIds : [classIds];
  const ids = idsArray.join(',');

  // const ids = classIds.join(',');
  const response = await apiService.fetchData(`/minimal/term-test-questions-by-class-id?classIds=${ids}`);
  console.log("call from api", response.data)
  return response.data;
};

export const createTermTest = (data) => {
  return apiService.postData(`recruiter/job-tests/store`, data);
};

export const deleteTermTest = (testId) => {
  return apiService.deleteData(`/recruiter/job-tests/${testId}/delete`);
};

export const updateTermTest = async (testId, data) => {
  return apiService.putData(`/recruiter/job-tests/${testId}/update`, data);
};

export const checkTermTestAvailability = async (subjectId) => {
  const response = await apiService.fetchData(
    `/recruiter/job-tests/availability/${subjectId}`
  );
  return response.data;
};
