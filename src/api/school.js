//School APIs
import { apiService } from '@/utils/services';

export const fetchDashboard = async () => {
  const response = await apiService.fetchData(`/school/dashboard`);
  return response.data;
};

export const updateSettings = async (schoolId, data) => {
  const response = await apiService.putData(`/school/${schoolId}/update`, data);
  return response.data;
};

export const fetchStudents = async () => {
  const response = await apiService.fetchData(`/school/students`);
  return response.data;
};
export const fetchStudentsByClassAndSection = async (classId,sectionId) => {
  const response = await apiService.fetchData(`/school/class/students/${classId}/${sectionId}`);
  return response.data;
};

export const fetchStudent = async (studentId) => {
  const response = await apiService.fetchData(`/school/students/${studentId}`);
  return response.data;
};

export const fetchStudentFromStudents= async (studentId) => {
  console.log( "response from api route1",studentId)

  const response = await apiService.fetchData(`/school/students/get-student-details/${studentId}`);
  console.log(response.data, "response from api route",studentId)
  return response.data;
};
// Applications
export const fetchApplications = async (status) => {
  const response = await apiService.fetchData(`/school/applications/${status}`);
  return response.data;
};
export const updateApplicationStatus = async (data) => {
  const response = await apiService.postData(
    `/school/applications/update-status`,
    data
  );
  return response.data;
};
export const updateWhatsappStatus = async (data) => {
  const response = await apiService.postData(
    `/school/applications/update-whatsapp-status`,
    data
  );
  return response.data;
};
export const storeApplicationRemark = async (data) => {
  const response = await apiService.postData(
    `/school/applications/store-application-remark`,
    data
  );
  return response.data;
};
export const fetchApplicationById = async (applicationId) => {
  const response = await apiService.fetchData(
    `/school/applications/get-application/${applicationId}`
  );
  return response.data;
};

export const sendWhatsappMessage = async (contact, messageType) => {
  const response = await apiService.postData(
    `/school/applications/send-whatsapp-message/${contact}/${messageType}`
  );
  return response.data;
};

export const sendWhatsappBulkMessage = async (messageType, data) => {
  const response = await apiService.postData(
    `/school/applications/send-bulk-whatsapp-message/${messageType}`,data
  );
  return response.data;
};

// Old Applications
export const fetchOldApplications = async (status) => {
  const response = await apiService.fetchData(
    `/school/old-applications/${status}`
  );
  return response.data;
};
export const updateOldApplicationStatus = async (data) => {
  const response = await apiService.postData(
    `/school/old-applications/update-status`,
    data
  );
  return response.data;
};
export const updateOldApplicationWhatsappStatus = async (data) => {
  const response = await apiService.postData(
    `/school/old-applications/update-whatsapp-status`,
    data
  );
  return response.data;
};
export const storeOldApplicationRemark = async (data) => {
  const response = await apiService.postData(
    `/school/old-applications/store-application-remark`,
    data
  );
  return response.data;
};
export const fetchOldApplicationById = async (applicationId) => {
  const response = await apiService.fetchData(
    `/school/old-applications/get-application/${applicationId}`
  );
  return response.data;
};
export const uploadOldApplication = async (data) => {
  const response = await apiService.postData(
    `/school/old-applications/upload`,
    data,
    { method: 'POST' }
  );
  return response.data;
};
export const sendOldWhatsappBulkMessage = async (messageType, data) => {
  const response = await apiService.postData(
    `/school/old-applications/send-bulk-whatsapp-message/${messageType}`,data
  );
  return response.data;
};



export const createStudent = async (data) => {
  const response = await apiService.postData(`/school/students/store`, data);
  return response.data;
};

export const editStudent = async (studentId, data) => {
  return apiService
    .postData(`/school/students/${studentId}/update`, data, { method: 'POST' })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

export const deleteStudent = (studentId) => {
  return apiService.deleteData(`/school/students/${studentId}/delete`);
};

export const resetStudentPassword = async (studentId, data) => {
  return apiService.putData(`/school/students/${studentId}/reset`, data);
};

//Teacher APIs

export const fetchTeachers = async () => {
  const response = await apiService.fetchData('/school/teachers');
  return response.data;
};

export const createTeacher = async (data) => {
  const response = await apiService.postData(`/school/teachers/store`, data);
  return response.data;
};

export const fetchTeacher = async (teacherId) => {
  const response = await apiService.fetchData(`/school/teachers/${teacherId}`);
  return response.data;
};

export const fetchTeacherClassSubject = async (teacherId) => {
  const response = await apiService.fetchData(
    `/school/teachers/${teacherId}/assign`
  );
  return response.data;
};

export const editTeacher = async (teacherId, data) => {
  return apiService
    .postData(`/school/teachers/${teacherId}/update`, data, { method: 'POST' })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

export const resetTeacherPassword = async (teacherId, data) => {
  return apiService.putData(`/school/teachers/${teacherId}/reset`, data);
};

export const assignTeacher = async (teacherId, data) => {
  const response = await apiService.postData(
    `/school/teachers/${teacherId}/assign`,
    data
  );
  return response.data;
};

export const deleteTeacher = (teacherId) => {
  return apiService.deleteData(`/school/teachers/${teacherId}/delete`);
};

//Result APIs

export const fetchResults = async (selectedClass,selectedSection, selectedTerm) => {
  const response = await apiService.fetchData(
    `/school/results?classId=${selectedClass}&sectionId=${selectedSection}&term=${selectedTerm}`
  );
  return response.data;
};

export const fetchClassResult = async (classId) => {
  const response = await apiService.fetchData(
    `/school/classes/${classId}/results`
  );
  return response.data;
};

export const fetchSubjectResult = async (subjectId) => {
  const response = await apiService.fetchData(
    `/school/subject/${subjectId}/results`
  );
  return response.data;
};

export const fetchAssessmentResults = async (chapterId,studentId) => {
  const response = await apiService.fetchData(
    `/school/chapter/assessment-results?studentId=${studentId}&chapterId=${chapterId}`
  );
  return response.data;
};