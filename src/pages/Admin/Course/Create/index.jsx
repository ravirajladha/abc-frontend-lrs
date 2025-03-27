import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

import { createCourse } from '@/api/admin';
import { ContentHeader, TextEditor } from '@/components/common';
import { fetchTrainersDropdown } from '@/api/common';
import { SelectInput } from '@/components/common/form';
// import COURSE_TYPES from '@/utils/constants/courseType.constants';

function Create({ title }) {
  const navigate = useNavigate();
  const { subjectId } = useParams();
  const fileInputRef = useRef();
  // const [showSuperCourse, setShowSuperCourse] = useState(false);
  // const [superCourses, setSuperCourses] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [formData, setFormData] = useState({
    course_name: '',
    course_image: null,
    course_image_name: '',
    benefits: '',
    description: '',
    course_video: '',
    course_video_name: '',
    access_validity: '',
    trainer_id: '',
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loader state

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      subject_id: subjectId,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        course_image: file,
        course_image_name: file.name,
      });
    }
  };

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        course_video: file,
        course_video_name: file.name,
      });
    }
  };

  const handleTextEditorChange = (field, content) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: content,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const submissionData = new FormData();
    submissionData.append('course_name', formData.course_name);
    submissionData.append('course_image', formData.course_image);
    submissionData.append('course_video', formData.course_video);
    submissionData.append('subject_id', subjectId);
    submissionData.append('benefits', formData.benefits);
    submissionData.append('description', formData.description);
    submissionData.append('access_validity', formData.access_validity);
    submissionData.append('trainer_id', formData.trainer_id);

    try {
      const response = await createCourse(submissionData);
      toast.success('Course added successfully', response);
      navigate(`/admin/subjects/${subjectId}/courses`);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      }
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const data = await fetchTrainersDropdown();
      setTrainers(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
                        {validationErrors.course_name}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 mb-3">
                  <div className="form-group">
                    <label className="mont-font form-label fw-600 font-xsss">
                      Course Image
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Select Course Image"
                      value={formData.course_image_name}
                      onClick={() =>
                        document.getElementById('courseImageInput').click()
                      }
                      readOnly
                    />
                    <input
                      type="file"
                      className="custom-file-input"
                      name="course_image"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      id="courseImageInput"
                      accept='jpeg,png,jpg,gif,image/*'
                    />
                    {validationErrors.course_image && (
                      <span className="text-danger">
                        {validationErrors.course_image}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Course Validity
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="access_validity"
                      value={formData.access_validity}
                      onChange={handleFormChange}
                      placeholder="Enter Course Validity in days"
                    />
                    {validationErrors.access_validity && (
                      <span className="text-danger">
                        {validationErrors.access_validity}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 mb-3">
                  <div className="form-group">
                    <label className="mont-font form-label fw-600 font-xsss">
                      Course Video
                    </label>
                    <input
                      type="text"
                      className="form-control dummy"
                      placeholder="Select Course Video"
                      value={formData.course_video_name}
                      onClick={() =>
                        document.getElementById('courseVideoInput').click()
                      }
                      readOnly
                    />
                    <input
                      type="file"
                      className="custom-file-input"
                      name="course_video"
                      onChange={handleVideoChange}
                      style={{ display: 'none' }}
                      id="courseVideoInput"
                      accept="video/mp4,video/x-m4v,video/*"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Trainer
                    </label>
                    <select
                      className="form-control"
                      value={formData.trainer_id}
                      onChange={handleFormChange}
                      name='trainer_id'
                    >
                      <option value="">Select Trainer</option>
                      {trainers.map((trainer) => (
                        <option key={trainer.id} value={trainer.id}>
                          {trainer.username}
                        </option>
                      ))}
                    </select>
                    {validationErrors.trainer_id && (
                      <span className="text-danger">
                        {validationErrors.trainer_id}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Benefits
                    </label>
                    <TextEditor
                      initialValue={formData.benefits || ''}
                      onContentChange={(html) =>
                        handleTextEditorChange('benefits', html)
                      }
                    />
                    {validationErrors.benefits && (
                      <span className="text-danger">
                        {validationErrors.benefits}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-lg-12 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Description
                    </label>
                    <TextEditor
                      initialValue={formData.description || ''}
                      onContentChange={(html) =>
                        handleTextEditorChange('description', html)
                      }
                    />
                    {validationErrors.description && (
                      <span className="text-danger">
                        {validationErrors.description}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-12 mb-0 mt-2 pl-0">
                <button
                  type="submit"
                  className="bg-current border-0 text-center float-right text-white font-xsss fw-600 p-3 w150 rounded-lg d-inline-block"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      {' '}
                      <Spinner
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="mr-2"
                      />
                    </>
                  ) : (
                    <>
                      <i className="feather-save mr-2"></i> Save
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

Create.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Create;
