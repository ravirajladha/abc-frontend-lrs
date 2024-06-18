import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

import { getClassData } from '@/api/common';
import { updateClass } from '@/api/admin';
import { ContentHeader, ContentLoader } from '@/components/common';

function Edit({ title }) {
  const [formData, setFormData] = useState({ class_name: '',status: '1', position: 0 });
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { classId } = useParams();

  const getClassDetails = useCallback(async () => {
    try {
      const classData = await getClassData(classId);
      setFormData({ 
        class_name: classData.name,
        status: classData.status.toString(), // Assuming the active field is part of the classData
        position: classData.position,

       });
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }, [classId]);

  useEffect(() => {
    getClassDetails();
  }, [getClassDetails]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await updateClass(classId, formData);
      toast.success('Class updated successfully', response);
      navigate('/admin/classes');
      setFormData({ ...formData, class_name: '' });
    } catch (error) {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      }
      toast.error(error.message);
    }
  };

  return (
    <div className="px-2">
      <ContentHeader title={title}  backLink='/admin/classes'/>
      {loading ? (
        <div className="my-5">
          <ContentLoader />
        </div>
      ) : (
        <div className="row">
          <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
            <div className="card-body p-lg-5 p-4 w-100 border-0 mb-0">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-4 col-md-4 mb-3">
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
             
                <div className="col-lg-4 col-md-4 mb-3">
                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss">
                        Status
                      </label>
                      <select
                        className="form-control"
                        name="status"
                        value={formData.status}
                        onChange={handleFormChange}
                      >
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                      </select>
                      {validationErrors.status && (
                        <span className="text-danger">
                          {validationErrors.status}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-4 mb-3">
                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss">
                        Position
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="position"
                        value={formData.position}
                        onChange={handleFormChange}
                        placeholder="Enter Position"
                      />
                      {validationErrors.position && (
                        <span className="text-danger">
                          {validationErrors.position}
                        </span>
                      )}
                    </div>
                  </div>
                  </div>
           
                <div className="col-lg-12 mb-0 mt-2 pl-0">
                  <button
                    type="submit"
                    className="bg-current border-0 float-right text-center text-white font-xsss fw-600 p-3 w150 rounded-lg d-inline-block"
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
      )}
    </div>
  );
}

Edit.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Edit;
