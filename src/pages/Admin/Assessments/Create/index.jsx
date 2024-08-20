import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import { ContentFormWrapper, ContentHeader } from '@/components/common';
import { Form, SelectQuestion } from '@/components/admin/assessment';

import { fetchSubjects, fetchCourses } from '@/api/dropdown';
import {
  createAssessment,
  fetchAssessmentQuestionsCount,
  fetchAssessmentQuestionsByIds,
} from '@/api/admin';

function Create() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [assessmentQuestions, setAssessmentQuestions] = useState([]);
  const [formData, setFormData] = useState({
    selectedSubject: '',
    selectedCourse: '',
    noOfQuestions: 0,
    assessmentName: '',
    selectedQuestions: '',
    duration: '',
    passingPercentage: '',
    description: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isFormVerified, setIsFormVerified] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const fetchSubjectDropdownData = useCallback(() => {
    fetchSubjects()
      .then((data) => {
        setSubjects(data.subjects);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  useEffect(() => {
    fetchSubjectDropdownData();
  }, [fetchSubjectDropdownData]);

  const fetchCoursesDropdownData = useCallback((subjectId) => {
    fetchCourses(subjectId)
      .then((data) => {
        setCourses(data.courses);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  const handleSubjectChange = ({ target: { value } }) => {
    console.log("Selected Subject:", value); 
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      selectedSubject: '',
    }));

    setFormData({
      selectedSubject: value,
      selectedCourse: '',
      noOfQuestions: 0,
      assessmentName: '',
      duration: '',
      passingPercentage: '',
      description: '',
    });

    fetchCoursesDropdownData(value);
  };

  const handleCourseChange = (event) => {
    const selectedCourse = event.target.value;  // Get the selected course value
    console.log("Selected Course:", selectedCourse); 
    setFormData((prevData) => ({ ...prevData, selectedCourse }));

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      selectedCourse: '',
    }));

    fetchAssessmentQuestionsCount(selectedCourse)
      .then((data) => {
     
        console.log("Data from fetchAssessmentQuestionsCount:", data);
        console.log("Assessment Questions:", data.assessmentQuestions);

        setFormData((prevData) => ({
          ...prevData,
          noOfQuestions: data.assessmentQuestions,
        }));
      })
      .catch((error) => {
        console.error("Error fetching question count:", error.message);
        toast.error(error.message);
      });
  };



  const handleInputChange = ({ target: { name, value } }) => {
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const verifyForm = async (event) => {
    event.preventDefault();
    const isVerified =
    formData.selectedSubject &&
    formData.selectedCourse &&
    formData.assessmentName;
    setIsFormVerified(isVerified);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching questions for Subject:", formData.selectedSubject);
        console.log("Fetching questions for Course:", formData.selectedCourse);

        const data = await fetchAssessmentQuestionsByIds(
          formData.selectedSubject,
          formData.selectedCourse
        );

        console.log("Fetched Questions Data:", data);
        setAssessmentQuestions(data.assessment_questions);
        console.log("Updated assessmentQuestions State:", data.assessment_questions);
      } catch (error) {
        toast.error(error.message);
      }
    };

    if (formData.selectedCourse && formData.selectedSubject) {
      fetchData();
    }
  }, [isFormVerified, formData.selectedCourse, formData.selectedSubject]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    console.log("Submitting Form Data:", formData);

    try {
      const updatedFormData = {
        ...formData,
        noOfQuestions: parseInt(selectedQuestions, 10), 

        selectedQuestions: selectedQuestions,
      };
      const response = await createAssessment(updatedFormData);

      console.log("Submission Response:", response); 

      toast.success(response.message);
      setFormData({
        ...formData,
        selectedCourse: '',
        selectedSubject: '',
        noOfQuestions: 0,
        assessmentName: '',
        selectedQuestions: '',
        duration: '',
        passingPercentage: '',
        description: '',
      });
      navigate('/admin/assessments');
    } catch (error) {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      }
      toast.error(error.message);
    }

    setIsSubmitting(false);
  };

  return (
    <div>
      <ContentHeader title="Create New Assessment" />
      <ContentFormWrapper formTitle="">
        {isFormVerified ? (
          <>
            <SelectQuestion
              questions={assessmentQuestions || []}
              isSubmitting={isSubmitting}
              selectedQuestions={selectedQuestions}
              setSelectedQuestions={setSelectedQuestions}
            />
            <div className="form-group">
              <button
                type="button"
                className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0 float-right"
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? (
                  <Spinner
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="mr-2"
                  />
                ) : (
                  <>
                    <i className="feather-save mr-2"></i> Submit
                  </>
                )}
              </button>
            </div>
          </>
        ) : (
          <Form
            courses={courses}
            subjects={subjects}
            formData={formData}
            validationErrors={validationErrors}
            selectedCourse={formData.selectedCourse} 
            setSubjects={setSubjects}
            setFormData={setFormData}
            setValidationErrors={setValidationErrors}
            fetchCoursesDropdownData={fetchCoursesDropdownData}
            handleInputChange={handleInputChange}
            handleCourseChange={handleCourseChange}
            handleSubjectChange={handleSubjectChange}
            handleAction={verifyForm}
          />
        )}
      </ContentFormWrapper>
    </div>
  );
}

export default Create;
