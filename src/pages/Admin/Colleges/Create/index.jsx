import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import { useState } from 'react';

import { storeCollege } from '@/api/admin';
import { ContentHeader } from '@/components/common';

function Create({ title }) {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    state: '',
    address: '',
  });
  const [validationErrors, setValidationErrors] = React.useState({});
  const [loading, setLoading] = useState(false); // Loader state

  const navigate = useNavigate();

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await storeCollege(formData);
      toast.success('College added successfully', response);
      navigate(-1);
    } catch (error) {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      }
      toast.error(error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="px-2">
      <ContentHeader title={title} backLink="/admin/colleges" />

      <div className="row">
        <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
          <div className="card-body p-lg-5 p-4 w-100 border-0 mb-0">
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="row">
                <div className="col-lg-6 col-md-12 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="Enter College Name"
                    />
                    {validationErrors.name && (
                      <span className="text-danger">
                        {validationErrors.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* City Field */}
                <div className="col-lg-6 col-md-12 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">City</label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      value={formData.city}
                      onChange={handleFormChange}
                      placeholder="Enter City"
                    />
                    {validationErrors.city && (
                      <span className="text-danger">
                        {validationErrors.city}
                      </span>
                    )}
                  </div>
                </div>

                {/* State Field */}
                <div className="col-lg-6 col-md-12 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">State</label>
                    <input
                      type="text"
                      className="form-control"
                      name="state"
                      value={formData.state}
                      onChange={handleFormChange}
                      placeholder="Enter State"
                    />
                    {validationErrors.state && (
                      <span className="text-danger">
                        {validationErrors.state}
                      </span>
                    )}
                  </div>
                </div>

                {/* Address Field */}
                <div className="col-lg-6 col-md-12 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={formData.address}
                      onChange={handleFormChange}
                      placeholder="Enter Address"
                    />
                    {validationErrors.address && (
                      <span className="text-danger">
                        {validationErrors.address}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-lg-12 mb-0 mt-2 pl-0">
                <button
                  type="submit"
                  className="bg-current text-white btn ml-auto float-right border-0 d-flex fw-600 text-uppercase py-2 px-4 rounded-lg text-center font-xsss shadow-xs d-flex align-items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      {' '}
                      <Spinner
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="mr-2"
                      />
                    </>
                  ) : (
                    <>
                      <i className="feather-save mr-2"></i> Save
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

Create.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Create;
