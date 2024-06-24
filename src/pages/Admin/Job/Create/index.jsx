import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { SelectInput } from '@/components/common/form';
import { fetchClasses } from '@/api/dropdown';
import { TextEditor } from '@/components/common';

import {
  ContentFormWrapper,
  ContentHeader,
  ContentLoader,
} from '@/components/common';
import { SelectMultipleInput } from '@/components/common/form';

import { createJobDetails, fetchRecruiters, fetchJobTests } from '@/api/admin';
import { FileInput } from '@/components/common/form';
import { getUserDataFromLocalStorage } from '@/utils/services';

function Create(props) {
  console.log('isRecruiter', props);
  const userData = JSON.parse(getUserDataFromLocalStorage());
  console.log('userdata', userData);

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [recruiters, setRecruiters] = useState([]);
  const [jobTests, setJobTests] = useState([]);
  const [classes, setClasses] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    selectedClass: '',
    recruiter_id: '',
    test_id: '',
    description: '',
    instruction: '',
    image: '',
    annual_ctc: '',
    location: '',
    criteria: '',
    passing_percentage: '0',
  });

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

  const handleFileChange = (file) => {
    setFormData((prevData) => ({
      ...prevData,
      image: file ? file : '',
    }));
    setSelectedImage(file);
  };
  const handleInstructionChange = (html) => {
    setFormData((prevData) => ({ ...prevData, instruction: html }));
  };

  const handleClassChange = ({ target: { value } }) => {
    setFormData((prevData) => ({ ...prevData, selectedClass: value }));
    setValidationErrors(({ selectedClass: _, ...prevErrors }) => prevErrors);
  };
  const fetchRecruitersData = useCallback(() => {
    fetchRecruiters()
      .then((data) => {
        setRecruiters(data.recruiters);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  useEffect(() => {
    if (props.isRecruiter === false) {
      fetchRecruitersData();
    }
  }, [fetchRecruitersData, props.isRecruiter]);
  const fetchJobTestsData = useCallback(() => {
    fetchJobTests()
      .then((data) => {
        setJobTests(data.term_tests);
        console.log("jobstest", jobTests);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  useEffect(() => {
    fetchJobTestsData();
  }, [fetchJobTestsData]);

  const handleRecruiterChange = ({ target: { value } }) => {
    setFormData((prevData) => ({ ...prevData, recruiter_id: value }));
    setValidationErrors(({ recruiter_id: _, ...prevErrors }) => prevErrors);
  };
  // const handleTestIdChange = ({ target: { value } }) => {
  //   setFormData((prevData) => ({ ...prevData, test_id: value }));
  //   setValidationErrors(({ test_id: _, ...prevErrors }) => prevErrors);
  // };

  const handleTestIdChange = ({ target: { value } }) => {
    setFormData((prevData) => ({
      ...prevData,
      test_id: value === 'null' ? null : value,
    }));
    setValidationErrors(({ test_id: _, ...prevErrors }) => prevErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const submissionData = new FormData();
      // submissionData.append('_method', 'PUT');
      submissionData.append('title', formData.title);
      if (props.isRecruiter) {
        // const userData = JSON.parse(getUserDataFromLocalStorage());
        submissionData.append('recruiter_id', userData.id);
      } else {
        submissionData.append('recruiter_id', formData.recruiter_id);
      }
      // submissionData.append('recruiter_id', formData.recruiter_id);
      // submissionData.append('test_id', formData.test_id);
      submissionData.append('test_id', formData.test_id === null ? '' : formData.test_id);
      submissionData.append('description', formData.description);
      submissionData.append('instruction', formData.instruction);
      submissionData.append('location', formData.location);
      submissionData.append('criteria', formData.criteria);
      submissionData.append('annual_ctc', formData.annual_ctc);
      submissionData.append('passing_percentage', formData.passing_percentage);
      submissionData.append('selectedClass', formData.selectedClass);

      if (formData.image) {
        submissionData.append('image', formData.image);
      }

      console.log("response before submitting", submissionData.get('test_id'));

      const response = await createJobDetails(submissionData);
      toast.success('Job Added successfully.');
      clearForm();
      clearSelectedImage();
      setIsSubmitting(false);
      if (props.isRecruiter) {
      navigate(`/recruiter/jobs`);
      }else{
      navigate(`/admin/jobs`);
      }
    } catch (error) {
      console.log('error is coming', error.validationErrors);
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      }

      console.error('Error:', error.message);
      toast.error('Error submitting the form. Please try again.');
      setIsSubmitting(false);
    }
  };

  const clearSelectedImage = () => {
    setSelectedImage(null);
  };

  const clearForm = () => {
    setFormData({
      title: '',
      description: '',
      instruction: '',
      image: '',
      annual_ctc: '',
      location: '',
      criteria: '',
      selectedClass: '',
      recruiter_id: '',
      test_id: '',
      passing_percentage: '',
      selectedClass: '',
    });
  };
  const jobTestsWithNoOption = [{ title: "No Test", id: 'null' }, ...jobTests];
  return (
    <>
      <ContentHeader title="Create Job" backLink="/admin/jobs" />
      <ContentFormWrapper formTitle={`Create Job Post`}>
        <form
          id="createForm"
          onSubmit={handleSubmit}
          className={isSubmitting ? 'blurred-form' : ''}
          autoComplete="off"
        >
          {!isLoading ? (
            <div className="row">
     
              <div className={props.isRecruiter === false ? 'col-lg-6 mb-2' : 'col-lg-12 mb-2'}>

                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Select Subject *
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
              {props.isRecruiter === false && (
                <div className="col-lg-6 mb-2">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Assign Recruiter *
                    </label>
                    <SelectInput
                      className="form-control"
                      options={recruiters}
                      name="recruiter_id"
                      label="name"
                      value={formData.recruiter_id}
                      onChange={handleRecruiterChange}
                      placeholder="Select Recruiter"
                      valueKey="auth_id"
                    />
                    {validationErrors.recruiter_id && (
                      <span className="text-danger">
                        {validationErrors.recruiter_id}
                      </span>
                    )}
                  </div>
                </div>
              )}
              <div className="col-lg-6 mb-2">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Test Id 
                  </label>
                  <SelectInput
                    className="form-control"
                    options={jobTestsWithNoOption}
                    name="test_id"
                    label="title"
                    value={formData.test_id}
                    onChange={handleTestIdChange}
                    placeholder="Select Test Name"
                  />
                  {validationErrors.test_id && (
                    <span className="text-danger">
                      {validationErrors.test_id}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-lg-6 mb-2">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Passing Percentage *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="passing_percentage"
                    placeholder="Enter  Passing Percentage "
                    value={formData.passing_percentage}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        passing_percentage: e.target.value,
                      })
                    }
                  />
                  {validationErrors.passing_percentage && (
                    <div className="text-danger">
                      {validationErrors.passing_percentage}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-6 mb-2">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="Enter Job Title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                  {validationErrors.title && (
                    <div className="text-danger">{validationErrors.title}</div>
                  )}
                </div>
              </div>
              <div className="col-lg-6 mb-2">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Job Location *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="location"
                    placeholder="Enter Job Location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                  {validationErrors.location && (
                    <div className="text-danger">
                      {validationErrors.location}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-6 mb-2">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Job Criteria *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="criteria"
                    placeholder="Enter Job Criteria"
                    value={formData.criteria}
                    onChange={(e) =>
                      setFormData({ ...formData, criteria: e.target.value })
                    }
                  />
                  {validationErrors.criteria && (
                    <div className="text-danger">
                      {validationErrors.criteria}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-6 mb-2">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Annual CTC *
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="annual_ctc"
                    placeholder="Enter  Annual CTC "
                    value={formData.annual_ctc}
                    onChange={(e) =>
                      setFormData({ ...formData, annual_ctc: e.target.value })
                    }
                  />
                  {validationErrors.annual_ctc && (
                    <div className="text-danger">
                      {validationErrors.annual_ctc}
                    </div>
                  )}
                </div>
              </div>
            
              <div className="col-lg-6 mb-2">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Content Description *
                  </label>

                  <textarea
                    className="form-control mb-0 p-3 h100 lh-16"
                    name="contentDescription"
                    placeholder="Enter Content Description"
                    rows="2"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                  {validationErrors.description && (
                    <div className="text-danger">
                      {validationErrors.description}
                    </div>
                  )}
                </div>
              </div>
           
              <div className="col-lg-6 mb-2">
                <FileInput
                  fileTypes="image"
                  required
                  onSelectFile={handleFileChange}
                  selectedFile={selectedImage}
                  clearSelectedFile={clearSelectedImage}
                />
                {validationErrors.image && (
                  <div className="text-danger">{validationErrors.image}</div>
                )}
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
                {validationErrors.instruction && (
                  <div className="text-danger">
                    {validationErrors.instruction}
                  </div>
                )}
              <div className="col-lg-12">
                <button
                  type="submit"
                  className="bg-current border-0 float-right text-center text-white font-xsss fw-600 px-3 py-2 w100 rounded-lg d-inline-block"
                >
                  <i className="feather-save mr-2"></i> Save
                </button>
              </div>
            </div>
          ) : (
            <>
              <ContentLoader />
            </>
          )}
        </form>
      </ContentFormWrapper>
    </>
  );
}

export default Create;
