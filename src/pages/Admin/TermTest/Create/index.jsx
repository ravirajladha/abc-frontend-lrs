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
import { SelectQuestion } from '@/components/admin/term-test';

import { fetchClasses, fetchSubjects } from '@/api/dropdown';

import {
  createTermTest,
  fetchTermTestQuestionsByIds,
  checkTermTestAvailability,
} from '@/api/admin';
import { SelectInput } from '@/components/common/form';
import { TextEditor } from '@/components/common';

function Create({ title }) {
  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [testQuestions, setTestQuestions] = useState([]);
  const [formData, setFormData] = useState({
    selectedClass: '',
    selectedSubject: '',
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

  const [existingTerms, setExistingTerms] = useState([]);

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
    setErrorMessage('');
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      selectedClass: '',
    }));
    setFormData({
      selectedClass: value,
      selectedSubject: '',
      numberOfQuestions: '',
      testTitle: '',
      testTerm: '',
      startTime: '',
      endTime: '',
      duration: '',
      description: '',
      instruction: '',
    });
    fetchSubjectsDropdownData(value);
  };

  const handleSubjectChange = (event) => {
    setErrorMessage('');
    setFormData((prevData) => ({ ...prevData, selectedSubject }));
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      selectedSubject: '',
    }));

    const selectedSubject = event.target.value;
    fetchTermTestQuestionsByIds(selectedSubject)
      .then((data) => {
        setFormData((prevData) => ({
          ...prevData,
          numberOfQuestions: data.term_question_count,
        }));
        if (data.term_question_count === 0) {
          setErrorMessage('Cannot create the test. No questions available.');
          return;
        }
        setTestQuestions(data.term_questions);
      })
      .catch((error) => {
        toast.error(error.message);
      });

    checkTermTestAvailability(selectedSubject)
      .then((data) => {
        console.warn(data.terms);
        setExistingTerms(data.terms);
      })
      .catch((error) => {
        toast.error(error.message);
      });

    setFormData((prevData) => ({ ...prevData, selectedSubject }));
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
    const isVerified = formData.selectedClass && formData.selectedSubject;
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
      console.log('data to be sumitted', updatedFormData);
      await createTermTest(updatedFormData);

      toast.success('Term test created successfully!');
      navigate('/admin/tests');
      setFormData({
        selectedClass: '',
        selectedSubject: '',
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
      console.error('Error creating term test:', error);
    }
    setIsSubmitting(false);
  };
  return (
    <>
      {!isFormVerified ? (
        <div>
          <ContentHeader title={title} />
          <ContentFormWrapper formTitle="Create New Term Test">
            {errorMessage && (
              <ContentFallback alertDanger message={errorMessage} />
            )}
            <form
              className="contact_form"
              name="contact_form"
              action="#"
              onSubmit={nextForm}
            >
              <div className="row">
                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Select Subject *
                    </label>
                    <SelectInput
                      className="form-control"
                      options={classes}
                      name="selectedClass"
                      label="name"
                      value={formData.selectedClass || ''}
                      onChange={handleClassChange}
                      placeholder="Select Subject"
                      required
                    />
                    {validationErrors.selectedClass && (
                      <span className="text-danger font-xsss mt-2">
                        {validationErrors.selectedClass}
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Select Course *
                    </label>
                    <SelectInput
                      className="form-control"
                      options={subjects}
                      name="selectedSubject"
                      label="name"
                      value={formData.selectedSubject || ''}
                      onChange={handleSubjectChange}
                      placeholder="Select Course"
                      required
                    />
                    {validationErrors.selectedSubject && (
                      <span className="text-danger font-xsss mt-2">
                        {validationErrors.selectedSubject}
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
                </div>

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
