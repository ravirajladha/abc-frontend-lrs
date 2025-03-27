import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ContentFormWrapper, ContentHeader } from '@/components/common';
import { SaveButton, SelectInput } from '@/components/common/form';
import { createZoomCall } from '@/api/admin';
import { fetchTrainerCourses, fetchTrainerSubjects } from '@/api/trainer';
import { fetchCourses, fetchSubjects } from '@/api/dropdown';
import { useSelector } from 'react-redux';
import { selectUserType } from '@/store/authSlice';
import { USER_TYPES } from '@/utils/constants';

function Create() {
  const authenticatedUserType = useSelector(selectUserType);

  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    url: '',
    date: '',
    time: '',
    password: '',
    subject: '',
    course: '',
    session_type: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const clearForm = () => {
    setFormData({
      url: '',
      date: '',
      time: '',
      password: '',
      subject: '',
      course: '',
      session_type: '',
    });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(formData);

    try {
      const submissionData = new FormData();
      submissionData.append('url', formData.url);
      submissionData.append('date', formData.date);
      submissionData.append('time', formData.time);
      submissionData.append('passcode', formData.password); // Passcode
      submissionData.append('subject_id', formData.subject);
      submissionData.append('course_id', formData.course);
      submissionData.append('session_type', formData.session_type);
      const response = await createZoomCall(submissionData);
      toast.success(response.message);

      clearForm();
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1500);
      navigate(-1);
    } catch (error) {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      }
      console.error('Error:', error.message);
      toast.error('Error submitting the form. Please try again.');
      setIsSubmitting(false);
    }
  };

  const fetchSubjectData = async () => {
    try {
      let response;
      if(authenticatedUserType === USER_TYPES.TRAINER){
        response = await fetchTrainerSubjects();
      }else{
        response = await fetchSubjects();
      }
      setSubjects(response.subjects);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      subject: '',
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    fetchCoursesDropdownData(value);
  };

  const fetchCoursesDropdownData = async (value) => {
    try {
      let response;
      if(authenticatedUserType === USER_TYPES.TRAINER){
        response = await fetchTrainerCourses(value);
      }else{
        response = await fetchCourses(value);
      }
      setCourses(response.courses);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjectData();
  }, []);

  return (
    <div>
      <ContentHeader title="Create Live Sessions" />
      <ContentFormWrapper formTitle="New Live Sessions">
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="row">
            <div className="col-lg-6 col-md-12 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Subject</label>
                <SelectInput
                  className="form-control"
                  options={subjects}
                  name="subject"
                  label="name"
                  value={formData.subject || ''}
                  onChange={handleSubjectChange}
                  placeholder="Select Subject"
                  required
                />
                {validationErrors.url && (
                  <span className="text-danger">
                    {validationErrors.subject}
                  </span>
                )}
              </div>
            </div>
            <div className="col-lg-6 col-md-12 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Course</label>
                <SelectInput
                  className="form-control"
                  options={courses}
                  name="course"
                  label="name"
                  value={formData.course || ''}
                  onChange={handleFormChange}
                  placeholder="Select course"
                  required
                />
                {validationErrors.url && (
                  <span className="text-danger">{validationErrors.course}</span>
                )}
              </div>
            </div>
            <div className="col-lg-6 col-md-12 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Session Type
                </label>
                <select
                  className="form-control"
                  name="session_type"
                  id=""
                  value={formData.session_type}
                  onChange={handleFormChange}
                >
                  <option value="">select</option>
                  <option value="1">Q&A Session</option>
                  <option value="2">Live Session</option>
                </select>
                {validationErrors.session_type && (
                  <span className="text-danger">
                    {validationErrors.session_type}
                  </span>
                )}
              </div>
            </div>
            <div className="col-lg-6 col-md-12 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Url</label>
                <input
                  type="text"
                  className="form-control"
                  name="url"
                  value={formData.url}
                  onChange={handleFormChange}
                  placeholder="Enter Url"
                />
                {validationErrors.url && (
                  <span className="text-danger">{validationErrors.url}</span>
                )}
              </div>
            </div>
            <div className="col-lg-6 col-md-12 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Password</label>
                <input
                  type="text"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleFormChange}
                  placeholder="Enter Password"
                />
                {validationErrors.password && (
                  <span className="text-danger">
                    {validationErrors.password}
                  </span>
                )}
              </div>
            </div>
            <div className="col-lg-6 col-md-12 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={formData.date}
                  onChange={handleFormChange}
                  placeholder="Enter Date"
                />
                {validationErrors.date && (
                  <span className="text-danger">{validationErrors.date}</span>
                )}
              </div>
            </div>
            <div className="col-lg-6 col-md-12 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Time</label>
                <input
                  type="time"
                  className="form-control"
                  name="time"
                  value={formData.time}
                  onChange={handleFormChange}
                  placeholder="Enter Time"
                />
                {validationErrors.time && (
                  <span className="text-danger">{validationErrors.time}</span>
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
