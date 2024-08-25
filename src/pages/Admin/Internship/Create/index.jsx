import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { ContentFormWrapper, ContentHeader } from '@/components/common';
import { SaveButton, SelectInput } from '@/components/common/form';

import { fetchSubjects } from '@/api/dropdown';
import { createInternship } from '@/api/admin';

function Create() {
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    subject: '',
    name: '',
    image: '',
    description: '',
  });

  const [userType, setUserType] = useState('');
  const [showCorporate, setShowCorporate] = useState(false);
  const [showInstitute, setShowInstitute] = useState(false);

  const imageRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

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

  const clearForm = () => {
    setFormData({
      subject: '',
      name: '',
      image: '',
      description: '',
    });
    setSelectedImage(null);
  };

  const handleSubjectChange = ({ target: { value } }) => {
    setValidationErrors(({ subject: _, ...prevErrors }) => prevErrors);
    setFormData({
      subject: value,
      name: '',
      image: null,
      description: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setSelectedImage(selectedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submissionData = new FormData();
      submissionData.append('subject', formData.subject);
      submissionData.append('name', formData.name);
      submissionData.append('description', formData.description);

      if (selectedImage) {
        submissionData.append('image', selectedImage);
      }

      const response = await createInternship(submissionData);
      toast.success(response.message);

      clearForm();
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1500);
      navigate('/admin/internships');
    } catch (error) {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      }
      console.error('Error:', error.message);
      toast.error('Error submitting the form. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleUserTypeChange = (e) => {
    const value = e.target.value;
    setUserType(value);
    setShowCorporate(value === 'offline');
    setShowInstitute(value === 'offline');
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (name === 'corporate') {
      setShowCorporate(checked);
    } else if (name === 'institute') {
      setShowInstitute(checked);
    }
  };

  return (
    <div>
      <ContentHeader title="Create Internship" />
      <ContentFormWrapper formTitle="New Internship">
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="row">
            <div className="col-lg-6 mb-2">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Select Subject <span className="text-danger">*</span>
                </label>
                <SelectInput
                  className="form-control"
                  options={subjects}
                  name="subject"
                  label="name"
                  value={formData.subject}
                  onChange={handleSubjectChange}
                  placeholder="Select Subject"
                />
                {validationErrors.subject && (
                  <span className="text-danger">Subject must not be empty or found.</span>
                )}
              </div>
            </div>
            
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

            <div className="col-lg-12 mb-2">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Internship Image <span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  name="image"
                  id="file"
                  className="input-file"
                  ref={imageRef}
                  onChange={handleImageChange}
                  accept='.jpg, .jpeg, .png'
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
                  <span className="text-danger">{validationErrors.image}</span>
                )}
              </div>
            </div>
            <div className="col-lg-12 mb-2">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Description <span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control mb-0 p-3 h100 lh-16"
                  name="description"
                  placeholder="Enter Description"
                  rows="4"
                  value={formData.description}
                  onChange={handleInputChange}
                />
                {validationErrors.description && (
                  <span className="text-danger">
                    {validationErrors.description}
                  </span>
                )}
              </div>
            </div>

            <div className="col-lg-6 mb-3 dummy">
              <label htmlFor="userType">Select Type:</label>
              <select
                id="userType"
                className="form-control"
                value={userType}
                onChange={handleUserTypeChange}
              >
                <option value="">Select</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>

            {userType === 'offline' && (
              <div className="col-lg-6 mb-3 dummy">
                <label>Select Options:</label>
                <div>
                  <input
                    type="checkbox"
                    id="corporateCheckbox"
                    name="corporate"
                    checked={showCorporate}
                    onChange={handleCheckboxChange}
                  />{' '}
                  <label htmlFor="corporateCheckbox">Corporate</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="instituteCheckbox"
                    name="institute"
                    checked={showInstitute}
                    onChange={handleCheckboxChange}
                  />{' '}
                  <label htmlFor="instituteCheckbox">Academics</label>
                </div>
              </div>
            )}

            {showCorporate && (
              <div className="col-lg-6 mb-3 dummy">
                <label htmlFor="corporateSelect">Corporates:</label>
                <select id="corporateSelect" className="form-control">
                  <option value="">Select Corporate</option>
                  <option value="corporate1">Corporate 1</option>
                  <option value="corporate2">Corporate 2</option>
                </select>
              </div>
            )}

            {showInstitute && (
              <div className="col-lg-6 mb-3 dummy">
                <label htmlFor="instituteSelect">Select Academics:</label>
                <select id="instituteSelect" className="form-control">
                  <option value="">Select Institute</option>
                  <option value="institute1">Institute 1</option>
                  <option value="institute2">Institute 2</option>
                </select>
              </div>
            )}

            <div className="col-lg-12 text-center">
              <SaveButton isSubmitting={isSubmitting} />
            </div>
          </div>
        </form>
      </ContentFormWrapper>
    </div>
  );
}

export default Create;
