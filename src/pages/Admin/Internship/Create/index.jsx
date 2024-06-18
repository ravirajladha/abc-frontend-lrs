import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { ContentFormWrapper, ContentHeader } from '@/components/common';
import { SaveButton, SelectInput } from '@/components/common/form';

import { fetchClasses } from '@/api/dropdown';
import { createInternship } from '@/api/admin';

function Create() {
  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);
  // const [subjects, setSubjects] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    class: '',
    // subject: '',
    name: '',
    image: '',
    description: '',
  });
  const imageRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

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

  // const fetchSubjectsDropdownData = useCallback((classId) => {
  //   fetchSubjects(classId)
  //     .then((data) => {
  //       setSubjects(data.subjects);
  //     })
  //     .catch((error) => {
  //       toast.error(error.message);
  //     });
  // }, []);

  const clearForm = () => {
    setFormData({
      class: '',
      // subject: '',
      name: '',
      image: '',
      description: '',
    });
    setSelectedImage(null);
  };

  const handleClassChange = ({ target: { value } }) => {
    setValidationErrors(({ class: _, ...prevErrors }) => prevErrors);
    setFormData({
      class: value,
      // subject: '',
      name: '',
      image: null,
      description: '',
    });

    // fetchSubjectsDropdownData(value);
  };

  // const handleSubjectChange = ({ target: { value } }) => {
  //   setFormData((prevData) => ({ ...prevData, subject: value }));
  //   setValidationErrors(({ subject: _, ...prevErrors }) => prevErrors);
  // };

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
      submissionData.append('class', formData.class);
      // submissionData.append('subject', formData.subject);
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

  return (
    <div>
      <ContentHeader title="Create Internship" />
      <ContentFormWrapper formTitle="New Internship">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 mb-2">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Select Class <span className="text-danger">*</span>
                </label>
                <SelectInput
                  className="form-control"
                  options={classes}
                  name="class"
                  label="name"
                  value={formData.class}
                  onChange={handleClassChange}
                  placeholder="Select Class"
                />
                {validationErrors.class && (
                  <span className="text-danger">{validationErrors.class}</span>
                )}
              </div>
            </div>
            {/* <div className="col-lg-6 mb-2">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Select Subject
                </label>
                <SelectInput
                  className="form-control"
                  options={subjects}
                  name="subject"
                  label="name"
                  value={formData.subject || ''}
                  onChange={handleSubjectChange}
                  placeholder="Select Subject"
                />
                {validationErrors.subject && (
                  <span className="text-danger">
                    {validationErrors.subject}
                  </span>
                )}
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
            <SaveButton isSubmitting={isSubmitting} />
          </div>
        </form>
      </ContentFormWrapper>
    </div>
  );
}

export default Create;
