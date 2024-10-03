import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { debounce } from 'lodash';
import {
  ContentFormWrapper,
  ContentHeader,
  ContentLoader,
} from '@/components/common';
import { SelectInput, FileInput } from '@/components/common/form';

import { updateVideo, fetchVideoDetails } from '@/api/admin';
import {
  fetchAssessments,
  fetchEbooks,
  fetchEbookModules,
  fetchEbookSections,
  fetchElabs,
} from '@/api/dropdown';

function EditContentForm() {
  const navigate = useNavigate();

  const { subjectId, courseId, chapterId, contentId } = useParams();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [elabs, setElabs] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [ebooks, setEbooks] = useState([]);
  const [ebookModules, setEbookModules] = useState([]);
  const [ebookSections, setEbookSections] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    assessment: '',
    ebook_id: '',
    elab_id: '',
    ebook_module_id: '',
    ebook_section_id: '',
  });

  const [showAssessmentDropdown, setShowAssessmentDropdown] = useState(false);
  const [showEbookDropdown, setShowEbookDropdown] = useState(false);
  const [showElabDropdown, setShowElabDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const getContentDetails = useCallback(() => {
    return fetchVideoDetails(contentId)
      .then((data) => {
        setFormData({
          title: data.video.title,
          description: data.video.description,
        });

        if (data?.video && data?.video?.assessment_id) {
          handleAssessmentCheckbox();
          setFormData((prevData) => ({
            ...prevData,
            assessment: data.video?.assessment_id,
          }));
        }

        if (data?.video && data?.video.ebook_id) {
          handleEbookCheckbox();
          setFormData((prevData) => ({
            ...prevData,
            ebook_id: data.video.ebook_id,
          }));
        }

        if (data?.video && data?.video?.ebook_module_id) {
          setFormData((prevData) => ({
            ...prevData,
            ebook_module_id: data.video?.ebook_module_id,
          }));
        }

        if (data?.video && data?.video?.ebook_sections) {
          setFormData((prevData) => ({
            ...prevData,
            ebook_section_id: data?.video?.ebook_sections,
          }));
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [contentId]);

  useEffect(() => {
    getContentDetails();
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

  useEffect(() => {
    setIsLoading(true);
    if (formData.ebook_id) {
      fetchEbookModules(formData.ebook_id)
        .then((data) => {
          setEbookModules(data.ebook_modules);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
    setIsLoading(false);
  }, [formData.ebook_id]);

  useEffect(() => {
    setIsLoading(true);
    if (formData.ebook_module_id) {
      fetchEbookSections(formData.ebook_module_id)
        .then((data) => {
          setEbookSections(data.ebook_sections);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
    setIsLoading(false);
  }, [formData.ebook_module_id]);

  const handleAssessmentCheckbox = () => {
    fetchAssessments(courseId)
      .then((data) => {
        setAssessments(data.assessments);
      })
      .catch((error) => {
        toast.error(error.message);
      });
    setShowAssessmentDropdown(!showAssessmentDropdown);
  };

  const handleFileChange = (file) => {
    setFormData((prevData) => ({
      ...prevData,
      url: file ? file : '',
    }));
    setSelectedVideo(file);
  };

  const handleAssessmentChange = ({ target: { value } }) => {
    setFormData((prevData) => ({ ...prevData, assessment: value }));
  };

  const handleEbookCheckbox = () => {
    setShowEbookDropdown(!showEbookDropdown);
  };



  // const handleEbookModuleChange = useCallback(
  //   debounce((field, value) => {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       [field]: value,
  //       ['ebook_section_id']: '',
  //     }));
  //     if (field === 'ebook_module_id') {
  //       fetchEbookSections(value)
  //         .then((data) => {
  //           setEbookSections(data.ebook_sections);
  //         })
  //         .catch((error) => {
  //           toast.error(error.message);
  //         });
  //     }
  //   }, 300), []); // Adjust the debounce delay as needed
  
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
      ['ebook_section_id']: '',
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

  const handleEbookSectionChange = useCallback(
    debounce((field, value) => {
      setFormData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    }, 300),
    [] // The empty dependency array ensures the debounce function is not recreated on every render
  );

  const handleElabCheckbox = () => {
    setShowElabDropdown(!showElabDropdown);
  };
  const handleElabChange = useCallback(({ target: { value } }) => {
    setFormData((prevData) => ({ ...prevData, elab_id: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const submissionData = new FormData();
      submissionData.append('_method', 'PUT');
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

      const response = await updateVideo(contentId, submissionData);
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

  const clearSelectedVideo = () => {
    setSelectedVideo(null);
  };

  const clearForm = () => {
    setFormData({
      subject_id: '',
      course_id: '',
      chapter_id: '',
      title: '',
      description: '',
      url: '',
      assessment: '',
    });

    setShowAssessmentDropdown(false);
  };

  return (
    <div>
      <ContentHeader title="Edit Content" />
      <ContentFormWrapper formTitle={`Edit Content ${formData.title}`}>
        {isSubmitting && (
          <div
            className="position-absolute z-index-1"
            style={{ right: '50%', bottom: '50%' }}
          >
            <p className="text-center fw-700 font-xs">Uploading contents..</p>
            <ContentLoader />
          </div>
        )}
        <form
          id="createForm"
          onSubmit={handleSubmit}
          className={isSubmitting ? 'blurred-form' : ''}
          autoComplete="off"
        >
          {!isLoading ? (
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
              <div className="col-lg-6 mb-2">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Assessment
                  </label>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="assessmentCheckbox"
                      onChange={handleAssessmentCheckbox}
                      checked={formData.assessment}
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
                      name="selectedClass"
                      label="title"
                      value={formData.assessment || ''}
                      onChange={handleAssessmentChange}
                      placeholder="Select Assessment"
                    />
                  )}
                </div>
              </div>

              <div className="col-lg-6 mb-2">
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
                      checked={formData.ebook_id}
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
          ) : (
            <ContentLoader />
          )}
        </form>
      </ContentFormWrapper>
    </div>
  );
}

export default EditContentForm;
