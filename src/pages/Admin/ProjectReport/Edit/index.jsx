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

import { fetchClasses, fetchSubjects } from '@/api/dropdown';
import { updateProjectReport, fetchProjectReportDetails } from '@/api/admin';

function Edit() {
  const navigate = useNavigate();
  const { projectReportId } = useParams();
  const [loading, setLoading] = useState(true);

  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    class: '',
    subject: '',
    title: '',
    image: '',
    description: '',
  });
  const imageRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetchProjectReportDetails(projectReportId);
      const projectReportData = response.project_report;
      fetchSubjectsDropdownData(projectReportData.subject_id);

      setFormData({
        class: projectReportData.class_id,
        subject: projectReportData.subject_id,
        title: projectReportData.project_report_title,
        image: null,
        description: projectReportData.project_report_description,
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
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
    fetchData();
    fetchClassDropdownData();
  }, []);

  const fetchSubjectsDropdownData = useCallback((classId) => {
    fetchSubjects(classId)
      .then((data) => {
        setSubjects(data.subjects);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  const clearForm = () => {
    setFormData({
      class: '',
      subject: '',
      title: '',
      image: '',
      description: '',
    });
    setSelectedImage(null);
  };

  const handleClassChange = ({ target: { value } }) => {
    setValidationErrors(({ class: _, ...prevErrors }) => prevErrors);
    setFormData({
      class: value,
      subject: '',
      title: '',
      image: null,
      description: '',
    });

    fetchSubjectsDropdownData(value);
  };

  const handleSubjectChange = ({ target: { value } }) => {
    setFormData((prevData) => ({ ...prevData, subject: value }));
    setValidationErrors(({ subject: _, ...prevErrors }) => prevErrors);
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
      submissionData.append('class', formData.class);
      submissionData.append('subject', formData.subject);
      submissionData.append('title', formData.title);
      submissionData.append('description', formData.description);

      if (selectedImage) {
        submissionData.append('image', selectedImage);
      }

      const response = await updateProjectReport(projectReportId, submissionData);
      toast.success(response.message);

      clearForm();
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1500);
      navigate('/admin/project-reports');
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
      <ContentHeader title="Edit Project Report" />
      {loading ? (
        <ContentLoader />
      ) : (
        <ContentFormWrapper formTitle="Update Project Report">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-6 mb-2">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Select Class
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
                    <span className="text-danger">
                      {validationErrors.class}
                    </span>
                  )}
                </div>
              </div>
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
              </div>
              <div className="col-lg-6 mb-2">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                  Project Report Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="Enter Project Report Title"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                  {validationErrors.title && (
                    <span className="text-danger">
                      {validationErrors.title}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-lg-6 mb-2">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                  Project Report Image
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
                  {validationErrors.image && (
                    <span className="text-danger">
                      {validationErrors.image}
                    </span>
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
      )}
    </div>
  );
}

export default Edit;
