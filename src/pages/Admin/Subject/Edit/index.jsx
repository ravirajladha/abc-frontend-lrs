import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

import { getSubjectData } from '@/api/common';
import { updateSubject } from '@/api/admin';
import { ContentHeader, ContentLoader } from '@/components/common';

function Edit({ title }) {
  const [formData, setFormData] = useState({ subject_name: '',status: '1', position: 0 });
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { subjectId } = useParams();

  const getSubjectDetails = useCallback(async () => {
    try {
      const subjectData = await getSubjectData(subjectId);
      setFormData({ 
        subject_name: subjectData.name,
        status: subjectData.status.toString(), // Assuming the active field is part of the classData
        position: subjectData.position,

       });
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }, [subjectId]);

  useEffect(() => {
    getSubjectDetails();
  }, [getSubjectDetails]);

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
      const response = await updateSubject(subjectId, formData);
      toast.success('Subject updated successfully', response);
      navigate('/admin/subjects');
      setFormData({ ...formData, subject_name: '' });
    } catch (error) {
      console.log("error", error);
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      }
      toast.error(error.message);
    }
  };

  return (
    <div className="px-2">
      <ContentHeader title={title}  backLink='/admin/subjects'/>
      {loading ? (
        <div className="my-5">
          <ContentLoader />
        </div>
      ) : (
        <div className="row">
          <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
            <div className="card-body p-lg-5 p-4 w-100 border-0 mb-0">
              <form onSubmit={handleSubmit} autoComplete="off">
                <div className="row">
                  <div className="col-lg-4 col-md-4 mb-3">
                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss">
                        Subject Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="subject_name"
                        value={formData.subject_name}
                        onChange={handleFormChange}
                        placeholder="Enter Subject Name"
                      />
                      {validationErrors.subject_name && (
                        <span className="text-danger">
                          {validationErrors.subject_name}
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
