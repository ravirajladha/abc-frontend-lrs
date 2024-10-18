import { MultiSelectDropdown } from '@/components/common/form';
import React from 'react';

const Index = ({
  formData,
  handleFormChange,
  handleImageChange,
  handleSelectChange,
  colleges,
}) => {
  return (
    <>
      <div className="row">
        <div className="col-lg-4 col-md-12 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">College Name</label>
            {/* <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter College Name"
              value={formData.college}
              onChange={handleFormChange}
            /> */}
            <MultiSelectDropdown
              options={colleges}
              isMulti={false}
              value={formData.college_id}
              onChange={handleSelectChange}
              name="college_id"
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-12 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">Semester</label>
            <select
              className="form-control"
              name="college_sem"
              id=""
              value={formData.college_sem}
              onChange={handleFormChange}
            >
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
              <option value="5th">5th</option>
              <option value="6th">6th</option>
              <option value="7th">7th</option>
              <option value="8th">8th</option>
            </select>
          </div>
        </div>
        <div className="col-lg-4 col-md-12 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">Start Date</label>
            <input
              type="date"
              className="form-control"
              name="college_start_date"
              placeholder="Enter Phone Number"
              value={formData.college_start_date}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-12 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">End Date</label>
            <input
              type="date"
              className="form-control"
              name="college_end_date"
              placeholder="Enter Phone Number"
              value={formData.college_end_date}
              onChange={handleFormChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
