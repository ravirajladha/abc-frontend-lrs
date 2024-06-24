import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { TextEditor } from '@/components/common';
import { SelectMultipleInput } from '@/components/common/form';

import { TERM_TYPES } from '@/utils/constants';

import {
  ContentFallback,
  ContentFormWrapper,
  ContentHeader,
} from '@/components/common';

import { SelectQuestion } from '@/components/admin/term-test';

import { fetchClasses } from '@/api/dropdown';

import {
  updateTermTest,
  fetchTermTestQuestionsByIds,
  fetchTestDetails,
  fetchTermTestQuestionsByClassIds,
} from '@/api/recruiter';
import { SelectInput } from '@/components/common/form';

function Edit({ title ,isAdmin}) {
  const navigate = useNavigate();
  const { testId } = useParams();

  const [loading, setLoading] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [testQuestions, setTestQuestions] = useState([]);
  const [formData, setFormData] = useState({
    selectedClass: '',
    numberOfQuestions: '',
    testTitle: '',
    testTerm: '',
    startTime: '',
    endTime: '',
    duration: '',
    description: '',
    instruction: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isFormVerified, setIsFormVerified] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch test details first
        const response = await fetchTestDetails(testId);
        const data = response.term_test;
        console.log('Test details fetched:', data);
        const arr = data?.question_ids?.split(',').map(Number);
        setSelectedQuestions(arr);
        // Update form data with test details
        setFormData((prev) => ({
          ...prev,
          selectedClass: data.class_id ? data.class_id.split(',') : [],
          selectedQuestions: data.question_ids,
          testTitle: data.title,
          duration: data.time_limit,
          description: data.description,
          instruction: data.instruction,
        }));
console.log( typeof(data.class_id), "data clas_id");
        // Fetch questions based on the class ID from test details
        const questionData = await fetchTermTestQuestionsByClassIds(
          data.class_id
        );
        if (questionData.term_question_count === 0) {
          setErrorMessage(
            'Cannot create the job test. No questions available.'
          );
        } else {
          setTestQuestions(questionData.term_questions);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [testId]);

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

  // const handleClassChange = ({ target: { value } }) => {
  //   setErrorMessage('');
  //   setValidationErrors((prevErrors) => ({
  //     ...prevErrors,
  //     selectedClass: '',
  //   }));
  // };

  const handleClassChange = ({ target: { value } }) => {
    // Check if there's actually a change to reduce unnecessary state updates
    if (JSON.stringify(formData.selectedClass) !== JSON.stringify(value)) {
      setErrorMessage('');
      setFormData((prevData) => ({
        ...prevData,
        selectedClass: value,
        numberOfQuestions: '', // Resetting the number as new classes might change available questions
      }));
    }
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleInstructionChange = (html) => {
    setFormData((prevData) => ({ ...prevData, instruction: html }));
  };

  const handleTermChange = (event) => {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      testTerm: '',
    }));

    const testTerm = event.target.value;
    setFormData((prevData) => ({ ...prevData, testTerm }));
  };

  const nextForm = async (event) => {
    event.preventDefault();
    const isVerified = formData.selectedClass;
    setIsFormVerified(isVerified);
  };

  useEffect(() => {
    if (formData.selectedClass.length > 0) {
      // console.log(
      //   'Fetching questions for classes:',
      //   formData.selectedClass.join(',')
      // );

      fetchTermTestQuestionsByClassIds(formData.selectedClass)
        .then((data) => {
          setFormData((prevData) => ({
            ...prevData,
            numberOfQuestions: data.term_question_count,
          }));
          console.log('number of question', formData.numberOfQuestions);
          if (data.term_question_count === 0) {
            setErrorMessage('No questions available for the selected classes.');
          } else {
            setTestQuestions(data.term_questions);
            console.log('Setting test questions:', data.term_questions);
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error(error.message);
        });
    } else {
      // No classes selected, reset question-related states
      setFormData((prevData) => ({
        ...prevData,
        numberOfQuestions: '',
      }));
      setTestQuestions([]);
    }
  }, [formData.selectedClass]); // Dependency array ensures this only runs when selectedClass changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const classIdsString = formData.selectedClass.join(',');
    try {
      const updatedFormData = {
        ...formData,
        selectedClass: classIdsString,
        selectedQuestions: selectedQuestions,
        totalMarks: selectedQuestions.length,
      };
      await updateTermTest(testId, updatedFormData);
      toast.success('Job test edited successfully!');
      // navigate('/jobs/tests');
      if (isAdmin) {
        navigate('/admin/jobs/tests');
      } else {
        navigate('/recruiter/jobs/tests');
      }
      setFormData({
        selectedClass: '',
        numberOfQuestions: '',
        testTitle: '',
        startTime: '',
        endTime: '',
        duration: '',
        description: '',
        instruction: '',
      });
    } catch (error) {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      }
      toast.error(error.message);
      console.error('Error creating term test:', error);
    }
    setIsSubmitting(false);
  };

  return (
    <>
      {!isFormVerified ? (
        <div>
          <ContentHeader title={title} />
          <ContentFormWrapper formTitle="Edit New Job Test">
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
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Select Subject
                    </label>
                    <SelectMultipleInput
                      className="form-control"
                      options={classes}
                      name="selectedClass"
                      label="name"
                      value={formData.selectedClass || []}
                      onChange={handleClassChange}
                      placeholder="Select Subject"
                      required
                    />
                    {validationErrors.selectedClass && (
                      <span className="text-danger font-xsss mt-2">
                            Subject empty or not found.
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
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

                <div className="col-md-6">
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

                {/* <div className="col-md-4">
              <div className="form-group mb30">
                <label className="form-label">Start Time</label>
                <input
                  name="form_name"
                  className="form-control form_control"
                  type="text"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group mb30">
                <label className="form-label">End Time</label>
                <input
                  name="form_name"
                  className="form-control form_control"
                  type="text"
                />
              </div>
            </div> */}

                <div className="col-md-6">
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
                      initialValue={formData.instruction || 'default value'}
                      onContentChange={handleInstructionChange}
                    />
                  </div>
                </div>

                <div className="col-lg-12 mb-0 mt-2 pl-0">
                  <div className=" d-flex align-items-center justify-content-center">
                    <button
                      type="submit"
                      disabled={formData.numberOfQuestions == 0}
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
    </>
  );
}

Edit.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Edit;
