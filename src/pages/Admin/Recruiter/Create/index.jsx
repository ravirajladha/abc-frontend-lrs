import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import { createRecruiter } from '@/api/admin';
import { ContentCardWrapper, ContentHeader } from '@/components/common';
import { SaveButton } from '@/components/common/form';

function Create() {
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loader state

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone_number: '',
   
  });

 


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await createRecruiter(form); // Use the API function for creating trainers
      toast.success('Recruiter added successfully', response);
      navigate('/admin/recruiters');
    } catch (error) {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      }
      toast.error(error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === 'phone_number') {
      newValue = value.replace(/\D/g, '');
      if (newValue.length > 10) {
        newValue = newValue.slice(0, 10);
      }
    }
    setForm((prevState) => ({ ...prevState, [name]: newValue }));
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  return (
    <div className="px-2">
      <ContentHeader title="Create" subtitle="Recruiter" />

      <ContentCardWrapper>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="row">
            <div className="col-lg-12 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Name *</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  placeholder="Enter Name"
                />
                {validationErrors.name && (
                  <span className="text-danger">{validationErrors.name}</span>
                )}
              </div>
            </div>
          
          </div>
          <div className="row">
            <div className="col-lg-6 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Email *</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={form.email}
                  onChange={handleFormChange}
                  placeholder="Enter Email"
                />
                {validationErrors.email && (
                  <span className="text-danger">{validationErrors.email}</span>
                )}
              </div>
            </div>
            <div className="col-lg-6 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Phone Number *
                </label>
                <input
                  type="number"
                  name="phone_number"
                  className="form-control"
                  value={form.phone_number}
                  onChange={handleFormChange}
                  placeholder="Enter Phone Number"
                />
                {validationErrors.phone_number && (
                  <span className="text-danger">
                    {validationErrors.phone_number}
                  </span>
                )}
              </div>
            </div>
          </div>
         
          <div className="col-lg-12 mb-0 mt-2 pl-0">
         

         


    
                  <SaveButton isSubmitting={loading} />

          </div>
        </form>
      </ContentCardWrapper>
    </div>
  );
}

export default Create;
