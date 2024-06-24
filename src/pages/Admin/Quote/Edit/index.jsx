import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { getQuoteDetail, editQuote } from '@/api/admin';
import { ContentHeader, ContentLoader } from '@/components/common';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
function Edit({ title }) {
  const navigate = useNavigate();
  const { quoteId } = useParams();

  const [form, setForm] = useState({
    quote: '',
  });

  const [loading, setLoading] = useState(true);
  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submissionData = new FormData();
      submissionData.append('_method', 'PUT');
      submissionData.append('quote', form.quote || '');
      const response = await editQuote(quoteId, submissionData);

      toast.success('Quote updated successfully', response);
      navigate('/admin/quotes');
    } catch (error) {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (value !== undefined) {
      setForm((prevState) => ({ ...prevState, [name]: value }));
      setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }

    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    // Special handling for phone_number to restrict input exactly to 10 digits

  };
  const fetchQuoteData = useCallback(async () => {
    try {
      const quoteData = await getQuoteDetail(quoteId);
      console.log(quoteData, "scholl data")
      if (quoteData) {
        const updatedForm = {
          quote: quoteData.quote || '',
        };

        setForm(updatedForm);
        console.log("new form", form)
   
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching school data:', error);
      setLoading(false);
    }
  }, [quoteId]);

  useEffect(() => {
    fetchQuoteData();
  }, [fetchQuoteData]);

  return (
    <div className="px-2">
      <ContentHeader title={title} />
      <div className="row">
        <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
          <div className="card-body p-lg-5 p-4 w-100 border-0 mb-0">
            {loading ? (
              <div className="my-5">
                <ContentLoader />
              </div>
            ) : (
              <form onSubmit={handleSubmit} autoComplete="off">
                <div className="row">
                  <div className="col-lg-12 mb-3">
                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss">Quote <span className="text-danger">*</span></label>
                      <textarea
                        type="text"
                        className="form-control"
                        name="quote"
                        value={form.quote}
                        onChange={handleFormChange}
                        placeholder="Enter Quote"
                     ></textarea>
                      {validationErrors.quote && (
                        <span className="text-danger">
                          {validationErrors.quote}
                        </span>
                      )}
                    </div>
                  </div>
                 
                    
                     
                   
                </div>
                <div className="col-lg-12 mb-0 mt-2 pl-0">
                  <button
                    type="submit"
                    className="bg-current border-0 float-right text-center text-white font-xsss fw-600 p-3 w150 rounded-lg d-inline-block"
                  >
                    <i className="feather-save mr-2"></i> Save
                  </button>
                </div>
              </form>
            )}
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
