import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

import { ContentFormWrapper, ContentHeader, ContentLoader } from '@/components/common';
import { SaveButton } from '@/components/common/form';

import { fetchZoomCallDetail, updateZoomCall } from '@/api/admin';

function Create() {
  const { zoomCallId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    url: '',
    date: '',
    time: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const clearForm = () => {
    setFormData({
      url: '',
      date: '',
      time: '',
      password: '',
    });
  };

  const fetchData = async () => {
    try {
      const response = await fetchZoomCallDetail(zoomCallId);
      setFormData({
        url: response.zoomCall.url,
        date: response.zoomCall.date,
        time: response.zoomCall.time,
        password: response.zoomCall.passcode,
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submissionData = new FormData();
      submissionData.append('url', formData.url);
      submissionData.append('date', formData.date);
      submissionData.append('time', formData.time);
      submissionData.append('password', formData.password);

      const response = await updateZoomCall(submissionData, zoomCallId);
      toast.success(response.message);

      clearForm();
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1500);
      navigate('/admin/live-sessions');
    } catch (error) {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      }
      console.error('Error:', error.message);
      toast.error('Error submitting the form. Please try again.');
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <ContentHeader title="Update Live Sessions" />
      {loading ? (
        <ContentLoader />
      ) : (
        <ContentFormWrapper formTitle="Edit Live Sessions">
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="row">
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
                    <span className="text-danger">{validationErrors.password}</span>
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
      )}
    </div>
  );
}

export default Create;
