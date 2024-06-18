import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { updateFee, fetchFeeDetail } from '@/api/admin';
import { ContentHeader } from '@/components/common';
import { SelectInput } from '@/components/common/form';
import { fetchClasses } from '@/api/dropdown';

function Edit({ title }) {
  const { feeId } = useParams();
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

  const fetchData = async () => {
    try {
      const response = await fetchFeeDetail(feeId);
      console.log(response);
      setFormData({
        class: response.fee.class_name,
        amount: response.fee.amount,
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await updateFee(formData, feeId);
      toast.success('Fees Updated successfully', response);
      navigate('/admin/fees');
    } catch (error) {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      }
      toast.error(error.message);
    }
    setFormData({ ...formData, className: '' });
  };

  useEffect(() => {
    fetchData();
  }, []);
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
                    <input
                      type="text"
                      className="form-control"
                      name="class"
                      value={formData.class}
                      placeholder="Enter Class Name"
                      readOnly
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

export default Edit;
