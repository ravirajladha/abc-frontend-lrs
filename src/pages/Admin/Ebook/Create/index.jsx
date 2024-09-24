import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { ContentFormWrapper, ContentHeader } from '@/components/common';
import { SaveButton, SelectInput } from '@/components/common/form';

import { fetchSubjects, fetchCourses } from '@/api/dropdown';
import { createEbook } from '@/api/admin';

function CreateEbook() {
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    subject: '',
    course: '',
    title: '',
    image: '',
    description: '',
  });
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

  const fetchCoursesDropdownData = useCallback((subjectId) => {
    fetchCourses(subjectId)
      .then((data) => {
        setCourses(data.courses);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  const clearForm = () => {
    setFormData({
      subject: '',
      course: '',
      title: '',
      image: '',
      description: '',
    });
    setSelectedImage(null);
  };

  const handleSubjectChange = ({ target: { value } }) => {
    setValidationErrors(({ subject: _, ...prevErrors }) => prevErrors);
    setFormData({
      subject: value,
      course: '',
      title: '',
      image: null,
      description: '',
    });

    fetchCoursesDropdownData(value);
  };

  const handleCourseChange = ({ target: { value } }) => {
    setFormData((prevData) => ({ ...prevData, course: value }));
    setValidationErrors(({ course: _, ...prevErrors }) => prevErrors);
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
      submissionData.append('course', formData.course);
      submissionData.append('title', formData.title);
      submissionData.append('description', formData.description);

      if (selectedImage) {
        submissionData.append('image', selectedImage);
      }

      const response = await createEbook(submissionData);
      toast.success(response.message);

      clearForm();
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1500);
      navigate('/admin/ebooks');
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
      <ContentHeader title="Create eBook" />
      <ContentFormWrapper formTitle="New eBook">
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="row">
            <div className="col-lg-6 mb-2">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Select Subject
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
                  <span className="text-danger"> Subject must not be empty</span>
                )}
              </div>
            </div>
            <div className="col-lg-6 mb-2">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Select Course
                </label>
                <SelectInput
                  className="form-control"
                  options={courses}
                  name="course"
                  label="name"
                  value={formData.course || ''}
                  onChange={handleCourseChange}
                  placeholder="Select Course"
                />
                {validationErrors.course && (
                  <span className="text-danger">
                    Course must not be empty.
                  </span>
                )}
              </div>
            </div>
            <div className="col-lg-6 mb-2">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  eBook Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  placeholder="Enter eBook Title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
                {validationErrors.title && (
                  <span className="text-danger">{validationErrors.title}</span>
                )}
              </div>
            </div>
            <div className="col-lg-6 mb-2">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  eBook Image
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
                  Description
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

export default CreateEbook;
