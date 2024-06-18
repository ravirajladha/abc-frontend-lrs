import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { ContentFormWrapper, ContentHeader } from '@/components/common';
import { SaveButton, SelectInput } from '@/components/common/form';

import { fetchClasses, fetchSubjects } from '@/api/dropdown';
import { uploadOldApplication } from '@/api/school';

function Upload() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const fileInputRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
        const submissionData = new FormData();
        submissionData.append('file', file);
  
        const response = await uploadOldApplication(submissionData);
        toast.success(response.message);
  
        clearForm();
        setTimeout(() => {
          setIsSubmitting(false);
        }, 1500);
        navigate('/school/applications/old-applications');
      } catch (error) {
        if (error.validationErrors) {
          setValidationErrors(error.validationErrors);
        }
        console.error('Error:', error.message);
        toast.error('Error submitting the form. Please try again.');
        setIsSubmitting(false);
      }
  };
  
  const clearForm = () => {
    setFile(null);
  };

  return (
    <div>
      <ContentHeader title="Upload old Applications" />
      <ContentFormWrapper formTitle="Upload Applications">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 mb-2">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Upload File <span className='font-xssss fw-400 text-dark'>(only .csv files)</span>
                </label>
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="form-control"
                  accept=".csv"
                  ref={fileInputRef}
                  onChange={(e) => setFile(e.target.files[0])}
                />
                {validationErrors.image && (
                    <span className="text-danger">{validationErrors.file}</span>
                  )}
              </div>
            </div>
            <SaveButton isSubmitting={isSubmitting} />
          </div>
        </form>
      </ContentFormWrapper>
    </div>
  );
}

export default Upload;
