import { MultiSelectDropdown } from '@/components/common/form';
import React from 'react';

const Index = ({ formData, handleFormChange }) => {
  const achievements = [
    { id: 1, name: 'achievements 1' },
    { id: 2, name: 'achievements 2' },
    { id: 3, name: 'achievements 3' },
  ];
  const hobbies = [
    { id: 1, name: 'Cricket' },
    { id: 2, name: 'Music' },
    { id: 3, name: 'Book reading' },
  ];
  return (
    <>
      <div className="row">
        <div className="col-lg-4 col-md-12 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">Hobbies</label>
            <MultiSelectDropdown options={hobbies}/>
          </div>
        </div>
        <div className="col-lg-4 col-md-12 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">Achievements</label>
            <MultiSelectDropdown options={achievements}/>
          </div>
        </div>
        <div className="col-lg-4 col-md-12 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">Language</label>
            <select className="form-control" name="language" id="">
              <option value="">Select Language</option>
              <option value="">English</option>
              <option value="">Kannada</option>
              <option value="">Hindi</option>
              <option value="">Tamil</option>
            </select>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">About me</label>
            <textarea
              type="text"
              className="form-control mb-0 p-3 h100 lh-16"
              name="about"
              placeholder="Enter Addreess"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
