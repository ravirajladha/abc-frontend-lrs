import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { createInternshipAdmin } from '@/api/admin';
import { ContentHeader } from '@/components/common';

function Create({ title }) {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('');
  const [corporateName, setCorporateName] = useState('');
  const [institute, setInstitute] = useState('');

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone_number: '',
    password: '',
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createInternshipAdmin(form);
      toast.success('Internship Admin added successfully', response);
      navigate('/admin/internship-admin');
    } catch (error) {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      }
      toast.error(error.message);
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
  console.log('title', title);
  return (
    <div className="px-2">
      <ContentHeader title={title} />
      <div className="row">
        <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
          <div className="card-body p-lg-5 p-4 w-100 border-0 mb-0">
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="row">
                <div className="col-lg-6 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">Name*</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={form.name}
                      onChange={handleFormChange}
                      placeholder="Enter Name"
                    />
                    {validationErrors.name && (
                      <span className="text-danger">
                        {validationErrors.name}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-lg-6 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">Email*</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={form.email}
                      onChange={handleFormChange}
                      placeholder="Enter Email"
                    />
                    {validationErrors.email && (
                      <span className="text-danger">
                        {validationErrors.email}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-lg-6 mb-3 dummy">
                  <label htmlFor="userType">Select Type:</label>
                  <select
                    id="userType"    
                    className="form-control"
                    value={userType}
                    onChange={handleUserTypeChange}
                  >
                    <option value="">Select</option>
                    <option value="corporate">Corporate</option>
                    <option value="academic">Academic Admin</option>
                  </select>
                </div>

                {userType === 'corporate' && (
                  <div className="col-lg-6 mb-3 dummy">
                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss">
                        Corporate Name{' '}
                        <span title="The dropdown shows the common institute of all the students.">
                          <i className="feather-info"></i>
                        </span>
                      </label>
                      <input
                        type="text"
                        name="corporateName"
                        className="form-control"
                        value={form.corporateName}
                        onChange={handleFormChange}
                        placeholder="Enter Email"
                      />
                    </div>
                  </div>
                )}
                {userType === 'academic' && (
                  <div className="col-lg-6 mb-3 dummy">
                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss">
                        Institute{' '}
                        <span title="The dropdown shows the common institute of all the students.">
                          <i className="feather-info"></i>
                        </span>
                      </label>

                      <select
                        className="form-control"
                        name="selectedLanguage"
                        value={''}
                      >
                        <option value=""> Institute1</option>
                        <option value=""> Institute2</option>
                        <option value=""> Institute3</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
              <div className="row">
                <div className="col-lg-6 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Phone Number*
                    </label>
                    <input
                      type="tel"
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
                <div className="col-lg-6 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Password*
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={form.password}
                      onChange={handleFormChange}
                      placeholder="Enter Password"
                    />
                    {validationErrors.password && (
                      <span className="text-danger">
                        {validationErrors.password}
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
      </div>
    </div>
  );
}

Create.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Create;
