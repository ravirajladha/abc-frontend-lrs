import React, { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { ChangePasswordForm, ContentHeader } from '@/components/common';

import { updateSettings } from '@/api/admin';

function Settings({ title }) {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [validationErrors, setValidationErrors] = useState({});

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
      const response = await updateSettings(formData);
      toast.success(response.message);
      setValidationErrors({});
    } catch (error) {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      }
      toast.error(error.message);
    } finally {
      setFormData({ password: '', confirmPassword: '' });
    }
  };

  return (
    <div>
      <ContentHeader title={title} />
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

Settings.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Settings;
