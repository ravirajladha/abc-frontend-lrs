import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import { ContentFormWrapper, ContentHeader } from '@/components/common';
import { Form, SelectQuestion } from '@/components/admin/assessment';

import { fetchClasses, fetchSubjects } from '@/api/dropdown';
import {
  createAssessment,
  fetchAssessmentQuestionsCount,
  fetchAssessmentQuestionsByIds,
} from '@/api/admin';

function Create() {
  const navigate = useNavigate();

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
      selectedClass: value,
      selectedSubject: '',
      noOfQuestions: 0,
      assessmentName: '',
      duration: '',
      passingPercentage: '',
      description: '',
    });

    fetchSubjectsDropdownData(value);
  };

  const handleSubjectChange = (event) => {
    setFormData((prevData) => ({ ...prevData, selectedSubject }));
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      selectedSubject: '',
    }));

    const selectedSubject = event.target.value;
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
    setFormData((prevData) => ({ ...prevData, selectedSubject }));
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
        noOfQuestions: selectedQuestions.length,
        selectedQuestions: selectedQuestions,
      };
      const response = await createAssessment(updatedFormData);
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

export default Create;
