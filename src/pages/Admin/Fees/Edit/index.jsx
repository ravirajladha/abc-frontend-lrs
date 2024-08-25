import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { fetchFeeDetails, updateFeeDetails } from '@/api/admin'; // Assuming you have these API functions
import { ContentHeader } from '@/components/common';
import { TextEditor} from '@/components/common';

function EditFee({ title }) {
  const [formData, setFormData] = useState({
    amount: '',
    slashAmount: '',

    referralAmount: '',
    referrerAmount: '',
    benefits: '',
    description: ''
  });
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleTextEditorChange = (field, content) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: content,
    }));
  };

//   <TextEditor
//   initialValue={formData.benefits || 'default value'}
//   onContentChange={(html) => handleInstructionChange('benefits', html)}
// />

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("fresh form data", formData);
      const response = await updateFeeDetails(formData);
      toast.success('Fee details updated successfully', response);
      navigate('/admin/fees');
    } catch (error) {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      }
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { fee } = await fetchFeeDetails();
        console.log("fee data", fee);
        setFormData({
          amount: fee.amount,
          slashAmount: fee.slash_amount,
      
          referralAmount: fee.referral_amount,
          referrerAmount: fee.referrer_amount,
          benefits: fee.benefits,
          description: fee.description
        });
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="px-2">
      <ContentHeader title={title} backLink="/admin/fees" />
      <div className="row">
        <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
          <div className="card-body p-lg-5 p-4 w-100 border-0 mb-0">
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="row">
                <div className="col-lg-6 col-md-12 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">Offer Amount</label>
                    <input
                      type="text"
                      className="form-control"
                      name="amount"
                      value={formData.amount}
                      onChange={handleFormChange}
                      placeholder="Enter Amount"
                    />
                    {validationErrors.amount && (
                      <span className="text-danger">
                        {validationErrors.amount}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">Original Amount</label>
                    <input
                      type="text"
                      className="form-control"
                      name="slashAmount"
                      value={formData.slashAmount}
                      onChange={handleFormChange}
                      placeholder="Enter Original Amount"
                    />
                    {validationErrors.slashAmount && (
                      <span className="text-danger">
                        {validationErrors.slashAmount}
                      </span>
                    )}
                  </div>
                </div>
               
                <div className="col-lg-6 col-md-12 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">Referral Amount (New User Incentive)
                    {/* <Tooltip id="referralAmountTooltip" message="Referral Amount is the amount credited to the user who referred you." /> */}
                    {/* <Tooltip {...props}>Go Back</Tooltip> */}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="referralAmount"
                      value={formData.referralAmount}
                      onChange={handleFormChange}
                      placeholder="Enter Referral Amount"
                    />
                    {validationErrors.referralAmount && (
                      <span className="text-danger">
                        {validationErrors.referralAmount}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">Referrer Amount (Exisiting User Incentive)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="referrerAmount"
                      value={formData.referrerAmount}
                      onChange={handleFormChange}
                      placeholder="Enter Referrer Amount"
                    />
                    {validationErrors.referrerAmount && (
                      <span className="text-danger">
                        {validationErrors.referrerAmount}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">Benefits</label>
                    {/* <input
                      type="text"
                      className="form-control"
                      name="benefits"
                      value={formData.benefits}
                      onChange={handleFormChange}
                      placeholder="Enter Benefits"
                    /> */}
                       <TextEditor
                      initialValue={formData.benefits || 'default value'}
                      onContentChange={(html) => handleTextEditorChange('benefits', html)}
                    />

                    {validationErrors.benefits && (
                      <span className="text-danger">
                        {validationErrors.benefits}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-lg-12 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">Description</label>
                    {/* <textarea
                      className="form-control"
                      name="description"
                      value={formData.description}
                      onChange={handleFormChange}
                      placeholder="Enter Description"
                    /> */}
                       <TextEditor
                      initialValue={formData.description || 'default value'}
                      onContentChange={(html) => handleTextEditorChange('description', html)}
                    />

                    {validationErrors.description && (
                      <span className="text-danger">
                        {validationErrors.description}
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

export default EditFee;
