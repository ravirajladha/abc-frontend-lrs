import { apiService } from '@/utils/services';

export const fetchSubjects = () => {
  return apiService
    .fetchData('/minimal/subjects')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const fetchCourses = (subjectId) => {
  return apiService
    .fetchData(`/minimal/subjects/${subjectId}/courses`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
export const fetchCoursesForTest = (subjectId) => {
  return apiService
    .fetchData(`/minimal/tests/subjects/${subjectId}/courses`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const fetchAssessments = (courseId) => {
  return apiService
    .fetchData(`/minimal/assessments?courseId=${courseId}`)
    .then((response) => {
      console.log("fetching assessment data", courseId, response.data)
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const fetchEbooks = (courseId) => {
  return apiService
    .fetchData(`/minimal/ebooks?courseId=${courseId}`)
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

export const fetchElabs = (courseId) => {
  return apiService
    .fetchData(`/minimal/elabs?courseId=${courseId}`)
    .then((response) => {
      console.log("elab response", response.data);
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};


export const fetchChapters = async (courseId) => {
  try {
    const response = await apiService
      .fetchData(`/courses/${courseId}/chapters`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const fetchProjectReports = async (courseId) => {
  try {
    const response = await apiService
      .fetchData(`/minimal/project-reports?courseId=${courseId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCaseStudies = async (courseId) => {
  try {
    const response = await apiService
      .fetchData(`/minimal/case-studies?courseId=${courseId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};