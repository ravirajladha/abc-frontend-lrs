import React from 'react';

const Index = ({ formData, handleFormChange }) => {
  return (
    <>
      <div className="row">
        <div className="col-lg-4 col-md-12 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">College Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter College Name"
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-12 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">Semester</label>
            <select className="form-control" name="semester" id="">
              <option value="">1st</option>
              <option value="">2nd</option>
              <option value="">3rd</option>
              <option value="">4th</option>
              <option value="">5th</option>
              <option value="">6th</option>
              <option value="">7th</option>
              <option value="">8th</option>
            </select>
          </div>
        </div>
        <div className="col-lg-4 col-md-12 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">Start Date</label>
            <input
              type="date"
              className="form-control"
              name="start_date"
              placeholder="Enter Phone Number"
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-12 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">End Date</label>
            <input
              type="date"
              className="form-control"
              name="end_date"
              placeholder="Enter Phone Number"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
