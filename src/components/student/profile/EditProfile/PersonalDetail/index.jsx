import React from 'react';
import DefaultProfileImage from '@/assets/images/default/student.png';

const Index = ({ formData, handleFormChange, handleImageChange }) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  return (
    <>
      <h4 className="text-grey-900 font-xs mb-0 fw-600 mb-2">Personal Details</h4>
      <div className="row justify-content-center">
        <div className="col-lg-4 mb-2">
          <div className="form-group text-center">
            <label className="mont-font fw-600 font-xsss">
              <img
                className="rounded-lg"
                src={
                  formData.profile_image instanceof File
                    ? URL.createObjectURL(formData.profile_image) // New image preview
                    : formData.profile_image
                    ? baseUrl + formData.profile_image
                    : DefaultProfileImage // URL from backend or default image
                }
                alt="thumbnail"
                width="120"
                height="120"
              />
            </label>
            <input
              type="file"
              name="image"
              id="file"
              className="input-file"
              onChange={handleImageChange}
              accept=".jpg, .jpeg, .png"
            />
            <label
              htmlFor="file"
              className="rounded-lg text-center bg-white btn-tertiary js-labelFile w-100 border-0"
            >
              <i className="ti-cloud-down small-icon mr-3"></i>
              <span className="js-fileName">
                {formData.profile_image ? (
                  <>{formData.profile_image.name} </>
                ) : (
                  'Click to Upload an image'
                )}
              </span>
            </label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-12 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              placeholder="Enter Name"
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-12 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              placeholder="Enter Email"
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-12 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">Phone Number</label>
            <input
              type="text"
              className="form-control"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleFormChange}
              placeholder="Enter Phone Number"
              maxLength="10"
              onKeyDown={(e) => {
                // Only allow numbers (and optionally other characters like Backspace, Delete)
                if (
                  !/^\d*$/.test(e.key) &&
                  e.key !== 'Backspace' &&
                  e.key !== 'Delete' &&
                  e.key !== 'Tab'
                ) {
                  e.preventDefault();
                }
              }}
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-12 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              name="dob"
              value={formData.dob}
              onChange={handleFormChange}
              placeholder="Enter Phone Number"
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-12 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">Gender</label>
            <select
              className="form-control"
              name="gender"
              id=""
              value={formData.gender}
              onChange={handleFormChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className="col-lg-4 col-md-12 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">Pincode</label>
            <input
              type="text"
              className="form-control"
              name="pincode"
              value={formData.pincode}
              onChange={handleFormChange}
              placeholder="Enter Pincode"
            />
          </div>
        </div>
        <div className="col-lg-12 col-md-12 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">Address</label>
            <textarea
              type="text"
              className="form-control mb-0 p-3 h100 lh-16"
              name="address"
              value={formData.address}
              onChange={handleFormChange}
              placeholder="Enter Addreess"
            />
          </div>
        </div>
      </div>
      {/* <div className="col-lg-12 mb-0 mt-2 pl-0">
        <button
          type="submit"
          className="bg-current border-0 float-right text-center text-white font-xsss fw-600 px-3 py-2 w150 rounded-lg d-inline-block"
        >
          <i className="feather-save mr-2"></i> Save
        </button>
      </div> */}
    </>
  );
};

export default Index;
