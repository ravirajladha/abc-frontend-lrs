import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { createQuote ,createQuotesBulk} from '@/api/admin';
import { ContentHeader } from '@/components/common';
import Papa from 'papaparse'; 
function CreateQuote({ title }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    quote: '',
  });
  const [csvFile, setCsvFile] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createQuote(form);
      toast.success('Quote added successfully', response);
      navigate('/admin/quotes');
    } catch (error) {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      }
      toast.error(error.message);
    }
  };

  const handleCsvUpload = async (e) => {
    e.preventDefault();
    if (!csvFile) {
      toast.error('Please upload a CSV file');
      return;
    }

    Papa.parse(csvFile, {
      header: true,
      complete: async (results) => {
        const quotes = results.data.map(row => row['quotes']).filter(quote => quote);
        if (quotes.length === 0) {
          toast.error('No valid quotes found in CSV file');
          return;
        }
        try {
          const response = await createQuotesBulk({ quotes });
          toast.success('Quotes added successfully', response);
          navigate('/admin/quotes');
        } catch (error) {
          toast.error(error.message);
        }
      },
      error: (error) => {
        toast.error(`Error parsing CSV file: ${error.message}`);
      }
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    setForm((prevState) => ({ ...prevState, [name]: newValue }));
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };
  return (
    <div className="px-2">
      <ContentHeader title={title} />
      <div className="row">
        <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
          <div className="card-body p-lg-5 p-4 w-100 border-0 mb-0">
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="row">
                <div className="col-lg-12 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">Quote*</label>
                    <textarea
                      type="text"
                      className="form-control mb-0 p-3 h100 lh-16"
                      name="quote"
                      value={form.quote}
                      onChange={handleFormChange}
                      placeholder="Enter Quote"
                    >

</textarea>
            {validationErrors.description && (
              <span className="text-danger">
                {validationErrors.description}
              </span>
            )}
                    {validationErrors.name && (
                      <span className="text-danger">
                        {validationErrors.name}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-12 mb-0 mt-2 pl-0">
                <button
                  type="submit"
                  className="bg-current border-0 text-center text-white font-xsss fw-600 p-3 w150 rounded-lg d-inline-block"
                >
                  <i className="feather-save mr-2"></i> Save
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
          <div className="card-body p-lg-5 p-4 w-100 border-0 mb-0">
            <form onSubmit={handleCsvUpload} >
              <div className="row">
                <div className="col-lg-12 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">Upload CSV</label>
                    <input
                      type="file"
                      className="form-control mb-0 p-3"
                      name="csvFile"
                      accept=".csv"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-12 mb-0 mt-2 pl-0">
                <button
                  type="submit"
                  className="bg-current border-0 text-center text-white font-xsss fw-600 p-3 w150 rounded-lg d-inline-block"
                >
                  <i className="feather-upload mr-2"></i> Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

CreateQuote.propTypes = {
  title: PropTypes.string.isRequired,
};

export default CreateQuote;