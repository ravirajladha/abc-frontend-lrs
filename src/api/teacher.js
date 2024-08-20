import { apiService } from '@/utils/services';

export const fetchDashboard = async () => {
  const response = await apiService.fetchData(`/teacher/dashboard`);
  return response.data;
};

export const updateSettings = async (teacherId, data) => {
  const response = await apiService.putData(`/teacher/${teacherId}/update`, data);
  return response;
};

export const fetchStudents = async () => {
  const response = await apiService.fetchData(`/teacher/get-students`);
  return response.data;
};

export const fetchResults = async () => {
  const response = await apiService.fetchData(`/teacher/results`);
  return response.data;
};

export const fetchQnA = async (teacherId, studentId) => {
  const response = await apiService.fetchData(
    `teacher/qna/${teacherId}/${studentId}`
  );
  return response.data;
};

export const storeQnA = async (data) => {
  const response = await apiService.postData(`teacher/qna`, data);
  return response.data;
};

export const fetchAssessmentResults = async (chapterId,studentId) => {
  const response = await apiService.fetchData(
    `/teacher/chapter/assessment-results?studentId=${studentId}&chapterId=${chapterId}`
  );
  return response.data;
};

export const updateChapterLockStatus = async (chapterId,status) => {
  const response = await apiService.fetchData(
    `/teacher/chapter/${chapterId}/update-lock-status?status=${status}`
  );
  return response.data;
};

export const fetchTeacherSubjects = async () => {
  const response = await apiService.fetchData(
    `/teacher/get-subjects`
  );
  return response.data;
};

export const fetchTeacherCourses= async (subjectId) => {
  const response = await apiService.fetchData(
    `/teacher/get-courses/${subjectId}`
  );
  return response.data;
};

export const fetchUnrepliedQnACount = async (teacherId, studentId) => {
  const response = await apiService.fetchData(
    `teacher/qna/get-unreplied-count`
  );
  return response.data;
};