import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import { ContentFormWrapper, ContentHeader } from '@/components/common';
import {
  EditAssessmentForm as Form,
  SelectQuestion,
} from '@/components/admin/assessment';

import { fetchCourses, fetchSubjects } from '@/api/dropdown';
import {
  updateAssessment,
  fetchSingleAssessment,
  fetchAssessmentQuestionsCount,
  fetchAssessmentQuestionsByIds,
} from '@/api/admin';

function Edit() {
  const navigate = useNavigate();
  const { assessmentId } = useParams();

  const [loading, setLoading] = useState([]);
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
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      selectedSubject: '',
    }));
    setFormData({
      ...formData,
      selectedSubject: value,
      selectedCourse: '',
    });
    fetchCoursesDropdownData(value);
  };

  const fetchQuestionsCount = (selectedCourse) => {
    fetchAssessmentQuestionsCount(selectedCourse)
      .then((data) => {
        setFormData((prevData) => ({
          ...prevData,
          noOfQuestions: data.assessmentQuestions,
        }));
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleCourseChange = (event) => {
    const selectedCourse = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      selectedCourse: selectedCourse,
    }));
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      selectedSubject: '',
    }));
    fetchQuestionsCount(selectedCourse);
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const verifyForm = async (event) => {
    event.preventDefault();
    const isVerified =
      formData.selectedCourse &&
      formData.selectedSubject &&
      formData.assessmentName;
    setIsFormVerified(isVerified);
  };

  const fetchAssessment = useCallback(async () => {
    try {
      const response = await fetchSingleAssessment(assessmentId);
      const data = response.assessment;
      if (data) {
        fetchCoursesDropdownData(data.subject_id);
        fetchQuestionsCount(data.course_id);
        const arr = data?.question_ids?.split(',').map(Number);
        setSelectedQuestions(arr);
        setFormData({
          selectedSubject: data.subject_id,
          selectedCourse: data.course_id,
          assessmentName: data.title,
          selectedQuestions: data.question_ids,
          duration: data.time_limit,
          passingPercentage: data.passing_percentage,
          description: data.description,
        });
      }
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }, [assessmentId, fetchSubjectDropdownData]);

  useEffect(() => {
    fetchAssessment();
  }, [fetchAssessment]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAssessmentQuestionsByIds(
          formData.selectedSubject,
          formData.selectedCourse
        );
        setAssessmentQuestions(data.assessment_questions);
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
    try {
      const updatedFormData = {
        ...formData,
        selectedQuestions: selectedQuestions,
      };
      const response = await updateAssessment(assessmentId, updatedFormData);
      toast.success(response.message);
      setFormData({
        ...formData,
        selectedSubject: '',
        selectedCourse: '',
        noOfQuestions: '',
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
      <ContentHeader title="Edit" subtitle="Assessment" />
      <ContentFormWrapper formTitle="">
        {isFormVerified ? (
          <>
            <SelectQuestion
              questions={assessmentQuestions || []}
              isSubmitting={isSubmitting}
              selectedQuestions={selectedQuestions || ''}
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
            loading={loading}
            subjects={subjects}
            courses={courses}
            formData={formData}
            validationErrors={validationErrors}
            setSubjects={setSubjects}
            setCourses={setCourses}
            setFormData={setFormData}
            setValidationErrors={setValidationErrors}
            fetchSubjectDropdownData={fetchSubjectDropdownData}
            handleInputChange={handleInputChange}
            handleSubjectChange={handleSubjectChange}
            handleCourseChange={handleCourseChange}
            handleAction={verifyForm}
          />
        )}
      </ContentFormWrapper>
    </div>
  );
}

export default Edit;
