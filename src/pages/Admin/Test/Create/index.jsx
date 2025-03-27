import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import { TERM_TYPES } from '@/utils/constants';

import {
  ContentFallback,
  ContentFormWrapper,
  ContentHeader,
} from '@/components/common';
import { SelectQuestion } from '@/components/admin/test';

import { fetchSubjects, fetchCoursesForTest, fetchCourses } from '@/api/dropdown';

import {
  createTest,
  fetchTestQuestionsByIds,
  checkTestAvailability,
} from '@/api/admin';
import { SelectInput, DisabledSelectInput } from '@/components/common/form';
import { TextEditor } from '@/components/common';

function Create({ title }) {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [testQuestions, setTestQuestions] = useState([]);
  const [formData, setFormData] = useState({
    selectedCourse: '',
    selectedSubject: '',
    numberOfQuestions: '',
    testTitle: '',
    // testTerm: '',
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

  // const [existingTerms, setExistingTerms] = useState([]);

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

  // const fetchSubjectsDropdownData = useCallback((classId) => {
  //   fetchSubjects(classId)
  //     .then((data) => {
  //       setSubjects(data.subjects);
  //     })
  //     .catch((error) => {
  //       toast.error(error.message);
  //     });
  // }, []);

  const handleSubjectChange = ({ target: { value } }) => {
    setErrorMessage('');
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      selectedSubject: '',
    }));
    setFormData({
      selectedSubject: value,
      selectedCourse: '',
      numberOfQuestions: '',
      testTitle: '',
      // testTerm: '',
      startTime: '',
      endTime: '',
      duration: '',
      description: '',
      instruction: '',
    });
    fetchCoursesDropdownData(value);
  };

  const fetchCoursesDropdownData = useCallback((subjectId) => {
    fetchCourses(subjectId)
      .then((data) => {
        console.log(data, 'subject data');
        setCourses(data.courses);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  const handleCourseChange = (event) => {
    const selectedCourse = event.target.value;
    setFormData((prevData) => ({ ...prevData, selectedCourse }));
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      selectedCourse: '',
    }));

    fetchTestQuestionsByIds(selectedCourse)
      .then((data) => {
        setFormData((prevData) => ({
          ...prevData,
          numberOfQuestions: data.question_count,
        }));
        if (data.question_count === 0) {
          setErrorMessage('Cannot create the test. No questions available.');
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

  const nextForm = async (event) => {
    event.preventDefault();
    const isVerified = formData.selectedSubject && formData.selectedCourse;
    setIsFormVerified(isVerified);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const updatedFormData = {
        ...formData,
        selectedQuestions: selectedQuestions,
        totalMarks: selectedQuestions.length,
      };
      console.log('Data to be submitted:', updatedFormData);
  
      const response = await createTest(updatedFormData);

      if (response.status) {
        toast.success('Test created successfully!');
        navigate('/admin/tests');
        setFormData({
          selectedCourse: '',
          selectedSubject: '',
          numberOfQuestions: '',
          testTitle: '',
          startTime: '',
          endTime: '',
          duration: '',
          description: '',
          instruction: '',
        });
      } else {
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
      {!isFormVerified ? (
        <div>
          <ContentHeader title={title} />
          <ContentFormWrapper formTitle="Create New Test">
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
                        Subject empty or not found.
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Select Course *
                    </label>
                    {/* <SelectInput
                      className="form-control"
                      options={subjects}
                      name="selectedSubject"
                      label="name"
                      value={formData.selectedSubject || ''}
                      onChange={handleSubjectChange}
                      placeholder="Select Course"
                      required
                    /> */}
                    {/* fetchSubjectsForTest */}
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
                    {validationErrors.selectedSubject && (
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
                {/* <div className="col-md-4">
                  <div className="form-group mb30">
                    <label className="form-label mont-font fw-600 font-xsss">
                      Test Term *
                    </label>
                    <select
                      className="form-control"
                      placeholder="Enter Test Term"
                      name="testTerm"
                      onChange={handleTermChange}
                      required
                    >
                      <option value="" selected disabled readOnly>
                        Select Test Term
                      </option>
                      {TERM_TYPES.map((term) => (
                        <option
                          value={term.id}
                          disabled={existingTerms.includes(term.id)}
                        >
                          {term.name}
                        </option>
                      ))}
                    </select>
                    {validationErrors.testTerm && (
                      <span className="text-danger font-xsss mt-2">
                        {validationErrors.testTerm}
                      </span>
                    )}
                  </div>
                </div> */}

                <div className="col-md-4">
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
    </>
  );
}

Create.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Create;
