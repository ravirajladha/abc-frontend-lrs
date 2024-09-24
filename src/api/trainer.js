import { apiService } from '@/utils/services';

export const fetchDashboard = async () => {
  const response = await apiService.fetchData(`/trainer/dashboard`);
  return response.data;
};

export const updateSettings = async (trainerId, data) => {
  const response = await apiService.putData(`/trainer/${trainerId}/update`, data);
  return response;
};

export const fetchStudents = async () => {
  const response = await apiService.fetchData(`/trainer/get-students`);
  return response.data;
};

export const fetchResults = async () => {
  const response = await apiService.fetchData(`/trainer/results`);
  return response.data;
};

export const fetchQnA = async (trainerId, studentId) => {
  const response = await apiService.fetchData(
    `trainer/qna/${trainerId}/${studentId}`
  );
  return response.data;
};

export const storeQnA = async (data) => {
  const response = await apiService.postData(`trainer/qna`, data);
  return response.data;
};

export const fetchAssessmentResults = async (chapterId,studentId) => {
  const response = await apiService.fetchData(
    `/trainer/chapter/assessment-results?studentId=${studentId}&chapterId=${chapterId}`
  );
  return response.data;
};

export const updateChapterLockStatus = async (chapterId,status) => {
  const response = await apiService.fetchData(
    `/trainer/chapter/${chapterId}/update-lock-status?status=${status}`
  );
  return response.data;
};

export const fetchTrainerSubjects = async () => {
  const response = await apiService.fetchData(
    `/trainer/get-subjects`
  );
  return response.data;
};

export const fetchTrainerCourses= async (subjectId) => {
  const response = await apiService.fetchData(
    `/trainer/get-courses/${subjectId}`
  );
  return response.data;
};

export const fetchUnrepliedQnACount = async (trainerId, studentId) => {
  const response = await apiService.fetchData(
    `trainer/qna/get-unreplied-count`
  );
  return response.data;
};