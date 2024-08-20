import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { TextEditor } from '@/components/common';



import {
  ContentFallback,
  ContentFormWrapper,
  ContentHeader,
  ContentLoader
} from '@/components/common';
import { SelectQuestion } from '@/components/admin/test';

import { fetchSubjects, fetchCoursesForTest } from '@/api/dropdown';

import {
  updateTest,
  fetchTestQuestionsByIds,
  fetchTestDetails
} from '@/api/admin';
import { SelectInput, DisabledSelectInput } from '@/components/common/form';

function Edit({ title }) {
  const navigate = useNavigate();
  const { testId } = useParams();

  const [loading, setLoading] = useState([]);
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [testQuestions, setTestQuestions] = useState([]);
  const [formData, setFormData] = useState({
    selectedSubject: '',
    selectedCourse: '',
    numberOfQuestions: '',
    testTitle: '',
    startTime: '',
    endTime: '',
    duration: '',
    description: '',
    instruction: '',
    status: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isFormVerified, setIsFormVerified] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchSubjectsDropdownData = useCallback(() => {
    fetchSubjects()
      .then((data) => {
        setSubjects(data.subjects);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  useEffect(() => {
    fetchSubjectsDropdownData();
  }, [fetchSubjectsDropdownData]);

  const fetchCoursesDropdownData = useCallback((subjectId) => {
    fetchCoursesForTest(subjectId)
      .then((data) => {
        setCourses(data.courses);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  const handleSubjectChange = ({ target: { value } }) => {
    setErrorMessage('');
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      selectedSubject: '',
    }));
    fetchCoursesDropdownData(value);
  };

  const handleCourseChange = (event) => {
    setErrorMessage('');
    const selectedCourse = event.target.value;
    
    setFormData((prevData) => ({ ...prevData, selectedCourse }));
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      selectedCourse: '',
    }));
  };
  

  const fetchQuestionsCount = (selectedCourse) => {
    fetchTestQuestionsByIds(selectedCourse)
      .then((data) => {
        setFormData((prevData) => ({
          ...prevData,
          numberOfQuestions: data.question_count,
        }));
        if (data.question_count === 0) {
          setErrorMessage('Cannot Edit the test. No questions available.');
          return;
        }
        setTestQuestions(data.questions);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleInstructionChange = (html) => {
    setFormData((prevData) => ({ ...prevData, instruction: html }));
  };
  // const handleStatusChange = (event) => {
  //   const status = event.target.value;
  //   setFormData((prevData) => ({ ...prevData, status }));
  // };

  const handleStatusChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      status: selectedOption.target.value,
    }));
  };

  const nextForm = async (event) => {
    event.preventDefault();
    const isVerified = formData.selectedSubject && formData.selectedCourse;
    setIsFormVerified(isVerified);
  };

  const fetchTestDetail = useCallback(async () => {
    try {
      const response = await fetchTestDetails(testId);
      const data = response.test;
      console.log('data', data);
      if (data) {
        fetchCoursesDropdownData(data.subject_id);
        fetchQuestionsCount(data.course_id);
        const arr = data?.question_ids?.split(',').map(Number);
        setSelectedQuestions(arr);
        setFormData({
          selectedSubject: data.subject_id,
          selectedCourse: data.course_id,
          selectedQuestions: data.question_ids,
          testTitle: data.title,
   
          duration: data.time_limit,
          description: data.description,
          instruction: data.instruction,
          status: data.status,
        });
      }
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }, [testId, fetchSubjectsDropdownData]);
  console.log('formData', formData.instruction);
  useEffect(() => {
    fetchTestDetail();
  }, [fetchTestDetail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const updatedFormData = {
        ...formData,
        selectedQuestions: selectedQuestions,
        totalMarks: selectedQuestions.length,
      };
      const response =  await updateTest(testId, updatedFormData);
      if (response.status) {
      toast.success('Test edited successfully!');
      navigate('/admin/tests');
      setFormData({
        selectedSubject: '',
        selectedCourse: '',
        numberOfQuestions: '',
        testTitle: '',
        startTime: '',
        endTime: '',
        duration: '',
        description: '',
        instruction: '',
        status: '',
      });
    }else{
      toast.error(response.message);
    }
    } catch (error) {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      }
      const errorMessage = error.message || 'Test already available for this test';
      toast.error(errorMessage);
      console.error('Error creating test:', error);
    }
    setIsSubmitting(false);
  };
  return (
    <>

{loading ? ( // Show loader if still loading
        <div className="text-center mt-5 col-12">
          <ContentLoader />
        </div>
      ) : (
        <div className={`content-transition ${!loading ? 'fade-in' : ''}`}>
          {!isFormVerified ? (
            <div>
          <ContentHeader title={title} />
          <ContentFormWrapper formTitle="Edit New Test">
            {errorMessage && (
              <ContentFallback alertDanger message={errorMessage} />
            )}
            <form
              className="contact_form"
              name="contact_form"
              action="#"
              onSubmit={nextForm}
              autoComplete="off"
            >
              <div className="row">
                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Select Subject
                    </label>
                    <SelectInput
                      className="form-control"
                      options={subjects}
                      name="selectedSubject"
                      label="name"
                      value={formData.selectedSubject || ''}
                      onChange={handleSubjectChange}
                      placeholder="Select Subject"
                      required
                    />
                    {validationErrors.selectedSubject && (
                      <span className="text-danger font-xsss mt-2">
                        Subject empty or not found.
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Select Course
                    </label>
              
                    <DisabledSelectInput
                      className="form-control"
                      options={courses}
                      name="selectedCourse"
                      label="name"
                      value={formData.selectedCourse || ''}
                      onChange={handleCourseChange}
                      placeholder="Select Course"
                      required
                      valueKey="id"
                    />

                    {validationErrors.selectedCourse && (
                      <span className="text-danger font-xsss mt-2">
                        Course empty or not found.
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group mb30">
                    <label className="form-label mont-font fw-600 font-xsss">
                      Number of Questions
                    </label>
                    <input
                      name="numberOfQuestions"
                      className="form-control form_control"
                      type="text"
                      value={formData.numberOfQuestions || ''}
                      disabled
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group mb30">
                    <label className="form-label mont-font fw-600 font-xsss">
                      Test Title
                    </label>
                    <input
                      name="testTitle"
                      onChange={handleInputChange}
                      className="form-control form_control"
                      value={formData.testTitle || ''}
                      type="text"
                      placeholder="Enter Test Title *"
                    />
                    {validationErrors.testTitle && (
                      <span className="text-danger font-xsss mt-2">
                        {validationErrors.testTitle}
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group mb30">
                    <label className="form-label mont-font fw-600 font-xsss">
                      Duration (in seconds)*
                    </label>
                    <input
                      name="duration"
                      onChange={handleInputChange}
                      className="form-control form_control"
                      type="number"
                      value={formData.duration || ''}
                      step="1"
                      placeholder="Enter Duration (in seconds) *"
                    />
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-group mb30">
                    <label className="form-label mont-font fw-600 font-xsss">
                      Description
                    </label>
                    <textarea
                      name="description"
                      onChange={handleInputChange}
                      className="form-control form_control mb-0 p-3 h100 lh-16"
                      value={formData.description || ''}
                      type="text"
                      placeholder="Enter Description"
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group mb30">
                    <label className="form-label mont-font fw-600 font-xsss">
                      Instruction *
                    </label>

                    <TextEditor
                      initialValue={formData.instruction || ''}
                      onContentChange={handleInstructionChange}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group mb30">
                    <label className="form-label mont-font fw-600 font-xsss">
                      Status{!formData.status}
                    </label>
                    <select
                      className="form-control"
                      name="status"
                      value={formData.status}
                      onChange={handleStatusChange}
                      required
                    >
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-12 mb-0 mt-2 pl-0">
                  <div className=" d-flex align-items-center justify-content-center">
                    <button
                      type="submit"
                      disabled={formData.numberOfQuestions === 0}
                      className="bg-current text-white btn ml-auto float-right border-0 fw-600 text-uppercase py-2 px-4 rounded-lg text-center font-xsss shadow-xs"
                    >
                      <i className="feather-play font-xssss mr-2"></i> Next
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </ContentFormWrapper>
        </div>
      ) : (
        <div className="row">
          <div className="col-12 my-4">
            <ContentHeader title="Select Questions" />
            <SelectQuestion
              questions={testQuestions || []}
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
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

Edit.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Edit;
