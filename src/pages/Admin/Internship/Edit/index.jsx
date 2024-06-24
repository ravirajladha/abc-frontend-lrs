import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

import { useNavigate, useParams } from 'react-router-dom';

import {
  ContentFormWrapper,
  ContentHeader,
  ContentLoader,
} from '@/components/common';
import { SaveButton, SelectInput } from '@/components/common/form';

import { getInternshipDetail, editInternship } from '@/api/admin';
function Edit(props) {
  const { title } = props; // Destructure title from props
  console.log(title);
  console.log(title);
  const navigate = useNavigate();
  const { internshipId } = useParams();

  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: '',
    is_active: '',
  });
  const imageRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const fetchInternshipData = useCallback(async () => {
    try {
      const internshipData = await getInternshipDetail(internshipId);
      console.log('internshipData', internshipData.internship);
      if (internshipData) {
        const updatedForm = {
          className: internshipData.miniProject.class_name || '',
          // subjectName: internshipData.miniProject.subject_name || '',
          name: internshipData.miniProject.name || '',
          description: internshipData.miniProject.description || '',
          is_active: internshipData.miniProject.is_active,
          image: internshipData.miniProject.image || '',
        };
        console.log(updatedForm, "udpatedform")
        setFormData(updatedForm);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching Internship data:', error);
      setLoading(false);
    }
  }, [internshipId]);

  useEffect(() => {
    fetchInternshipData();
  }, [fetchInternshipData]);

  //emptying the state after updating the form, good practice

  const clearForm = () => {
    setFormData({
      className: '',
      // subjectName: '',
      name: '',
      image: '',
      description: '',
      is_active: '',
    });
    setSelectedImage(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setSelectedImage(selectedImage);
  };

  const handleDropdownChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      is_active: selectedOption.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submissionData = new FormData();
      submissionData.append('name', formData.name);
      submissionData.append('description', formData.description);
      submissionData.append('is_active', formData.is_active);

      if (selectedImage) {
        submissionData.append('image', selectedImage);
      }

      const response = await editInternship(internshipId, submissionData);
      toast.success('Internship Updated Successfully', response.message);

      clearForm();
      setIsSubmitting(false); // Move this outside the setTimeout

      console.log('response', response);
      navigate(`/admin/internships`);
    } catch (error) {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      }
      console.error('Error:', error.message);
      toast.error('Error submitting the form. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <ContentHeader title={title} />
      <ContentFormWrapper formTitle="Update Internship">
        {loading ? (
          <div className="my-5">
            <ContentLoader />
          </div>
        ) : (
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Class:{' '}
                    <span className="font-italic text-dark">
                      {formData.className}
                    </span>
                  </label>
                </div>
              </div>

              {/* Select Subject */}
              {/* <div className="col-6">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Subject:{' '}
                    <span className="font-italic text-dark">
                      {formData.subjectName}
                    </span>
                  </label>
                </div>
              </div> */}

              <div className="col-lg-6 mb-2">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Internship Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Enter Internship Name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  {validationErrors.name && (
                    <span className="text-danger">{validationErrors.name}</span>
                  )}
                </div>
              </div>

              <div className="col-lg-6 mb-2">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                  Internship Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="file"
                    className="input-file"
                    ref={imageRef}
                    onChange={handleImageChange}
                    accept=".jpg, .jpeg, .png"
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
                  {validationErrors.image && (
                    <span className="text-danger">
                      {validationErrors.image}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-lg-12 mb-2">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Description <span className="text-danger">*</span></label>
                <textarea
                  className="form-control mb-0 p-3 h100 lh-16"
                  name="description"
                  placeholder="Enter Description"
                  rows="4"
                  value={formData.description}
                  onChange={handleInputChange}
                />
                {validationErrors.description && (
                  <span className="text-danger">{validationErrors.description}</span>
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
                    name="is_active"
                    value={formData.is_active}
                    onChange={handleDropdownChange}
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
              </div>

              <SaveButton isSubmitting={isSubmitting} />
            </div>
          </form>
        )}
      </ContentFormWrapper>
    </div>
  );
}
export default Edit;
