import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import {
  ContentFormWrapper,
  ContentHeader,
  ContentLoader,
} from '@/components/common';
import { SelectInput, FileInput } from '@/components/common/form';

import { createVideo } from '@/api/admin';
import {
  fetchAssessments,
  fetchEbooks,
  fetchElabs,
  fetchEbookModules,
  fetchEbookSections,
} from '@/api/dropdown';

function CreateContentForm() {
  const { subjectId, courseId, chapterId } = useParams();
  const [assessments, setAssessments] = useState([]);
  const [ebooks, setEbooks] = useState([]);
  const [elabs, setElabs] = useState([]);
  const [ebookModules, setEbookModules] = useState([]);
  const [ebookSections, setEbookSections] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);
  const [formData, setFormData] = useState({
    subject_id: subjectId || '',
    course_id: courseId || '',
    chapter_id: chapterId || '',
    title: '',
    description: '',
    url: '',
    assessment: '',
    elab_id: '',
    ebook_id: '',
    ebook_module_id: '',
    ebook_section_id: '',
    resource: '',
  });
  const [showAssessmentDropdown, setShowAssessmentDropdown] = useState(false);
  const [showEbookDropdown, setShowEbookDropdown] = useState(false);
  const [showElabDropdown, setShowElabDropdown] = useState(false);
  const [showResourceInput, setShowResourceInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (courseId) {
      fetchAssessments(courseId)
        .then((data) => {
          setAssessments(data.assessments);
        })
        .catch((error) => {
          toast.error(error.message);
        });

      fetchEbooks(courseId)
        .then((data) => {
          setEbooks(data.ebooks);
        })
        .catch((error) => {
          toast.error(error.message);
        });
      fetchElabs(courseId)
        .then((data) => {
          setElabs(data.elabs);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }, [courseId]);

  const handleElabCheckbox = () => {
    setShowElabDropdown(!showElabDropdown);
  };

  const handleAssessmentCheckbox = useCallback(() => {
    setShowAssessmentDropdown((prev) => !prev);
  }, []);

  const handleResourceCheckbox = () => {
    setShowResourceInput(!showResourceInput);
  };

  const handleFileChange = useCallback((file) => {
    setFormData((prevData) => ({
      ...prevData,
      url: file || '',
    }));
    setSelectedVideo(file);
  }, []);

  const handleResourceChange = useCallback((event) => {
    const file = event.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      resource: file || '',
    }));
    setSelectedResource(file);
  }, []);

  const handleAssessmentChange = useCallback(({ target: { value } }) => {
    setFormData((prevData) => ({ ...prevData, assessment: value }));
  }, []);

  const handleElabChange = useCallback(({ target: { value } }) => {
    setFormData((prevData) => ({ ...prevData, elab_id: value }));
  }, []);

  const handleEbookCheckbox = useCallback(() => {
    setShowEbookDropdown((prev) => !prev);
  }, []);

  const handleEbookChange = useCallback((field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    if (field === 'ebook_id') {
      fetchEbookModules(value)
        .then((data) => {
          setEbookModules(data.ebook_modules);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }, []);

  const handleEbookModuleChange = useCallback((field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    if (field === 'ebook_module_id') {
      fetchEbookSections(value)
        .then((data) => {
          setEbookSections(data.ebook_sections);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }, []);

  const handleEbookSectionChange = useCallback((field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const submissionData = new FormData();

      submissionData.append('subject_id', subjectId);
      submissionData.append('course_id', courseId);
      submissionData.append('chapter_id', chapterId);
      submissionData.append('title', formData.title);
      submissionData.append('description', formData.description);

      if (formData.url) {
        submissionData.append('url', formData.url);
      }

      if (showAssessmentDropdown && formData.assessment) {
        submissionData.append('assessment', formData.assessment);
      }

      if (showElabDropdown && formData.elab_id) {
        submissionData.append('elab_id', formData.elab_id);
      }

      if (
        showEbookDropdown &&
        formData.ebook_id &&
        formData.ebook_module_id &&
        formData.ebook_section_id
      ) {
        submissionData.append('ebook_id', formData.ebook_id);
        submissionData.append('ebook_module_id', formData.ebook_module_id);
        submissionData.append('ebook_sections', formData.ebook_section_id);
      }
      console.log("submission data from creating the video", submissionData);
      const response = await createVideo(submissionData);
      toast.success(response.message);
      clearForm();
      clearSelectedVideo();
      setIsSubmitting(false);
      navigate(
        `/admin/subjects/${subjectId}/courses/${courseId}/chapters/${chapterId}`
      );
    } catch (error) {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      }
      console.error('Error:', error.message);
      toast.error('Error submitting the form. Please try again.');
      setIsSubmitting(false);
    }
  };

  const clearSelectedVideo = useCallback(() => {
    setSelectedVideo(null);
  }, []);

  const clearForm = useCallback(() => {
    setFormData((prevData) => ({
      ...prevData,
      title: '',
      description: '',
      url: '',
      assessment: '',
    }));
    setShowAssessmentDropdown(false);
  }, []);

  return (
    <div>
      <ContentHeader title="Create Content" />
      <ContentFormWrapper formTitle="New Content">
        {isSubmitting && (
          <div
            className="position-absolute w-100 py-5 px-4 mx-5 z-index-1"
            style={{ bottom: '50%' }}
          >
            <p className="text-center">Uploading contents..</p>
            <ContentLoader />
          </div>
        )}
        <form
          id="createForm"
          onSubmit={handleSubmit}
          className={isSubmitting ? 'blurred-form' : ''}
          autoComplete="off"
        >
          <div className="row">
            <div className="col-lg-6 mb-2">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Content Name *
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="contentName"
                  placeholder="Enter Content Name"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
                {validationErrors.title && (
                  <div className="invalid-feedback">
                    {validationErrors.title}
                  </div>
                )}
              </div>
            </div>

            <div className="col-lg-6 mb-2">
              <FileInput
                fileTypes="video"
                onSelectFile={handleFileChange}
                selectedFile={selectedVideo}
                clearSelectedFile={clearSelectedVideo}
              />
              {validationErrors.url && (
                <div className="invalid-feedback">{validationErrors.url}</div>
              )}
            </div>

            <div className="col-lg-12 mb-2">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Content Description *
                </label>

                <textarea
                  className="form-control mb-0 p-3 h100 lh-16"
                  name="contentDescription"
                  placeholder="Enter Content Description"
                  rows="4"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
                {validationErrors.description && (
                  <div className="invalid-feedback">
                    {validationErrors.description}
                  </div>
                )}
              </div>
            </div>

            <div className="col-lg-4 mb-2">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Assessment</label>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="assessmentCheckbox"
                    onChange={handleAssessmentCheckbox}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="assessmentCheckbox"
                  >
                    Has Assessment?
                  </label>
                </div>
                {showAssessmentDropdown && (
                  <SelectInput
                    className="form-control"
                    options={assessments}
                    name="selectedAssessment"
                    label="title"
                    value={formData.assessment || ''}
                    onChange={handleAssessmentChange}
                    placeholder="Select Assessment"
                  />
                )}
              </div>
            </div>

            <div className="col-lg-4 mb-2">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">eLab</label>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="eLabCheckbox"
                    onChange={handleElabCheckbox}
                  />
                  <label className="form-check-label" htmlFor="eLabCheckbox">
                    Has eLab?
                  </label>
                </div>
                {showElabDropdown && (
                  <SelectInput
                    className="form-control"
                    options={elabs}
                    name="selectedElab"
                    label="title"
                    value={formData.elab_id || ''}
                    onChange={handleElabChange}
                    placeholder="Select Elab"
                  />
                )}
              </div>
            </div>
            <div className="col-lg-4 mb-2">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Resource</label>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="eLabCheckbox"
                    onChange={handleResourceCheckbox}
                  />
                  <label className="form-check-label" htmlFor="eLabCheckbox">
                    Has Resource?
                  </label>
                </div>
                {showResourceInput && (
                  <>
                   <input
                     type="file"
                     name="image"
                     id="file"
                     className="input-file"
                     onChange={handleResourceChange}
                     accept=".zip"
                   />
                   <label
                     htmlFor="file"
                     className="rounded-lg text-center bg-white btn-tertiary js-labelFile w-100 border-dashed"
                   >
                     <i className="ti-cloud-down small-icon mr-3"></i>
                     <span className="js-fileName">
                       {formData.resource ? (
                         <>{formData.resource.name} </>
                       ) : (
                         'Click to Upload an zip file'
                       )}
                     </span>
                   </label>
                  </>
                   
                )}
              </div>
            </div>

            {/* Has eBook  */}

            <div className="col-lg-12 mb-2">
              <label className="mont-font fw-600 font-xsss">eBook</label>
              <div className="form-group">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="ebookCheckbox"
                    onChange={handleEbookCheckbox}
                  />
                  <label className="form-check-label" htmlFor="ebookCheckbox">
                    Has eBook?
                  </label>
                </div>
              </div>
              {showEbookDropdown && (
                <div className="row">
                  {/* Select eBook  */}
                  <div className="col-lg-4 mb-2">
                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss">
                        eBooks
                      </label>

                      <SelectInput
                        className="form-control"
                        options={ebooks}
                        name="ebook"
                        label="title"
                        value={formData.ebook_id || ''}
                        onChange={(e) =>
                          handleEbookChange('ebook_id', e.target.value)
                        }
                        placeholder="Select Ebook"
                      />
                    </div>
                  </div>
                  {/* Select eBook Module */}
                  <div className="col-lg-4 mb-2">
                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss">
                        eBook Modules
                      </label>

                      <SelectInput
                        className="form-control"
                        options={ebookModules}
                        name="ebookModule"
                        label="title"
                        value={formData.ebook_module_id || ''}
                        onChange={(e) =>
                          handleEbookModuleChange(
                            'ebook_module_id',
                            e.target.value
                          )
                        }
                        placeholder="Select Ebook Modules"
                        fallbackPlaceholder="Select Ebook First"
                      />
                    </div>
                  </div>
                  {/* Select eBook Section */}
                  <div className="col-lg-4 mb-2">
                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss">
                        eBook Sections
                      </label>

                      <SelectInput
                        className="form-control"
                        options={ebookSections}
                        name="ebookSection"
                        label="title"
                        value={formData.ebook_section_id || ''}
                        onChange={(e) =>
                          handleEbookSectionChange(
                            'ebook_section_id',
                            e.target.value
                          )
                        }
                        placeholder="Select Ebook Sections"
                        fallbackPlaceholder="Select Ebook Modules First"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="col-lg-12">
              <button
                type="submit"
                className="bg-current border-0 float-right text-center text-white font-xsss fw-600 px-3 py-2 w100 rounded-lg d-inline-block"
              >
                <i className="feather-save mr-2"></i> Save
              </button>
            </div>
          </div>
        </form>
      </ContentFormWrapper>
    </div>
  );
}

export default CreateContentForm;
