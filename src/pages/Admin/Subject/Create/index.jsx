import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

import { createSubject, fetchSuperSubjects } from '@/api/admin';
import { ContentHeader } from '@/components/common';
import SUBJECT_TYPES from '@/utils/constants/subjectType.constants';

function Create({ title }) {
  const navigate = useNavigate();
  const { classId } = useParams();
  const fileInputRef = useRef();
  const [showSuperSubject, setShowSuperSubject] = useState(false);
  const [superSubjects, setSuperSubjects] = useState([]);
  const [formData, setFormData] = useState({
    subject_name: '',
    subject_image: null,
    subject_image_name: '',
    subject_type: '',
    super_subject: null,
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loader state
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      class_id: classId,
    }));
  };

  const handleFileChange = (event) => {
    // Method to handle file changes
    const file = event.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        subject_image: file,
        subject_image_name: file.name,
      });
    }
  };

  const handleSubjectTypeChange = (event) => {
    const subjectType = event.target.value;
    setFormData((prevData) => ({ ...prevData, subject_type:subjectType }));
    if (subjectType === '3') {
      setShowSuperSubject(true);
    } else {
      setShowSuperSubject(false);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const submissionData = new FormData();
    submissionData.append('subject_name', formData.subject_name);
    submissionData.append('subject_image', formData.subject_image);
    submissionData.append('class_id', classId);
    submissionData.append('subject_type', formData.subject_type);
    submissionData.append('super_subject_id', formData.super_subject);

    try {
      const response = await createSubject(submissionData);
      toast.success('Subject added successfully', response);
      navigate(`/admin/classes/${classId}/subjects`);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      }
      toast.error(error.message);
    }finally{
      setLoading(false); 
    }

  };
  const fetchData = async () => {
    try {
      const data = await fetchSuperSubjects();
      setSuperSubjects(data.superSubjects);
    } catch (error) {
      setError(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (formData.subject_type === '3') {
      fetchData();
    }
  }, [formData.subject_type]);
  return (
    <div className="px-2">
      <ContentHeader title={title} />

      <div className="row">
        <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
          <div className="card-body p-lg-5 p-4 w-100 border-0 mb-0">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-6 col-md-12 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Subject Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="subject_name"
                      value={formData.subject_name}
                      onChange={handleFormChange}
                      placeholder="Enter Subject Name"
                    />
                    {validationErrors.subject_name && (
                      <span className="text-danger">
                        {validationErrors.subject_name}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 mb-3">
                  <div className="form-group">
                    <label className="mont-font form-label fw-600 font-xsss">
                      Subject Image
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Select Subject Image"
                      value={formData.subject_image_name}
                      onClick={() =>
                        document.getElementById('subjectImageInput').click()
                      }
                      readOnly
                    />
                    <input
                      type="file"
                      className="custom-file-input"
                      name="subject_image"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      id="subjectImageInput"
                    />
                    {validationErrors.subject_image && (
                      <span className="text-danger">
                        {validationErrors.subject_image}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 mb-3">
                  <div className="form-group">
                    <label className="form-label mont-font fw-600 font-xsss">
                      Subject Type
                    </label>
                    <select
                      className="form-control"
                      placeholder="Enter Subject Type"
                      name="subject_type"
                      onChange={handleSubjectTypeChange}
                      required
                    >
                      <option value=""  readOnly>
                        Select Subject Type
                      </option>
                      {SUBJECT_TYPES.map((type) => (
                        <option value={type.id} key={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                    {validationErrors.subject_type && (
                      <span className="text-danger font-xsss mt-2">
                        {validationErrors.subject_type}
                      </span>
                    )}
                  </div>
                </div>
                {showSuperSubject && (
                  <div className="col-lg-6 col-md-12 mb-3">
                    <div className="form-group">
                      <label className="form-label mont-font fw-600 font-xsss">
                        Select Super Subject
                      </label>
                      <select
                        className="form-control"
                        placeholder="Enter Super Type"
                        name="super_subject"
                        onChange={handleFormChange}
                        required
                      >
                        <option value="" readOnly>
                          Select Super Subject
                        </option>
                        {superSubjects.map((superSubject) => (
                          <option key={superSubject.id} value={superSubject.id}>
                            {superSubject.name}
                          </option>
                        ))}
                      </select>
                      {validationErrors.super_subject && (
                        <span className="text-danger font-xsss mt-2">
                          {validationErrors.super_subject}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="col-lg-12 mb-0 mt-2 pl-0">
                <button
                  type="submit"
                  className="bg-current border-0 text-center float-right text-white font-xsss fw-600 p-3 w150 rounded-lg d-inline-block"
                  disabled={loading}
                >

{/* {loading ? (
                    <i className="fa fa-spinner fa-spin mr-2"></i>
                  ) : (
                    <i className="feather-save mr-2"></i>
                  )}
                  {loading ? 'Saving...' : 'Save'} */}

                  {loading ? (
                  <>
                    {' '}
                    <Spinner
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="mr-2"
                    />
                  </>
                ) : (
                  <>
                    <i className="feather-save mr-2"></i> Save
                  </>
                )}

                  {/* <i className="feather-save mr-2"></i> Save */}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

Create.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Create;
