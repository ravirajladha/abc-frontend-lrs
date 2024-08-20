import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { SelectInput } from '@/components/common/form';
import { fetchSubjects } from '@/api/dropdown';
import { SelectMultipleInput } from '@/components/common/form';
import { TextEditor } from '@/components/common';

import {
  ContentFormWrapper,
  ContentHeader,
  ContentLoader,
} from '@/components/common';

import { updateJobDetails, fetchJobDetails } from '@/api/admin';
import { fetchRecruiters, fetchJobTests } from '@/api/admin';

import { FileInput } from '@/components/common/form';
import { getUserDataFromLocalStorage } from '@/utils/services';

function Create(props) {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [subjects, setSubjects] = useState([]);
  const userData = JSON.parse(getUserDataFromLocalStorage());

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [recruiters, setRecruiters] = useState([]);
  const [jobTests, setJobTests] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    annual_ctc: '',
    location: '',
    criteria: '',
    recruiter_id: '',
    test_id: '',
    passing_percentage: '',
    selectedSubject: [],
    instruction: '',
    status: 'active', // Default status
  });

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

  const handleSubjectChange = ({ target: { value } }) => {
    setFormData((prevData) => ({ ...prevData, selectedSubject: value }));
    setValidationErrors(({ selectedSubject: _, ...prevErrors }) => prevErrors);
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

  const handleRecruiterChange = ({ target: { value } }) => {
    setFormData((prevData) => ({ ...prevData, recruiter_id: value }));
    setValidationErrors(({ recruiter_id: _, ...prevErrors }) => prevErrors);
  };

  const handleTestIdChange = ({ target: { value } }) => {
    setFormData((prevData) => ({
      ...prevData,
      test_id: value === 'null' ? null : value,
    }));
    setValidationErrors(({ test_id: _, ...prevErrors }) => prevErrors);
  };

  const handleInstructionChange = (html) => {
    setFormData((prevData) => ({ ...prevData, instruction: html }));
  };

  useEffect(() => {
    if (props.isRecruiter === false) {
      fetchRecruitersData();
    }
  }, [fetchRecruitersData, props.isRecruiter]);

  const fetchJobTestsData = useCallback(() => {
    fetchJobTests()
      .then((data) => {
        setJobTests([{ title: 'No Test', id: '' }, ...data.term_tests]);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  useEffect(() => {
    fetchJobTestsData();
  }, [fetchJobTestsData]);

  const fetchJob = useCallback(async () => {
    fetchJobDetails(jobId)
      .then((data) => {
        if (data) {
          setFormData({
            title: data.job?.title,
            description: data.job?.description,
            annual_ctc: data.job?.annual_ctc,
            location: data.job?.location,
            criteria: data.job?.criteria,
            recruiter_id: data.job?.recruiter_id,
            test_id: data.job?.test_id === null ? '' : data.job?.test_id,
            passing_percentage: data.job?.passing_percentage,
            selectedSubject: data.job.class_id ? data.job.class_id.split(',') : [],
            instruction: data.job?.instruction,
            status: data.job?.status,
          });
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
        toast.error(error.message);
      });
  }, [jobId]);

  useEffect(() => {
    fetchJob();
  }, [fetchJob]);

  const handleFileChange = (file) => {
    setFormData((prevData) => ({
      ...prevData,
      image: file ? file : '',
    }));
    setSelectedImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const submissionData = new FormData();
      submissionData.append('title', formData.title);
      submissionData.append('description', formData.description);
      submissionData.append('instruction', formData.instruction);
      submissionData.append('location', formData.location);
      submissionData.append('criteria', formData.criteria);
      submissionData.append('annual_ctc', formData.annual_ctc);
      submissionData.append('test_id', formData.test_id === null ? '' : formData.test_id);
      submissionData.append('recruiter_id', formData.recruiter_id);
      submissionData.append('passing_percentage', formData.passing_percentage);
      submissionData.append('selectedSubject', formData.selectedSubject);
      submissionData.append('status', formData.status);

      if (formData.image) {
        submissionData.append('image', formData.image);
      }

      const response = await updateJobDetails(jobId, submissionData);
      toast.success(response.message);

      clearForm();
      clearSelectedImage();
      setIsSubmitting(false);
      if (props.isRecruiter) {
        navigate(`/recruiter/jobs`);
      } else {
        navigate(`/admin/jobs`);
      }
    } catch (error) {
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
      image: '',
      annual_ctc: '',
      location: '',
      recruiter_id: '',
      test_id: '',
      passing_percentage: '',
      criteria: '',
      instruction: '',
      status: 'active',
    });
  };

  const handleDropdownChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      status: selectedOption.target.value,
    }));
  };

  return (
    <>
      <ContentHeader title="Edit Job" backLink="/admin/jobs" />
      <ContentFormWrapper formTitle={`Edit Job Post`}>
        <form
          id="editForm"
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
                    options={subjects}
                    name="selectedSubject"
                    label="name"
                    value={formData.selectedSubject || []}
                    onChange={handleSubjectChange}
                    placeholder="Select Subject"
                    required
                  />
                  {validationErrors.selectedSubject && (
                    <span className="text-danger font-xsss mt-2">
                      Subject empty or not found
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
                  <span className="text-danger">{validationErrors.recruiter_id}</span>
                )}
              </div>
            </div>      )}
              <div className="col-lg-6 mb-2">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                Test Id 
                </label>
                <SelectInput
                  className="form-control"
                  options={jobTests}
                  name="test_id"
                  label="title"
                  value={formData.test_id}
                  onChange={handleTestIdChange}
                  placeholder="Select Test Name"
                />
                {validationErrors.test_id && (
                  <span className="text-danger">{validationErrors.test_id}</span>
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
                    <div className="text-danger">
                      {validationErrors.title}
                    </div>
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
                    type="text"
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
                  onSelectFile={handleFileChange}
                  selectedFile={selectedImage}
                  clearSelectedFile={clearSelectedImage}
                />
                {validationErrors.image && (
                  <div className="text-danger">
                    {validationErrors.image}
                  </div>
                )}
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
                    {validationErrors.instruction && (
                  <div className="text-danger">
                    {validationErrors.instruction}
                  </div>
                )}
                  </div>
                </div>
                <div className="col-lg-12 mb-2">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                 Status 
                  </label>
                  <select
                    className="form-control"
                    name="status"
                    value={formData.status}
                    onChange={handleDropdownChange}
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
              </div>
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
