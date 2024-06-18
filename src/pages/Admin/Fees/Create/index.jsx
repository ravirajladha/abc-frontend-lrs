import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createFees } from '@/api/admin';
import { ContentHeader } from '@/components/common';
import { SelectInput } from '@/components/common/form';
import { fetchClasses } from '@/api/dropdown';

function Create({ title }) {
  const [formData, setFormData] = useState({ class: '', amount: '' });
  const [validationErrors, setValidationErrors] = useState({});
  const [classes, setClasses] = useState([]);

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
    try {
      const response = await createFees(formData);
      toast.success('Fees Created successfully', response);
      navigate('/admin/fees');
    } catch (error) {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      }
      toast.error(error.message);
    }
    setFormData({ ...formData, className: '' });
  };

  const handleClassChange = ({ target: { value } }) => {
    setValidationErrors(({ class: _, ...prevErrors }) => prevErrors);
    setFormData({
      class: value,
    });

  };
  const fetchClassDropdownData = useCallback(() => {
    fetchClasses()
      .then((data) => {
        setClasses(data.classes);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);
  useEffect(() => {
    fetchClassDropdownData();
  }, [fetchClassDropdownData]);
  return (
    <div className="px-2">
      <ContentHeader title={title} backLink="/admin/fees" />

      <div className="row">
        <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
          <div className="card-body p-lg-5 p-4 w-100 border-0 mb-0">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-6 col-md-12 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">Class</label>
                    <SelectInput
                      className="form-control"
                      options={classes}
                      name="class"
                      label="name"
                      value={formData.class}
                      onChange={handleClassChange}
                      placeholder="Select Class"
                    />
                    {validationErrors.class && (
                      <span className="text-danger">
                        {validationErrors.class}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">Amount</label>
                    <input
                      type="text"
                      className="form-control"
                      name="amount"
                      value={formData.amount}
                      onChange={handleFormChange}
                      placeholder="Enter Class Name"
                    />
                    {validationErrors.amount && (
                      <span className="text-danger">
                        {validationErrors.amount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-12 mb-0 mt-2 pl-0">
                <button
                  type="submit"
                  className="bg-current text-white btn ml-auto float-right border-0 d-flex fw-600 text-uppercase py-2 px-4 rounded-lg text-center font-xsss shadow-xs d-flex align-items-center"
                >
                  <i className="feather-save font-xssss mr-2"></i> Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
