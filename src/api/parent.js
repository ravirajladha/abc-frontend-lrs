import { apiService } from '@/utils/services';

export const fetchDashboard = async (studentId) => {
  const response = await apiService.fetchData(
    `/student/dashboard?studentId=${studentId}`
  );
  return response.data;
};

export const fetchParentInfo = async (parentId) => {
  const response = await apiService.fetchData(`/parent/${parentId}`);
  return response.data;
};

export const fetchChildren = async (parentId) => {
  const response = await apiService.fetchData(
    `/parent/get-children?parentId=${parentId}`
  );
  return response.data;
};

export const fetchStudentInfo = async (studentId) => {
  const response = await apiService.fetchData(
    `/parent/get-student-info?studentId=${studentId}`
  );
  return response.data;
};

export const updateSettings = async (parentId, data) => {
  const response = await apiService.putData(`/parent/${parentId}/update`, data);
  return response;
};

export const fetchReportCard = async (studentId, classId, sectionId) => {
  const response = await apiService.fetchData(
    `/parent/get-report-card?studentId=${studentId}&classId=${classId}&sectionId=${sectionId}`
  );
  return response.data;
};


// Applications
export const fetchApplications = async (parentPhone) => {
  const response = await apiService.fetchData(`/parent/applications/${parentPhone}`);
  return response.data;
};


export const createStudent = async (data) => {
  const response = await apiService.postData(`/parent/students/store`, data);
  return response.data;
};

export const fetchFeeForSubject = async (classId) => {
  const response = await apiService.fetchData(`/parent/get-fee/${subjectId}`);
  return response.data;
};