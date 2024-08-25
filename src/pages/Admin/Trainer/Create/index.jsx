import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createTrainer } from '@/api/internshipAdmin';
import { fetchSubjects } from '@/api/common';

import { ContentCardWrapper, ContentHeader } from '@/components/common';
import { fetchCourses } from '@/api/dropdown';

function Create() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone_number: '',
    emp_id: '',
    course_id: '',
    subject_id: '',
    profile_image: '',
    doj: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    description: '',
  });

  const fetchSubjectDropdownData = useCallback(() => {
    fetchSubjects()
      .then((data) => {
        setSubjects(data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  useEffect(() => {
    fetchSubjectDropdownData();
  }, [fetchSubjectDropdownData]);

  const handleSubjectChange = ({ target: { value } }) => {
    setValidationErrors(({ subject_id: _, ...prevErrors }) => prevErrors);
    setForm((prevForm) => ({
      ...prevForm,
      subject_id: value,
    }));

    fetchCoursesDropdownData(value);
  };

  const fetchCoursesDropdownData = useCallback((subjectId) => {
    fetchCourses(subjectId)
      .then((data) => {
        setCourses(data.courses);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  const handleCourseChange = ({ target: { value } }) => {
    setForm((prevData) => ({ ...prevData, course: value }));
    setValidationErrors(({ course_id: _, ...prevErrors }) => prevErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createTrainer(form); // Use the API function for creating trainers
      toast.success('Trainer added successfully', response);
      navigate('/admin/trainers');
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
      <ContentHeader title="Create" subtitle="Trainer" />

      <ContentCardWrapper>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="row">
            <div className="col-lg-6 mb-3">
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
            <div className="col-lg-6 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Employee ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="emp_id"
                  value={form.emp_id}
                  onChange={handleFormChange}
                  placeholder="Enter Employee ID"
                />
                {validationErrors.emp_id && (
                  <span className="text-danger">{validationErrors.emp_id}</span>
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
          {/* <div className="row">
            <div className="col-lg-6 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Select Class
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
                {validationErrors.class_id && (
                  <span className="text-danger">{validationErrors.class_id}</span>
                )}
              </div>
            </div>
            <div className="col-lg-6 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Select Subject
                </label>
                <SelectInput
                  className="form-control"
                  options={subjects}
                  name="subject"
                  label="name"
                  value={form.subject_id}
                  onChange={handleSubjectChange}
                  placeholder="Select Subject"
                  fallbackPlaceholder="Select a Class first"
                />
                {validationErrors.subject && (
                  <span className="text-danger">
                    {validationErrors.subject}
                  </span>
                )}
              </div>
            </div>
          </div> */}
          <div className="col-lg-12 mb-0 mt-2 pl-0">
            <button
              type="submit"
              className="bg-current border-0 text-center float-right text-white font-xsss fw-600 p-3 w150 rounded-lg d-inline-block"
            >
              <i className="feather-save mr-2"></i> Save
            </button>
          </div>
        </form>
      </ContentCardWrapper>
    </div>
  );
}

export default Create;
