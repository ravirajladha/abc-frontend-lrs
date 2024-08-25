import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import {
  ContentFallback,
  ContentFormWrapper,
  ContentHeader,
} from '@/components/common';
import { SelectQuestion } from '@/components/admin/test';

import { fetchSubjects } from '@/api/dropdown'; // Fetching subjects instead of classes

import {
  createTest,
  fetchTestQuestionsBySubjectIds, // Updated function name to reflect the change
} from '@/api/recruiter';
import { SelectMultipleInput } from '@/components/common/form';
import { TextEditor } from '@/components/common';

function Create({ title, isAdmin }) {
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]); // Updated from classes to subjects
  const [testQuestions, setTestQuestions] = useState([]);
  const [formData, setFormData] = useState({
    selectedSubject: '', // Updated from selectedClass to selectedSubject
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

  const fetchSubjectDropdownData = useCallback(() => {
    fetchSubjects() // Fetching subjects instead of classes
      .then((data) => {
        setSubjects(data.subjects); // Updated to setSubjects
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  useEffect(() => {
    fetchSubjectDropdownData(); // Updated function call
  }, [fetchSubjectDropdownData]);

  const handleSubjectChange = ({ target: { value } }) => { // Updated function name to handleSubjectChange
    // Reset error messages and validation errors related to subject selection
    setErrorMessage('');
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      selectedSubject: '',
    }));

    // Update the formData state to reflect the selected subjects
    setFormData((prevData) => ({
      ...prevData,
      selectedSubject: value, // Updated to selectedSubject
      numberOfQuestions: '',
      testTitle: '',
      testTerm: '',
      startTime: '',
      endTime: '',
      duration: '',
      description: '',
      instruction: '',
    }));

    // Check if there are selected subjects before fetching data
    if (value.length > 0) {
      fetchTestQuestionsBySubjectIds(value) // Updated function to use subject IDs
        .then((data) => {
          setFormData((prevData) => ({
            ...prevData,
            numberOfQuestions: data.question_count,
          }));
          if (data.question_count === 0) {
            setErrorMessage('Cannot create the job test. No questions available.');
          } else {
            setTestQuestions(data.questions);
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      // No subjects selected, reset question-related states
      setFormData((prevData) => ({
        ...prevData,
        numberOfQuestions: '',
      }));
      setTestQuestions([]);
    }
  };

  useEffect(() => {
    console.log('questions:', testQuestions);
    console.log('Updated number of questions:', formData.numberOfQuestions);
  }, [formData.numberOfQuestions, testQuestions]);

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
    const isVerified = formData.selectedSubject; // Updated to selectedSubject
    setIsFormVerified(isVerified);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const subjectIdsString = formData.selectedSubject.join(','); // Updated to selectedSubject
    try {
      const updatedFormData = {
        ...formData,
        selectedSubject: subjectIdsString, // Updated to selectedSubject
        selectedQuestions: selectedQuestions,
        totalMarks: selectedQuestions.length,
      };
      await createTest(updatedFormData);

      toast.success('Job test created successfully!');

      if (isAdmin) {
        navigate('/admin/jobs/tests');
      } else {
        navigate('/recruiter/jobs/tests');
      }
      setFormData({
        selectedSubject: '', // Updated to selectedSubject
        numberOfQuestions: '',
        testTitle: '',
        testTerm: '',
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
      console.error('Error creating job test:', error);
    }
    setIsSubmitting(false);
  };

  return (
    <>
      {!isFormVerified ? (
        <div>
          <ContentHeader title={title} />
          <ContentFormWrapper formTitle="Create New Job Test">
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
                      Select Subject *
                    </label>
                    <SelectMultipleInput
                      className="form-control"
                      options={subjects} // Updated to subjects
                      name="selectedSubject" // Updated to selectedSubject
                      label="name"
                      value={formData.selectedSubject || []} // Updated to selectedSubject
                      onChange={handleSubjectChange} // Updated to handleSubjectChange
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

                {/* <div className="col-lg-4">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Select Subject *
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
                        {validationErrors.selectedSubject}
                      </span>
                    )}
                  </div>
                </div> */}

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
                      Test Title *
                    </label>
                    <input
                      name="testTitle"
                      onChange={handleInputChange}
                      className="form-control form_control"
                      type="text"
                      placeholder="Enter Test Title"
                      required
                    />
                    {validationErrors.testTitle && (
                      <span className="text-danger font-xsss mt-2">
                        {validationErrors.testTitle}
                      </span>
                    )}
                  </div>
                </div>

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
                      step="1"
                      min="0"
                      placeholder="Enter Duration (in seconds)"
                      required
                    />
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-group mb30">
                    <label className="form-label mont-font fw-600 font-xsss">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      onChange={handleInputChange}
                      className="form-control form_control mb-0 p-3 h100 lh-16"
                      type="text"
                      placeholder="Enter Description"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group mb30">
                    <label className="form-label mont-font fw-600 font-xsss">
                      Instruction *
                    </label>

                    <TextEditor
                      initialValue={formData.instruction}
                      onContentChange={handleInstructionChange}
                    />
                  </div>
                </div>

                <div className="col-lg-12 mb-0 mt-2 pl-0">
                  <div className="d-flex align-items-center justify-content-center">
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
    </>
  );
}

Create.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Create;
