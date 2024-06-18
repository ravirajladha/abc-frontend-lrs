import { apiService } from '@/utils/services';

export const fetchClasses = () => {
  return apiService
    .fetchData('/minimal/classes')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const fetchSubjects = (classId) => {
  return apiService
    .fetchData(`/minimal/classes/${classId}/subjects`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const fetchAssessments = (subjectId) => {
  return apiService
    .fetchData(`/minimal/assessments?subjectId=${subjectId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const fetchEbooks = (subjectId) => {
  return apiService
    .fetchData(`/minimal/ebooks?subjectId=${subjectId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const fetchEbookModules = (ebookId) => {
  return apiService
    .fetchData(`/minimal/ebook-modules?ebookId=${ebookId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const fetchEbookSections = (ebookModuleId) => {
  return apiService
    .fetchData(`/minimal/ebook-sections?ebookModuleId=${ebookModuleId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const fetchElabs = (subjectId) => {
  return apiService
    .fetchData(`/minimal/elabs?subjectId=${subjectId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};


export const fetchChapters = async (subjectId) => {
  try {
    const response = await apiService
      .fetchData(`/subjects/${subjectId}/chapters`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const fetchProjectReports = async (subjectId) => {
  try {
    const response = await apiService
      .fetchData(`/minimal/project-reports?subjectId=${subjectId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCaseStudies = async (subjectId) => {
  try {
    const response = await apiService
      .fetchData(`/minimal/case-studies?subjectId=${subjectId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};