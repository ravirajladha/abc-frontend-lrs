import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import { useState } from 'react';

import { createClass } from '@/api/admin';
import { ContentHeader } from '@/components/common';

function Create({ title }) {
  const [formData, setFormData] = React.useState({ class_name: '' });
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
      const response = await createClass(formData);
      toast.success('Class added successfully', response);
      // setLoading(false);
      navigate('/admin/classes');
  

    } catch (error) {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      }
      toast.error(error.message);
    } finally {
      setLoading(false); // Stop loading
    }
    setFormData({ ...formData, className: '' });
  };

  return (
    <div className="px-2">
      <ContentHeader title={title} backLink='/admin/classes' />

      <div className="row">
        <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
          <div className="card-body p-lg-5 p-4 w-100 border-0 mb-0">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-12 col-md-12 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Class Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="class_name"
                      value={formData.class_name}
                      onChange={handleFormChange}
                      placeholder="Enter Class Name"
                    />
                    {validationErrors.class_name && (
                      <span className="text-danger">
                        {validationErrors.class_name}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-12 mb-0 mt-2 pl-0">
              <button
                  type="submit"
                  className="bg-current text-white btn ml-auto float-right border-0 d-flex fw-600 text-uppercase py-2 px-4 rounded-lg text-center font-xsss shadow-xs d-flex align-items-center"
                  disabled={loading} // Disable button when loading
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
