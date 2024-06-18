import { apiService } from '@/utils/services';

// new updated
export const fetchSubjects = async () => {
  const response = await apiService.fetchData('/subjects');
  return response.data.subjects;
};

export const fetchCourses = async (subjectId) => {
  const response = await apiService.fetchData(`/subjects/${subjectId}/courses`);
  return response.data;
};
export const fetchSchools = async () => {
  const response = await apiService.fetchData('/admin/schools');
  console.log(response.data.schools, "response data")
  return response.data.schools;
};
export const fetchPublicSchools = async () => {
  const response = await apiService.fetchData('/admin/public-schools');
  console.log(response.data.schools, "response data")
  return response.data.schools;
};
export const fetchPrivateSchools = async () => {
  const response = await apiService.fetchData('/admin/private-schools');
  console.log(response.data.schools, "response data")
  return response.data.schools;
};

// temporary
export const fetchClasses = async () => {

};
export const fetchSections = async () => {
  const response = await apiService.fetchData('/sections');
  return response.data.sections;
};

export const getClassData = async (classId) => {
  const response = await apiService.fetchData(`/classes/${classId}`);
  return response.data.class;
};

export const fetchClassResult = async (classId, term) => {
  const response = await apiService.fetchData(`/classes/${classId}/results?term=${term}`);
  return response.data;
};




export const fetchSubjectResult = async (subjectId, term) => {
  const response = await apiService.fetchData(`/subjects/${subjectId}/results?term=${term}`);
  return response.data;
};

export const fetchSubjectData = async (subjectId) => {
  const response = await apiService.fetchData(`/subjects/${subjectId}`);
  return response.data.subject;
};

export const fetchChapters = async (classId, subjectId) => {
  const response = await apiService.fetchData(
    `/classes/${classId}/subjects/${subjectId}/chapters`
  );
  return response.data;
};

export const fetchChapterData = async (classId, subjectId, chapterId) => {
  const response = await apiService.fetchData(
    `/chapters/${chapterId}`
  );
  return response.data;
};
export const fetchSelectedActiveElabs = async (classId, subjectId=null) => {
  console.log(`Fetching ${classId} ${subjectId}`);
  const response = await apiService.fetchData(
    `/admin/elabs/get-selected-active-elabs/${classId}/${subjectId !== null ? subjectId : ''}`
  );
  console.log(response.data, "response data");
  return response.data;
};
export const fetchSelectedActiveElabsWithoutSubjectId = async (classId) => {
  console.log(`Fetching ${classId}`);
  const response = await apiService.fetchData(
    `/admin/elabs/get-selected-active-elabs-without-subject/${classId}`
  );
  console.log(response.data, "response data");
  return response.data;
};

export const fetchActiveElabs = async () => {
  const response = await apiService.fetchData('/admin/elabs/get-active-elabs');
  // console.log(response.data.elabs);
  return response.data.elabs;
};

