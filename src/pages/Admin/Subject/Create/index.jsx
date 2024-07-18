import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

import { createSubject, fetchSuperSubjects } from '@/api/admin';
import { ContentHeader, TextEditor } from '@/components/common';
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
    benefits: '',
    description: '',
    subject_video: '',
    subject_video_name: '',
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
  const handleVideoChange = (event) => {
    // Method to handle file changes
    const file = event.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        subject_video: file,
        subject_video_name: file.name,
      });
    }
  };
  const handleTextEditorChange = (field, content) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: content,
    }));
  };
  const handleSubjectTypeChange = (event) => {
    const subjectType = event.target.value;
    setFormData((prevData) => ({ ...prevData, subject_type: subjectType }));
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
    submissionData.append('subject_type', 1);
    submissionData.append('super_subject_id', null);
    submissionData.append('benefits', formData.benefits);
    submissionData.append('description', formData.description);

    try {
      const response = await createSubject(submissionData);
      toast.success('Course added successfully', response);
      navigate(`/admin/subjects/${classId}/courses`);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      }
      toast.error(error.message);
    } finally {
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
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="row">
                <div className="col-lg-6 col-md-12 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Course Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="subject_name"
                      value={formData.subject_name}
                      onChange={handleFormChange}
                      placeholder="Enter Course Name"
                    />
                    {validationErrors.subject_name && (
                      <span className="text-danger">
                        Course empty or not found
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 mb-3">
                  <div className="form-group">
                    <label className="mont-font form-label fw-600 font-xsss">
                      Course Image
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Select Course Image"
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
                    <label className="mont-font fw-600 font-xsss">
                      Course Validity
                    </label>
                    <input
                      type="number"
                      className="form-control dummy"
                      name="course_validity"
                      placeholder="Enter Course Validity in days"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 mb-3">
                  <div className="form-group">
                    <label className="mont-font form-label fw-600 font-xsss">
                      Course Video
                    </label>
                    <input
                      type="text"
                      className="form-control dummy"
                      placeholder="Select Course Image"
                      value={formData.subject_video_name}
                      onClick={() =>
                        document.getElementById('subjectVideoInput').click()
                      }
                      readOnly
                    />
                    <input
                      type="file"
                      className="custom-file-input"
                      name="subject_image"
                      onChange={handleVideoChange}
                      style={{ display: 'none' }}
                      id="subjectVideoInput"
                    />
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Benefits
                    </label>
                    <TextEditor
                      initialValue={formData.benefits || 'default value'}
                      onContentChange={(html) =>
                        handleTextEditorChange('benefits', html)
                      }
                    />

                    {validationErrors.benefits && (
                      <span className="text-danger">
                        {validationErrors.benefits}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-lg-12 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Description
                    </label>
                    <TextEditor
                      initialValue={formData.description || 'default value'}
                      onContentChange={(html) =>
                        handleTextEditorChange('description', html)
                      }
                    />

                    {validationErrors.description && (
                      <span className="text-danger">
                        {validationErrors.description}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-12 mb-0 mt-2 pl-0">
                <button
                  type="submit"
                  className="bg-current border-0 text-center float-right text-white font-xsss fw-600 p-3 w150 rounded-lg d-inline-block"
                  disabled={loading}
                >
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
