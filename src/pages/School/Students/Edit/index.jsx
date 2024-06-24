import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { editStudent, fetchStudent } from '@/api/school';
import { fetchClasses, fetchSections } from '@/api/common';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { ContentCardWrapper, ContentHeader,ContentLoader } from '@/components/common';
import { SelectInput } from '@/components/common/form';

function Edit() {
  const navigate = useNavigate();
  const { studentId } = useParams();

  const fileInputRef = useRef();
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [validationErrors, setValidationErrors] = useState({});
  const [passwordMatch, setPasswordMatch] = useState(true);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword:'',
    phone_number: '',
    class_id: '',
    section_id: '',
    profile_image: '',
    doj: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    description: '',
    dob:'',
    profile_image:''

  });

  const fetchTeacherData = useCallback(async () => {
    try {
      const response = await fetchStudent(studentId);
      const data = response.student;
      if (data) {
        const updatedForm = {
          name: data.name || '',
          username: data.username || '',
          password: '',
          confirmPassword: '',
          email: data.email || '',
          phone_number: data.phone_number || '',
          class_id: data.class_id || '',
          section_id: data.section_id || '',
          dob: data.dob || '',
          pincode: data.pincode || '',
          address: data.address || '',
          profile_image: data.profile_image || '',
        };
        setForm(updatedForm);
        setLoading(false);

      }
    } catch (error) {
      console.error('Error fetching teacher data:', error);
      setLoading(false)
    }
  }, [studentId]);

  useEffect(() => {
    fetchTeacherData();
  }, [fetchTeacherData]);

  // const fetchClassDropdownData = useCallback(() => {
  //   fetchClasses()
  //     .then((data) => {
  //       setClasses(data);
  //     })
  //     .catch((error) => {
  //       toast.error(error.message);
  //     });
  //   fetchSectionsDropdownData();
  // }, []);

  // const fetchSectionsDropdownData = useCallback(() => {
  //   fetchSections()
  //     .then((data) => {
  //       setSections(data);
  //     })
  //     .catch((error) => {
  //       toast.error(error.message);
  //     });
  // }, []);

  // useEffect(() => {
  //   fetchClassDropdownData();
  // }, [fetchClassDropdownData]);

  // const handleClassChange = ({ target: { value } }) => {
  //   setValidationErrors(({ class_id: _, ...prevErrors }) => prevErrors);
  //   setForm((prevForm) => ({
  //     ...prevForm,
  //     class_id: value,
  //   }));
  // };

  // const handleSectionChange = ({ target: { value } }) => {
  //   setValidationErrors(({ section_id: _, ...prevErrors }) => prevErrors);
  //   setForm((prevForm) => ({
  //     ...prevForm,
  //     section_id: value,
  //   }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submissionData = new FormData();
      submissionData.append('_method', 'PUT');
      submissionData.append('name', form.name || '');
      submissionData.append('email', form.email || '');
      submissionData.append('phone_number', form.phone_number || '');
      submissionData.append('password', form.password || '');
      submissionData.append('confirmPassword', form.confirmPassword || '');
      submissionData.append('class_id', form.class_id || null);
      submissionData.append('section_id', form.section_id || null);
      if (form.profile_image) {
        submissionData.append('profile_image', form.profile_image);
        submissionData.append('profile_image_name', form.profile_image_name);
      }
      submissionData.append('dob', form.dob || '');
      submissionData.append('pincode', form.pincode || '');
      submissionData.append('address', form.address || '');

      const response = await editStudent(studentId, submissionData);
      toast.success('Student added successfully', response);
      navigate('/admin/public-students');
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

    if (name === 'pincode') {
      newValue = value.replace(/[^\d]/g, ''); // Remove any non-numeric characters
      if (newValue.length > 6) {
        newValue = newValue.slice(0, 6); // Restrict to first 10 numbers
      }
    }

    setForm((prevState) => ({ ...prevState, [name]: newValue }));
    if (name === 'confirmPassword') {
      setPasswordMatch(value === form.password);
    } else if (name === 'password') {
      setPasswordMatch(value === form.confirmPassword);
    }
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setForm((prevFormData) => ({
        ...prevFormData,
        profile_image: file,
        profile_image_name: file.name,
      }));
    }
  };

  return (
    <div className="px-2">
      <ContentHeader title="Edit" subtitle="Student" />

      <ContentCardWrapper>
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
                  <span className="text-danger">{validationErrors.name}</span>
                )}
              </div>
            </div>
            {/* <div className="col-lg-3 mb-2">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Select Class <span className="text-danger">*</span>
                </label>
                <SelectInput
                  className="form-control"
                  options={classes}
                  name="class"
                  label="name"
                  value={form.class_id}
                  onChange={handleClassChange}
                  placeholder="Select Class"
                />
                {validationErrors.class && (
                  <span className="text-danger">{validationErrors.class}</span>
                )}
              </div>
            </div>
            <div className="col-lg-3 mb-2">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Select Section
                </label>
                <SelectInput
                  className="form-control"
                  options={sections}
                  name="section"
                  label="name"
                  value={form.section_id}
                  onChange={handleSectionChange}
                  placeholder="Select Section"
                />
                {validationErrors.class && (
                  <span className="text-danger">{validationErrors.class}</span>
                )}
              </div>
            </div> */}
          
            <div className="col-lg-6 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Email </label>
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
                  Phone Number <span className="text-danger">*</span>
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
                <label className="mont-font form-label fw-600 font-xsss">
                  Profile Image
                  {form.profile_image ? (
                          <a
                            href={baseUrl + form.profile_image} // URL of the uploaded image
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
                <input
                  type="text"
                  className="form-control"
                  placeholder="Select Profile Image"
                  value={form.profile_image_name}
                  onClick={() => fileInputRef.current.click()}
                  readOnly
                />
                <input
                  type="file"
                  className="custom-file-input"
                  name="profile_image"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                />
                {validationErrors.profile_image && (
                  <span className="text-danger">
                    {validationErrors.profile_image}
                  </span>
                )}
              </div>
            </div>
            <div className="col-lg-6 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Date of Birth <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  name="dob"
                  className="form-control"
                  value={form.dob}
                  onChange={handleFormChange}
                  placeholder="Enter Date of Birth"
                />
                {validationErrors.dob && (
                  <span className="text-danger">{validationErrors.dob}</span>
                )}
              </div>
            </div>
            <div className="col-lg-6 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Pincode <span className="text-danger">*</span></label>
                <input
                  type="number"
                  name="pincode"
                  className="form-control"
                  value={form.pincode}
                  onChange={handleFormChange}
                  placeholder="Enter Pincode (only 6 digits allowed)"
                  maxLength="10"
                />
                {validationErrors.pincode && (
                  <span className="text-danger">
                    {validationErrors.pincode}
                  </span>
                )}
              </div>
            </div>
            <div className="col-lg-12 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Address <span className="text-danger">*</span> </label>
                <textarea
                  className="form-control mb-0 p-3 h100 lh-16"
                  name="address"
                  placeholder="Enter Address"
                  rows="4"
                  value={form.address}
                  onChange={handleFormChange}
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
                      Password *
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={form.password}
                      onChange={handleFormChange}
                      placeholder="Enter new password"
                    />
                    {validationErrors.password && (
                      <span className="text-danger">
                        {validationErrors.password}
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-lg-6 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className={`form-control ${
                        !passwordMatch && 'border-danger'
                      }`}
                      value={form.confirmPassword}
                      onChange={handleFormChange}
                      placeholder="Confirm new password"
                    />
                    {!passwordMatch && (
                      <small className="text-danger">
                        Passwords do not match.
                      </small>
                    )}
                    {validationErrors.confirmPassword && (
                      <span className="text-danger">
                        {validationErrors.confirmPassword}
                      </span>
                    )}
                  </div>
                </div>
          </div>

          <div className="row"></div>
          <div className="col-lg-12 mb-0 mt-2 pl-0">
            <button
              type="submit"
              className="bg-current border-0 text-center float-right text-white font-xsss fw-600 p-3 w150 rounded-lg d-inline-block"
            >
              <i className="feather-save mr-2"></i> Save
            </button>
          </div>
        </form>
            )}
      </ContentCardWrapper>
    </div>
  );
}
export default Edit;
