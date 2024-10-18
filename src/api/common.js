import { apiService } from '@/utils/services';

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
export const fetchSubjects = async () => {
  const response = await apiService.fetchData('/admin/subjects');
  return response.data.subjects;
};

export const fetchSections = async () => {
  const response = await apiService.fetchData('/sections');
  return response.data.sections;
};

export const getSubjectData = async (subjectId) => {
  const response = await apiService.fetchData(`/admin/subjects/${subjectId}`);
  return response.data.subject;
};

export const fetchSubjectResult = async (subjectId) => {
  const response = await apiService.fetchData(`/admin/subjects/${subjectId}/results`);
  return response.data;
};


export const fetchCourses = async (subjectId) => {
  const response = await apiService.fetchData(`/admin/subjects/${subjectId}/courses`);
  console.log("response from getting all courses", response.data); 
  return response.data;
};

export const fetchCourseResult = async (courseId) => {
  const response = await apiService.fetchData(`/admin/courses/${courseId}/results`);
  return response.data;
};

export const fetchCourseData = async (courseId) => {
  const response = await apiService.fetchData(`/admin/courses/${courseId}`);
  return response.data.course;
};

export const fetchChapters = async (subjectId, courseId) => {
  const response = await apiService.fetchData(
    `/admin/subjects/${subjectId}/courses/${courseId}/chapters`
  );
  return response.data;
};

export const fetchChapterData = async (chapterId) => {
  const response = await apiService.fetchData(
    `/admin/chapters/${chapterId}`
  );
  return response.data;
};
export const fetchSelectedActiveElabs = async (subjectId, courseId=null) => {
  console.log(`Fetching ${subjectId} ${courseId}`);
  const response = await apiService.fetchData(
    `/admin/elabs/get-selected-active-elabs/${subjectId}/${courseId !== null ? courseId : ''}`
  );
  console.log(response.data, "response data");
  return response.data;
};

export const fetchActiveElabsForSubject = async (subjectId) => {
  console.log(`Fetching ${subjectId}`);
  const response = await apiService.fetchData(
    `/admin/elabs/get-active-elabs-for-subject/${subjectId}`
  );
  console.log(response.data, "response data");
  return response.data;
};


export const fetchActiveElabs = async () => {
  const response = await apiService.fetchData('/admin/elabs/get-active-elabs');
  // console.log(response.data.elabs);
  return response.data.elabs;
};
export const getJobTestResultOfStudent = async (applicationId) => {
console.log("appId: " + applicationId);
  const response = await apiService.fetchData(`/admin/jobs/get-job-test-results?applicationId=${applicationId}`);
  console.log(response.data);
  return response.data;
};

// export const fetchStudentResultsBySubject = async (studentId, subjectId) => {
//   const response = await apiService.fetchData(
//     `/student/get-subject-results?studentId=${studentId}&subjectId=${subjectId}`
//   );
//   return response.data;
// };

export const fetchTrainersDropdown = async () => {
  const response = await apiService.fetchData(`/minimal/trainers`);
  return response.data.trainers;
};

export const fetchCollegesDropdown = async () => {
  const response = await apiService.fetchData(`/minimal/colleges`);
  return response.data.colleges;
};