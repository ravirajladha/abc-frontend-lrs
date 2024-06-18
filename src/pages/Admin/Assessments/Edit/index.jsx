import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import { ContentFormWrapper, ContentHeader } from '@/components/common';
import {
  EditAssessmentForm as Form,
  SelectQuestion,
} from '@/components/admin/assessment';

import { fetchClasses, fetchSubjects } from '@/api/dropdown';
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
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [assessmentQuestions, setAssessmentQuestions] = useState([]);
  const [formData, setFormData] = useState({
    selectedClass: '',
    selectedSubject: '',
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

  const fetchClassDropdownData = useCallback(() => {
    fetchClasses()
      .then((data) => {
        setClasses(data.classes);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  useEffect(() => {
    fetchClassDropdownData();
  }, [fetchClassDropdownData]);

  const fetchSubjectsDropdownData = useCallback((classId) => {
    fetchSubjects(classId)
      .then((data) => {
        setSubjects(data.subjects);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  const handleClassChange = ({ target: { value } }) => {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      selectedClass: '',
    }));
    setFormData({
      ...formData,
      selectedClass: value,
      selectedSubject: '',
    });
    fetchSubjectsDropdownData(value);
  };

  const fetchQuestionsCount = (selectedSubject) => {
    fetchAssessmentQuestionsCount(selectedSubject)
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

  const handleSubjectChange = (event) => {
    const selectedSubject = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      selectedSubject: selectedSubject,
    }));
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      selectedSubject: '',
    }));

    fetchQuestionsCount(selectedSubject);
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const verifyForm = async (event) => {
    event.preventDefault();
    const isVerified =
      formData.selectedClass &&
      formData.selectedSubject &&
      formData.assessmentName;
    setIsFormVerified(isVerified);
  };

  const fetchAssessment = useCallback(async () => {
    try {
      const response = await fetchSingleAssessment(assessmentId);
      const data = response.assessment;
      if (data) {
        fetchSubjectsDropdownData(data.class_id);
        fetchQuestionsCount(data.subject_id);
        const arr = data?.question_ids?.split(',').map(Number);
        setSelectedQuestions(arr);
        setFormData({
          selectedClass: data.class_id,
          selectedSubject: data.subject_id,
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
  }, [assessmentId, fetchSubjectsDropdownData]);

  useEffect(() => {
    fetchAssessment();
  }, [fetchAssessment]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAssessmentQuestionsByIds(
          formData.selectedClass,
          formData.selectedSubject
        );
        setAssessmentQuestions(data.assessment_questions);
      } catch (error) {
        toast.error(error.message);
      }
    };

    if (formData.selectedClass && formData.selectedSubject) {
      fetchData();
    }
  }, [isFormVerified, formData.selectedClass, formData.selectedSubject]);

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
        selectedClass: '',
        selectedSubject: '',
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
            classes={classes}
            subjects={subjects}
            formData={formData}
            validationErrors={validationErrors}
            setClasses={setClasses}
            setSubjects={setSubjects}
            setFormData={setFormData}
            setValidationErrors={setValidationErrors}
            fetchSubjectsDropdownData={fetchSubjectsDropdownData}
            handleInputChange={handleInputChange}
            handleClassChange={handleClassChange}
            handleSubjectChange={handleSubjectChange}
            handleAction={verifyForm}
          />
        )}
      </ContentFormWrapper>
    </div>
  );
}

export default Edit;
