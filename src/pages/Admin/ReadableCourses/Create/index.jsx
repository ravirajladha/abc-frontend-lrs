import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { ContentFormWrapper, ContentHeader } from '@/components/common';
import { SaveButton, SelectInput } from '@/components/common/form';

import { fetchClasses, fetchSubjects } from '@/api/dropdown';
import { createReadableCourses } from '@/api/admin';
import {
  fetchEbooks,
  fetchProjectReports,
  fetchCaseStudies,
} from '@/api/dropdown';
function Create() {
  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    class: '',
    subject: '',
    ebook: '',
    projectReport: '',
    caseStudy: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const [ebooks, setEbooks] = useState([]);
  const [projectReports, setProjectReports] = useState([]);
  const [caseStudies, setCaseStudies] = useState([]);

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
      ebook: '',
    projectReport: '',
    caseStudy: '',
    });
    setSelectedImage(null);
  };

  const handleClassChange = ({ target: { value } }) => {
    setValidationErrors(({ class: _, ...prevErrors }) => prevErrors);
    setFormData({
      class: value,
      subject: '',
      ebook: '',
    projectReport: '',
    caseStudy: '',
    });

    fetchSubjectsDropdownData(value);
  };

  const handleSubjectChange = ({ target: { value } }) => {
    setFormData((prevData) => ({ ...prevData, subject: value }));
    setValidationErrors(({ subject: _, ...prevErrors }) => prevErrors);

    fetchEbooks(value)
      .then((data) => {
        setEbooks(data.ebooks);
      })
      .catch((error) => {
        toast.error(error.message);
      });

    fetchProjectReports(value)
      .then((data) => {
        setProjectReports(data.projectReports);
      })
      .catch((error) => {
        toast.error(error.message);
      });

    fetchCaseStudies(value)
      .then((data) => {
        setCaseStudies(data.caseStudies);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleInputChange = (e,fieldName) => {
    const value = e.target.value;
    setFormData((prevData) => ({ ...prevData, [fieldName]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submissionData = new FormData();
      submissionData.append('class', formData.class);
      submissionData.append('subject', formData.subject);
      submissionData.append('ebook', formData.ebook);
      submissionData.append('project_report', formData.projectReport);
      submissionData.append('case_study', formData.caseStudy);

      const response = await createReadableCourses(submissionData);
      toast.success(response.message);

      clearForm();
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1500);
      navigate('/admin/readable-courses');
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
      <ContentHeader title="Create Readable Courses" />
      <ContentFormWrapper formTitle="New Readable Courses">
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="row">
            <div className="col-lg-6 mb-2">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Select Subject
                </label>
                <SelectInput
                  className="form-control"
                  options={classes}
                  name="class"
                  label="name"
                  value={formData.class}
                  onChange={handleClassChange}
                  placeholder="Select Subject"
                />
                {validationErrors.class && (
                  <span className="text-danger">   Subject empty or not found.</span>
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
                  options={subjects}
                  name="subject"
                  label="name"
                  value={formData.subject || ''}
                  onChange={handleSubjectChange}
                  placeholder="Select Course"
                />
                {validationErrors.subject && (
                  <span className="text-danger">
                       Course empty or not found.
                  </span>
                )}
              </div>
            </div>
            <div className="col-lg-6 mb-2">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Select Ebook
                </label>
                {ebooks && (
                  <SelectInput
                    className="form-control"
                    options={ebooks}
                    name="ebook"
                    label="title"
                    value={formData.ebook || ''}
                    onChange={(e) => handleInputChange(e,'ebook')}
                    placeholder="Select Ebook"
                  />
                )}

                {validationErrors.ebook && (
                  <span className="text-danger">
                    {validationErrors.ebook}
                  </span>
                )}
              </div>
            </div>
            <div className="col-lg-6 mb-2">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Select Project Report
                </label>
                {projectReports && (
                  <SelectInput
                    className="form-control"
                    options={projectReports}
                    name="projectReport"
                    label="title"
                    value={formData.projectReport || ''}
                    onChange={(e) => handleInputChange(e,'projectReport')}
                    placeholder="Select Project Report"
                  />
                )}
                {validationErrors.projectReport && (
                  <span className="text-danger">
                    {validationErrors.projectReport}
                  </span>
                )}
              </div>
            </div>
            <div className="col-lg-6 mb-2">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Select Case Study
                </label>
                {caseStudies && (
                  <SelectInput
                    className="form-control"
                    options={caseStudies}
                    name="caseStudy"
                    label="title"
                    value={formData.caseStudy || ''}
                    onChange={(e) => handleInputChange(e,'caseStudy')}
                    placeholder="Select Case Study"
                  />
                )}

                {validationErrors.caseStudy && (
                  <span className="text-danger">
                    {validationErrors.caseStudy}
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
