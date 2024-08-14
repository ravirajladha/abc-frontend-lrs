import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import {
  ChangePasswordForm,
  ContentHeader,
  ContentLoader,
} from '@/components/common';

import {

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



  return (
    <div>
      <ContentHeader title="My" subtitle="Settings" />
      {/* Connect to Parent Form */}
    
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
