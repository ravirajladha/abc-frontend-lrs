import { MultiSelectDropdown } from '@/components/common/form';
import React from 'react';

const Index = ({ formData, handleFormChange }) => {
  return (
    <>
      <h4 className="text-grey-900 font-xs mb-0 fw-600 mb-2">Parent / Guardian Details</h4>
      <div className="row">
        <div className="col-lg-4 col-md-12 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">Father Name</label>
            <input
              type="text"
              className="form-control"
              name="father_name"
              placeholder="Enter Name"
              value={formData.father_name}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-12 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">Father Email</label>
            <input
              type="email"
              className="form-control"
              name="father_email"
              placeholder="Enter Email"
              value={formData.father_email}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-12 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">Father Phone Number</label>
            <input
              type="text"
              className="form-control"
              name="father_number"
              placeholder="Enter Phone Number"
              value={formData.father_number}
              onChange={handleFormChange}
              maxLength="10"
              onKeyDown={(e) => {
                // Only allow numbers (and optionally other characters like Backspace, Delete)
                if (!/^\d*$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
                  e.preventDefault();
                }
              }}
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-12 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">Mother Name</label>
            <input
              type="text"
              className="form-control"
              name="mother_name"
              placeholder="Enter Name"
              value={formData.mother_name}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-12 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">Mother Email</label>
            <input
              type="email"
              className="form-control"
              name="mother_email"
              placeholder="Enter Email"
              value={formData.mother_email}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-12 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">Mother Phone Number</label>
            <input
              type="text"
              className="form-control"
              name="mother_number"
              placeholder="Enter Phone Number"
              value={formData.mother_number}
              onChange={handleFormChange}
              maxLength="10"
              onKeyDown={(e) => {
                // Only allow numbers (and optionally other characters like Backspace, Delete)
                if (!/^\d*$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
                  e.preventDefault();
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
