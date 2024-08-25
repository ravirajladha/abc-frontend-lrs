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
export const fetchStudentsBySubjectAndSection = async (subjectId,sectionId) => {
  const response = await apiService.fetchData(`/school/class/students/${subjectId}/${sectionId}`);
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

//Trainer APIs

export const fetchTrainers = async () => {
  const response = await apiService.fetchData('/internship-admin/trainers');
  return response.data;
};

export const createTrainer = async (data) => {
  const response = await apiService.postData(`/internship-admin/trainers/store`, data);
  return response.data;
};

export const fetchTrainer = async (trainerId) => {
  const response = await apiService.fetchData(`/internship-admin/trainers/${trainerId}`);
  return response.data;
};

export const fetchTrainerSubjectCourse = async (trainerId) => {
  const response = await apiService.fetchData(
    `/internship-admin/trainers/${trainerId}/assign`
  );
  return response.data;
};

export const editTrainer = async (trainerId, data) => {
  return apiService
    .postData(`/internship-admin/trainers/${trainerId}/update`, data, { method: 'POST' })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

export const resetTrainerPassword = async (trainerId, data) => {
  return apiService.putData(`/internship-admin/trainers/${trainerId}/reset`, data);
};

export const assignTrainer = async (trainerId, data) => {
  const response = await apiService.postData(
    `/internship-admin/trainers/${trainerId}/assign`,
    data
  );
  return response.data;
};

export const deleteTrainer = (trainerId) => {
  return apiService.deleteData(`/internship-admin/trainers/${trainerId}/delete`);
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