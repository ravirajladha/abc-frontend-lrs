import { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { fetchCourseData } from '@/api/common'; // Fetch data for the subject
import { updateCourse } from '@/api/admin'; // Update the course
import { ContentHeader, ContentLoader } from '@/components/common';

function Edit({ title }) {
  const { subjectId, courseId } = useParams(); // Parameters are now subjectId and courseId
  const [formData, setFormData] = useState({
    course_name: '',
    course_image: null,
    course_image_name: '',
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const imageRef = useRef(null);

  const navigate = useNavigate();

  const getCourseDetails = useCallback(async () => {
    try {
      const courseData = await fetchCourseData(courseId); // Fetching subject data for the course
      setFormData({
        ...formData,
        course_name: courseData.name,
      });
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }, [formData, courseId]);

  useEffect(() => {
    getCourseDetails();
  }, []);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        course_image: file,
        course_image_name: file.name,
      });
      setSelectedImage(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const submissionData = new FormData();
      submissionData.append('_method', 'PUT');
      submissionData.append('subject_id', subjectId); // Updated to subject_id
      submissionData.append('course_name', formData.course_name);
      if (selectedImage) {
        submissionData.append('course_image', selectedImage); // Updated to course_image
      }
      const response = await updateCourse(courseId, submissionData); // Updated to updateCourse

      toast.success('Course updated successfully', response);
      navigate(`/admin/subjects/${subjectId}/courses`);
      setFormData({
        course_name: '',
        course_image: null,
        course_image_name: '',
      });
    } catch (error) {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      }
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center px-2 my-5">
        <ContentLoader />
      </div>
    );
  }

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
                      name="course_name"
                      value={formData.course_name}
                      onChange={handleFormChange}
                      placeholder="Enter Course Name"
                    />
                    {validationErrors.course_name && (
                      <span className="text-danger">
                        Course name is required or not found
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-lg-6 mb-2">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Course Image
                    </label>
                    <input
                      type="file"
                      name="image"
                      id="file"
                      className="input-file"
                      ref={imageRef}
                      onChange={handleImageChange}
                    />
                    <label
                      htmlFor="file"
                      className="rounded-lg text-center bg-white btn-tertiary js-labelFile py-1 w-100 border-dashed"
                    >
                      <i className="ti-cloud-down small-icon mr-3"></i>
                      <span className="js-fileName">
                        {selectedImage ? (
                          <>
                            {selectedImage.name}{' '}
                            <img
                              src={URL.createObjectURL(selectedImage)}
                              alt="thumbnail"
                              width="20"
                              height="20"
                            />
                          </>
                        ) : (
                          'Click to select an image'
                        )}
                      </span>
                    </label>
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
                  className="bg-current float-right border-0 text-center text-white font-xsss fw-600 p-3 w150 rounded-lg d-inline-block"
                >
                  <i className="feather-save mr-2"></i> Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

Edit.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Edit;
