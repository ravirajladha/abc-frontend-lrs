import { MultiSelectDropdown } from '@/components/common/form';
import React from 'react';

const Index = ({
  formData,
  handleFormChange,
  handleImageChange,
  handleSelectChange,
}) => {
  const achievements = [
    { id: 'Achievements 1', name: 'Achievements 1' },
    { id: 'Achievements 2', name: 'Achievements 2' },
    { id: 'Achievements 3', name: 'Achievements 3' },
  ];
  const hobbies = [
    { id: 'Cricket', name: 'Cricket' },
    { id: 'Music', name: 'Music' },
    { id: 'Book reading', name: 'Book reading' },
  ];
  const languages = [
    { id: 'Kannada', name: 'Kannada' },
    { id: 'Hindi', name: 'Hindi' },
    { id: 'English', name: 'English' },
  ];
  return (
    <>
      <h4 className="text-grey-900 font-xs mb-0 fw-600 mb-2">About Me</h4>
      <div className="row">
        <div className="col-lg-4 col-md-12 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">Hobbies</label>
            {/* <MultiSelectDropdown
              options={hobbies}
              isMulti={true}
              value={formData.hobbies}
              onChange={handleSelectChange}
              name="hobbies"
            /> */}
            <input
              type="text"
              className="form-control"
              name="hobbies"
              placeholder="Enter hobbies"
              value={formData.hobbies}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-12 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">Achievements</label>
            {/* <MultiSelectDropdown
              options={achievements}
              isMulti={true}
              value={formData.achievements}
              onChange={handleSelectChange}
              name="achievements"
            /> */}
             <input
              type="text"
              className="form-control"
              name="achievements"
              placeholder="Enter achievements"
              value={formData.achievements}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-12 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">Language</label>
            {/* <MultiSelectDropdown
              options={languages}
              isMulti={true}
              value={formData.languages}
              onChange={handleSelectChange}
              name="languages"
            /> */}
            <input
              type="text"
              className="form-control"
              name="languages"
              placeholder="Enter languages"
              value={formData.languages}
              onChange={handleFormChange}
            />
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
              value={formData.about}
              onChange={handleFormChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
