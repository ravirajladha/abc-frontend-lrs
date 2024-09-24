import React, { useState } from 'react';
import { SelectInput, SelectMultipleInput } from '@/components/common/form';
import {
  ContentFormWrapper,
  ContentHeader,
  ContentLoader,
} from '@/components/common';

const BulletinForm = (props) => {
  const [formData, setFormData] = useState({
    selectedClass: [],
    recruiter_id: '',
    test_id: '',
    bulletinType: '',
    telephonicDateTime: '',
    contactNumber: '',
    telephonicMessage: '',
    interviewDateTime: '',
    platform: '',
    interviewMessage: '',
    notificationMessage: '',
    submissionDeadline: '',
    documentMessage: '',
    followUpDateTime: '',
    followUpMessage: '',
    feedbackDeadline: '',
    feedbackMessage: '',
  });

  const [validationErrors, setValidationErrors] = useState({});
  const classes = []; // Fetch or define your options
  const recruiters = []; // Fetch or define your options
  const jobTests = []; // Fetch or define your options

  const handleBulletinTypeChange = (event) => {
    setFormData({ ...formData, bulletinType: event.target.value });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClassChange = (value) => {
    setFormData({ ...formData, selectedClass: value });
  };

  const handleRecruiterChange = (value) => {
    setFormData({ ...formData, recruiter_id: value });
  };

  const handleTestIdChange = (value) => {
    setFormData({ ...formData, test_id: value });
  };

  return (
    <>
      <ContentHeader title="Edit Job" />
      <ContentFormWrapper formTitle={`Edit Job Post`}>
        <form>
          <div className="col-lg-12 mb-2">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">Job *</label>
              <select
                className="form-control"
                name="category"
                value={formData.job}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="">Select Category</option>
                <option value="Job1">Job 1</option>
                <option value="Job2">Job 2</option>
              </select>
              {validationErrors.category && (
                <div className="text-danger">{validationErrors.category}</div>
              )}
            </div>
          </div>

          <div className="col-lg-12 mb-2">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Select Bulletin Type *
              </label>
              <select
                className="form-control"
                name="bulletinType"
                value={formData.bulletinType}
                onChange={handleBulletinTypeChange}
              >
                <option value="">Select</option>
                <option value="telephonicRound">Telephonic Round</option>
                <option value="interviewSchedule">Interview Schedule</option>
                <option value="informationNotification">
                  Information/Notification
                </option>
                <option value="documentSubmission">
                  Document Submission Reminder
                </option>
                <option value="followUpReminder">Follow-up Reminder</option>
                <option value="feedbackRequest">Feedback Request</option>
              </select>
            </div>
          </div>

          {formData.bulletinType === 'telephonicRound' && (
            <div className="col-lg-12 mb-2">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Date and Time *
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="telephonicDateTime"
                  value={formData.telephonicDateTime}
                  onChange={handleInputChange}
                  required
                />
                <label className="mont-font fw-600 font-xsss">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  className="form-control"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  required
                />
                <label className="mont-font fw-600 font-xsss">Message *</label>
                <textarea
                  className="form-control"
                  name="telephonicMessage"
                  value={formData.telephonicMessage}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
            </div>
          )}

          {formData.bulletinType === 'interviewSchedule' && (
            <div className="col-lg-12 mb-2">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Date and Time *
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="interviewDateTime"
                  value={formData.interviewDateTime}
                  onChange={handleInputChange}
                  required
                />
                <label className="mont-font fw-600 font-xsss">Platform *</label>
                <input
                  type="text"
                  className="form-control"
                  name="platform"
                  value={formData.platform}
                  onChange={handleInputChange}
                  required
                />
                <label className="mont-font fw-600 font-xsss">
                  Message/Instructions *
                </label>
                <textarea
                  className="form-control"
                  name="interviewMessage"
                  value={formData.interviewMessage}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
            </div>
          )}

          {formData.bulletinType === 'informationNotification' && (
            <div className="col-lg-12 mb-2">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Message *</label>
                <textarea
                  className="form-control"
                  name="notificationMessage"
                  value={formData.notificationMessage}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
            </div>
          )}

          {formData.bulletinType === 'documentSubmission' && (
            <div className="col-lg-12 mb-2">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Submission Deadline *
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="submissionDeadline"
                  value={formData.submissionDeadline}
                  onChange={handleInputChange}
                  required
                />
                <label className="mont-font fw-600 font-xsss">Message *</label>
                <textarea
                  className="form-control"
                  name="documentMessage"
                  value={formData.documentMessage}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
            </div>
          )}

          {formData.bulletinType === 'followUpReminder' && (
            <div className="col-lg-12 mb-2">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Date and Time *
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="followUpDateTime"
                  value={formData.followUpDateTime}
                  onChange={handleInputChange}
                  required
                />
                <label className="mont-font fw-600 font-xsss">Message *</label>
                <textarea
                  className="form-control"
                  name="followUpMessage"
                  value={formData.followUpMessage}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
            </div>
          )}

          {formData.bulletinType === 'feedbackRequest' && (
            <div className="col-lg-12 mb-2">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Feedback Deadline *
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="feedbackDeadline"
                  value={formData.feedbackDeadline}
                  onChange={handleInputChange}
                  required
                />
                <label className="mont-font fw-600 font-xsss">Message *</label>
                <textarea
                  className="form-control"
                  name="feedbackMessage"
                  value={formData.feedbackMessage}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
            </div>
          )}

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </ContentFormWrapper>
    </>
  );
};

export default BulletinForm;
