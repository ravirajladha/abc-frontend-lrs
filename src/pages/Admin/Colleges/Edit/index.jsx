import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

import { getCollegeDetails, updateCollege } from '@/api/admin'; // API for fetching and updating the college
import { ContentHeader, ContentLoader } from '@/components/common';

function Edit({ title }) {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    state: '',
    address: '',
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loader state
  const [initialLoading, setInitialLoading] = useState(true); // Initial fetch loader

  const navigate = useNavigate();
  const { collegeId } = useParams(); // Get college ID from route params

  // Fetch the college details when the component mounts
  useEffect(() => {
    const fetchCollegeDetails = async () => {
      try {
        const response = await getCollegeDetails(collegeId);
        setFormData(response.college);
      } catch (error) {
        toast.error('Failed to fetch college details');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchCollegeDetails();
  }, [collegeId]);

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
      const response = await updateCollege(collegeId, formData);
      toast.success('College updated successfully', response);
      navigate(-1);
    } catch (error) {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      }
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <ContentLoader />;
  }

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

Edit.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Edit;
