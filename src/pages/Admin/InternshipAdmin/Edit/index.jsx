import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { getInternshipAdminData, editInternshipAdmin } from '@/api/admin';
import { ContentHeader, ContentLoader } from '@/components/common';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
function Edit({ title }) {
  const navigate = useNavigate();
  const { internshipAdminId } = useParams();

  const fileInputRef = useRef();
  const fileLogoInputRef = useRef();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone_number: '',
    password: '',
    year_of_establishment: '',
    accreditation_no: '',
    address: '',
    pincode: '',
    city: '',
    state: '',
    website_url: '',
    legal_name: '',
    office_address: '',
    description: '',
   
  });

  const [loading, setLoading] = useState(true);
  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submissionData = new FormData();
      submissionData.append('_method', 'PUT');
      submissionData.append('name', form.name || '');
      submissionData.append('email', form.email || '');
      submissionData.append('phone_number', form.phone_number || '');
      submissionData.append('password', form.password || '');
      submissionData.append(
        'year_of_establishment',
        form.year_of_establishment || ''
      );
      submissionData.append('accreditation_no', form.accreditation_no || '');
      submissionData.append('address', form.address || '');
      submissionData.append('pincode', form.pincode || '');
      submissionData.append('city', form.city || '');
      submissionData.append('state', form.state || '');
      submissionData.append('website_url', form.website_url || '');
      submissionData.append('legal_name', form.legal_name || '');
      submissionData.append('office_address', form.office_address || '');
      submissionData.append('description', form.description || '');

      if (form.internship_admin_image) {
        submissionData.append('internship_admin_image', form.internship_admin_image);
        submissionData.append('internship_admin_image_name', form.internship_admin_image_name);
      }

      if (form.logo  && form.logo.size > 0) {
        console.log(form.logo, "form logo");
        submissionData.append('logo', form.logo);
        submissionData.append('logo_name', form.logo_name);
      }

      for (let [key, value] of submissionData.entries()) {
        console.log(`${key}: ${value instanceof Blob ? value.name : value}`);
      }
      const response = await editInternshipAdmin(internshipAdminId, submissionData);

      toast.success('Internship Admin updated successfully', response);
      navigate('/admin/internship-admin');
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
    if (name === 'phone_number') {
      if (value.length <= 10) {
        // Allow changes only if the phone number is <= 10 digits
        setForm((prevState) => ({ ...prevState, [name]: value }));
      } // Do not update form state if the length exceeds 10 digits
    } else {
      // Handle other inputs normally
      setForm((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setForm((prevFormData) => ({
        ...prevFormData,
        internship_admin_image: file,
        internship_admin_image_name: file.name,
      }));
    }
  };

  const handleLogoFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setForm((prevFormData) => ({
        ...prevFormData,
        logo: file,
        logo_name: file.name,
      }));
    }
  };
  const [existingLogoUrl, setExistingLogoUrl] = useState("");
  const fetchInternshipAdminData = useCallback(async () => {
    try {
      const internshipAdminData = await getInternshipAdminData(internshipAdminId);
      console.log(internshipAdminData, "InternshipAdmin data")
      if (internshipAdminData) {
        const updatedForm = {
          name: internshipAdminData.name || '',
          email: internshipAdminData.email || '',
          phone_number: internshipAdminData.phone_number || '',
          password: internshipAdminData.password || '',
          year_of_establishment: internshipAdminData.year_of_establishment || '',
          accreditation_no: internshipAdminData.accreditation_no || '',
          address: internshipAdminData.address || '',
          pincode: internshipAdminData.pincode || '',
          city: internshipAdminData.city || '',
          state: internshipAdminData.state || '',
          website_url: internshipAdminData.website_url || '',
          legal_name: internshipAdminData.legal_name || '',
          office_address: internshipAdminData.office_address || '',
          description: internshipAdminData.description || '',
          logo: internshipAdminData.logo || '',
          image: internshipAdminData.image || '',
        };

        setForm(updatedForm);
        console.log("new form", form)
        setExistingLogoUrl(internshipAdminData.logo_name || '');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching internshipAdmin data:', error);
      setLoading(false);
    }
  }, [internshipAdminId]);

  useEffect(() => {
    fetchInternshipAdminData();
  }, [fetchInternshipAdminData]);

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
                  <div className="col-lg-6 mb-3">
                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss">Name <span className="text-danger">*</span></label>
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
                      <label className="mont-font fw-600 font-xsss">
                        Legal Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="legal_name"
                        value={form.legal_name}
                        onChange={handleFormChange}
                        placeholder="Enter Legal Name"
                      />
                      {validationErrors.legal_name && (
                        <span className="text-danger">
                          {validationErrors.legal_name}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6 mb-3">
                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        className="form-control"
                        value={form.address}
                        onChange={handleFormChange}
                        placeholder="Enter Address"
                      />
                      {validationErrors.address && (
                        <span className="text-danger">
                          {validationErrors.address}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6 mb-3">
                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss">
                        Year of establishment
                      </label>
                      <input
                        type="text"
                        name="year_of_establishment"
                        className="form-control"
                        value={form.year_of_establishment}
                        onChange={handleFormChange}
                        placeholder="Enter year of establishment"
                        maxlength="4"
                      />
                      {validationErrors.year_of_establishment && (
                        <span className="text-danger">
                          {validationErrors.year_of_establishment}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6 mb-3">
                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss">
                        Accreditation
                      </label>
                      <input
                        type="text"
                        name="accreditation_no"
                        className="form-control"
                        value={form.accreditation_no}
                        onChange={handleFormChange}
                        placeholder="Enter accreditation"
                      />
                      {validationErrors.accreditation_no && (
                        <span className="text-danger">
                          {validationErrors.accreditation_no}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6 mb-3">
                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss">City</label>
                      <input
                        type="text"
                        name="city"
                        className="form-control"
                        value={form.city}
                        onChange={handleFormChange}
                        placeholder="Enter City"
                      />
                      {validationErrors.city && (
                        <span className="text-danger">
                          {validationErrors.city}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6 mb-3">
                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        className="form-control"
                        value={form.state}
                        onChange={handleFormChange}
                        placeholder="Enter State"
                      />
                      {validationErrors.state && (
                        <span className="text-danger">
                          {validationErrors.state}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 mb-3">
                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss">
                        Pincode
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        className="form-control"
                        value={form.pincode}
                        onChange={handleFormChange}
                        placeholder="Enter Pincode"
                        maxlength="6"
                      />
                      {validationErrors.pincode && (
                        <span className="text-danger">
                          {validationErrors.pincode}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 mb-3">
                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss">
                        Phone Number <span className="text-danger">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone_number"
                        className="form-control"
                        value={form.phone_number}
                        onChange={handleFormChange}
                        placeholder="Enter Phone Number"
                        maxLength="10"
                      />
                      {validationErrors.phone_number && (
                        <span className="text-danger">
                          {validationErrors.phone_number}
                        </span>
                      )}

                      {form.phone_number && form.phone_number.length !== 10 && (
                        <span className="text-danger">
                          Phone number must be exactly 10 digits.
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 mb-3">
                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss">
                        Website
                      </label>
                      <input
                        type="text"
                        name="website_url"
                        className="form-control"
                        value={form.website_url}
                        onChange={handleFormChange}
                        placeholder="Enter Website URL"
                      />
                      {validationErrors.website_url && (
                        <span className="text-danger">
                          {validationErrors.website_url}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 mb-3">
                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss">
                        Email <span className="text-danger">*</span>
                      </label>
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
                  <div className="col-lg-6 mb-3">
                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss">
                        Password
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
                  <div className="col-lg-12 mb-3">
                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss">
                        Description
                      </label>
                      <textarea
                        name="description"
                        className="form-control mb-0 p-3 h100 lh-16"
                        value={form.description}
                        onChange={handleFormChange}
                        placeholder="Enter Description"
                      ></textarea>
                      {validationErrors.password && (
                        <span className="text-danger">
                          {validationErrors.password}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-12 mb-3">
                    <div className="form-group">
                    <label className="mont-font form-label fw-600 font-xsss">
                         Image
                        {form.image ? (
                          <a
                            href={baseUrl + form.image} // URL of the uploaded image
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2"
                          >
                            <FaEye />
                          </a>
                        ) : (
                          <FaEyeSlash className="ml-2" />
                        )}
                      </label>
                      <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Select Internship Admin Image"
                        value={form.internship_admin_image_name}
                        onClick={() => fileInputRef.current.click()}
                        readOnly
                      />
                      {/* <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={() => fileLogoInputRef.current.click()}
                        >
                          Browse
                        </button>     */}
                         </div>
                      <input
                        type="file"
                        className="custom-file-input"
                        name="internship_admin_image"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                      />
                      {validationErrors.internship_admin_image && (
                        <span className="text-danger">
                          {validationErrors.internship_admin_image}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 mb-3">
                    <div className="form-group">
                      <label className="mont-font form-label fw-600 font-xsss">
                         Logo
                        {form.logo ? (
                          <a
                            href={baseUrl + form.logo} // URL of the uploaded image
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2"
                          >
                            <FaEye />
                          </a>
                        ) : (
                          <FaEyeSlash className="ml-2" />
                        )}
                      </label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Select Logo Image"
                          value={form.logo_name}
                          onClick={() => fileLogoInputRef.current.click()}
                          readOnly
                        />
                        {/* <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={() => fileLogoInputRef.current.click()}
                        >
                          Browse
                        </button> */}
                        
                      </div>
                      <input
                        type="file"
                        className="custom-file-input"
                        name="logo"
                        onChange={handleLogoFileChange}
                        ref={fileLogoInputRef}
                        style={{ display: 'none' }}
                      />
                      {validationErrors.logo && (
                        <span className="text-danger">
                          {validationErrors.logo}
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
