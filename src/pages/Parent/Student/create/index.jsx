import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createStudent, fetchFeeForSubject } from '@/api/parent';
import { fetchSubjects, fetchSections } from '@/api/common';

import { ContentCardWrapper, ContentHeader } from '@/components/common';
import { SelectInput } from '@/components/common/form';

function Create() {
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);
  const [sections, setSections] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone_number: '',
    subject_id: '',
    section_id: '',
    profile_image: '',
    doj: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    description: '',
  });

  const [amount, setAmount] = useState('');

  const fetchSubjectDropdownData = useCallback(() => {
    fetchSubjects()
      .then((data) => {
        setSubjects(data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  const fetchSectionsDropdownData = useCallback(() => {
    fetchSections()
      .then((data) => {
        setSections(data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  useEffect(() => {
    fetchSubjectDropdownData();
  }, [fetchSubjectDropdownData]);

  useEffect(() => {
    fetchSectionsDropdownData();
  }, [fetchSectionsDropdownData]);

  const fetchFee = useCallback((subjectId) => {
    fetchFeeForSubject(subjectId)
      .then((data) => {
        setAmount(data.fee);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  const handleSubjectChange = ({ target: { value } }) => {
    setValidationErrors(({ subject_id: _, ...prevErrors }) => prevErrors);
    setForm((prevForm) => ({
      ...prevForm,
      subject_id: value,
    }));
    fetchFee(value);
  };

  const handleSectionChange = ({ target: { value } }) => {
    setValidationErrors(({ section_id: _, ...prevErrors }) => prevErrors);
    setForm((prevForm) => ({
      ...prevForm,
      section_id: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount) {
      toast.error('The selected subject has no fees. Please try again later.');
      return;
    }
    try {
      const response = await createStudent(form);
      toast.success('Student added successfully', response);
      navigate('/parent/settings');
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

  return (
    <div className="px-2">
      <ContentHeader title="Create" subtitle="Student" />

      <ContentCardWrapper>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="row">
            <div className="col-lg-6 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Name <span className="text-danger">*</span>
                </label>
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
            <div className="col-lg-3 mb-2">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Select Subject <span className="text-danger">*</span>
                </label>
                <SelectInput
                  className="form-control"
                  options={subjects}
                  name="subject"
                  label="name"
                  value={form.subject_id}
                  onChange={handleSubjectChange}
                  placeholder="Select Subject"
                />
                {validationErrors.subject && (
                  <span className="text-danger">{validationErrors.subject}</span>
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
                {validationErrors.section && (
                  <span className="text-danger">{validationErrors.section}</span>
                )}
              </div>
            </div>
          </div>
          <div className="row">
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
                  placeholder="Enter Phone Number (enter 10 digits)"
                />
                {validationErrors.phone_number && (
                  <span className="text-danger">
                    {validationErrors.phone_number}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <h4 className="float-right font-xss fw-500">Rs.{amount}</h4>
            </div>
            <div className="col-lg-12 mb-0 mt-2 pl-0">
              <button
                type="submit"
                className="bg-current border-0 text-center float-right text-white font-xsss fw-600 p-3 w150 rounded-lg d-inline-block"
              >
                <i className="feather-save mr-2"></i> Save
              </button>
            </div>
          </div>
        </form>
      </ContentCardWrapper>
    </div>
  );
}
export default Create;
