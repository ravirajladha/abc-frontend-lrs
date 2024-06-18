import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import {
  ChangePasswordForm,
  ContentHeader,
  ContentLoader,
} from '@/components/common';

import {
  connectToParent,
  updateSettings,
  getParentDetails,
} from '@/api/student';
import { getStudentDataFromLocalStorage } from '@/utils/services';

function Settings() {
  const studentData = JSON.parse(getStudentDataFromLocalStorage());
  const studentId = studentData.student_auth_id;
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [validationErrors, setValidationErrors] = useState({});

  const [loading, setLoading] = useState(true);

  const [parentCode, setParentCode] = useState('');
  const [parentDetail, setParentDetail] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'confirmPassword') {
      setPasswordMatch(value === formData.password);
    } else if (name === 'password') {
      setPasswordMatch(value === formData.confirmPassword);
    }
  };

  const handleUpdateClick = async (event) => {
    event.preventDefault();
    try {
      const response = await updateSettings(studentId, formData);
      toast.success(response.message);
      setValidationErrors({});
    } catch (error) {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      }
      toast.error(error.message);
    } finally {
      setFormData({
        password: '',
        confirmPassword: '',
      });
    }
  };

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await getParentDetails(studentData.student_id);
      if (response && response.parent) {
        setParentCode(response.parent.parent_code);
        setParentDetail(response.parent);
        setLoading(false);
      } else {
        console.warn('Response or parent details are missing.');
        // Handle missing data case if needed
      }
    } catch (error) {
      console.error('Error fetching parent details:', error);
      // Handle error case if needed
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [parentFormData, setParentFormData] = useState({
    parent_code: '',
  });
  const [parentValidationErrors, setParentValidationErrors] = useState({});

  const handleParentInputChange = (event) => {
    const { name, value } = event.target;
    setParentFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleConnectToParent = async (event) => {
    event.preventDefault();
    try {
      const response = await connectToParent(parentFormData);
      // setParentCode(response.data.parent_code);
      fetchData();
      toast.success(response.message);
      setParentValidationErrors({});
    } catch (error) {
      if (error.validationErrors) {
        setParentValidationErrors(error.validationErrors);
      }
      toast.error(error.message);
    } finally {
      setFormData({ password: '', confirmPassword: '' });
    }
  };

  return (
    <div>
      <ContentHeader title="My" subtitle="Settings" />
      {/* Connect to Parent Form */}
      <div className="row">
        <div className="col-lg-12">
          <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4 rounded-lg">
            {loading ? (
              <div className="text-center col-12">
                <ContentLoader />
              </div>
            ) : parentCode ? (
              <h2 className="fw-400 font-lg text-grey-800 d-block p-4 text-center">
                Successfully connected to your parent !
                <b>
                  {parentDetail &&
                    ` ${parentDetail.name}, ${parentDetail.parent_code}`}
                </b>
              </h2>
            ) : (
              <>
                <div className="card-header bg-white border-top-0 pt-1 border-0">
                  <h2 className="fw-400 font-lg text-grey-800 d-block my-2">
                    Connect to <b> Parent</b>
                  </h2>
                </div>
                <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                  <form onSubmit={handleConnectToParent}>
                    <div className="row">
                      <div className="col-lg-9 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Parent Code *
                          </label>

                          <input
                            type="text"
                            name="parent_code"
                            className={`form-control style1-input font-xss ${
                              parentValidationErrors.parent_code
                                ? 'is-invalid'
                                : ''
                            }`}
                            placeholder="Enter the unique parent code"
                            value={parentFormData.parent_code}
                            onChange={handleParentInputChange}
                          />

                          {parentValidationErrors.parent_code && (
                            <div className="invalid-feedback">
                              {parentValidationErrors.parent_code}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-3 mb-3">
                        <div className="form-group">
                          <br className="" />
                          <input
                            type="submit"
                            className="w-100 mt-1 pb-1 d-block btn bg-current text-white font-xss fw-600 ls-3 style1-input p-0 border-0"
                            value="Connect"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <ChangePasswordForm
        formData={formData}
        validationErrors={validationErrors}
        passwordMatch={passwordMatch}
        onInputChange={handleInputChange}
        onUpdateClick={handleUpdateClick}
      />
    </div>
  );
}

export default Settings;
