import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

import { createCourse } from '@/api/admin';
import { ContentHeader } from '@/components/common';

function Create({ title }) {
  const navigate = useNavigate();
  const { subjectId } = useParams();
  const fileInputRef = useRef();
  const [formData, setFormData] = useState({
    course_name: '',
    course_image: null,
    course_image_name: '',
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loader state
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      subject_id: subjectId,
    }));
  };

  const handleFileChange = (event) => {
    // Method to handle file changes
    const file = event.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        course_image: file,
        course_image_name: file.name,
      });
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const submissionData = new FormData();
    submissionData.append('course_name', formData.course_name);
    submissionData.append('course_image', formData.course_image);
    submissionData.append('subject_id', subjectId);

    try {
      const response = await createCourse(submissionData);
      toast.success('Courses added successfully', response);
      navigate(`/admin/subjects/${subjectId}/courses`);
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
                      Course Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="course_name"
                      value={formData.course_name}
                      onChange={handleFormChange}
                      placeholder="Enter Course Name"
                    />
                    {validationErrors.course_name && (
                      <span className="text-danger">
                        {validationErrors.course_name}
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
                      value={formData.course_image_name}
                      onClick={() =>
                        document.getElementById('courseImageInput').click()
                      }
                      readOnly
                    />
                    <input
                      type="file"
                      className="custom-file-input"
                      name="course_image"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      id="courseImageInput"
                    />
                    {validationErrors.course_image && (
                      <span className="text-danger">
                        {validationErrors.course_image}
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
