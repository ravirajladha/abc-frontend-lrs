import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ContentFormWrapper, ContentHeader } from '@/components/common';
import { SaveButton } from '@/components/common/form';
import { createZoomCall } from '@/api/admin';

function Create() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    url: '',
    date: '',
    time: '',
    password: '', // Assuming you want to use password field for passcode
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const clearForm = () => {
    setFormData({
      url: '',
      date: '',
      time: '',
      password: '',
    });
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
      submissionData.append('passcode', formData.password); // Passcode

      const response = await createZoomCall(submissionData);
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

  return (
    <div>
      <ContentHeader title="Create Live Sessions" />
      <ContentFormWrapper formTitle="New Live Sessions">
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
    </div>
  );
}

export default Create;
