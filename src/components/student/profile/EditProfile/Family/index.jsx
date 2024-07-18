import { MultiSelectDropdown } from '@/components/common/form';
import React from 'react';

const Index = ({ formData, handleFormChange }) => {
  return (
    <>
      <div className="row">
        <div className="col-lg-4 col-md-12 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">Father Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter Name"
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-12 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">Father Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              placeholder="Enter Email"
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-12 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">Father Phone Number</label>
            <input
              type="text"
              className="form-control"
              name="phone_number"
              placeholder="Enter Phone Number"
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-12 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">Mother Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter Name"
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-12 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">Mother Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              placeholder="Enter Email"
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-12 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">Mother Phone Number</label>
            <input
              type="text"
              className="form-control"
              name="phone_number"
              placeholder="Enter Phone Number"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
