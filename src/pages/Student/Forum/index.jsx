import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useOutletContext } from 'react-router-dom';

import { ContentHeader } from '@/components/common';
import {
  LatestForum,
  QuestionForm,
  SearchBar,
} from '@/components/student/forum';
import { searchForumQuestion, storeForumQuestion } from '@/api/student';

function Forum({ title }) {
  const studentData = useOutletContext();
  const studentId = studentData.student_auth_id;

  const [question, setQuestion] = useState('');
  const [validationErrors, setValidationErrors] = React.useState({});
  const [loading, setLoading] = useState(false);
  const handleInputChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('studentId', studentId);
      formData.append('question', question);

      const response = await storeForumQuestion(formData);
      toast.success(response.message);
    } catch (error) {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      }
      toast.error(error.message);
    } finally {
      setLoading(false); // Stop loading
      setQuestion('');
    }
  };

  return (
    <div>
      <ContentHeader title={title} />
      <SearchBar />
      <QuestionForm
        question={question}
        validationErrors={validationErrors}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        loading={loading} 
      />
      {/* <LatestForum /> */}
    </div>
  );
}

Forum.propTypes = {
  title: PropTypes.string,
};

export default Forum;
