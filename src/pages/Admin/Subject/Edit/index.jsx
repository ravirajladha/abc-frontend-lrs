import { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { fetchSubjectData } from '@/api/common';
import { updateSubject } from '@/api/admin';
import { ContentHeader, ContentLoader } from '@/components/common';

function Edit({ title }) {
  const { classId, subjectId } = useParams();
  const [formData, setFormData] = useState({
    subject_name: '',
    subject_image: null,
    subject_image_name: '',
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const imageRef = useRef(null);

  const navigate = useNavigate();

  const getSubjectDetails = useCallback(async () => {
    try {
      const subjectData = await fetchSubjectData(subjectId);
      setFormData({
        ...formData,
        subject_name: subjectData.name,
      });
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }, [formData, subjectId]);

  useEffect(() => {
    getSubjectDetails();
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
        subject_image: file,
        subject_image_name: file.name,
      });
      setSelectedImage(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const submissionData = new FormData();
      submissionData.append('_method', 'PUT');
      submissionData.append('class_id', classId);
      submissionData.append('subject_name', formData.subject_name);
      if (selectedImage) {
        submissionData.append('subject_image', selectedImage);
      }
      const response = await updateSubject(subjectId, submissionData);

      toast.success('Course updated successfully', response);
      navigate(`/admin/classes/${classId}/subjects`);
      setFormData({
        subject_name: '',
        subject_image: null,
        subject_image_name: '',
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
                      name="subject_name"
                      value={formData.subject_name}
                      onChange={handleFormChange}
                      placeholder="Enter Course Name"
                    />
                    {validationErrors.subject_name && (
                      <span className="text-danger">
                        {validationErrors.subject_name}
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
                    {validationErrors.subject_image && (
                      <span className="text-danger">
                        {validationErrors.subject_image}
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
