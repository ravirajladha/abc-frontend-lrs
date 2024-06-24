import React from 'react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { ContentFormWrapper, ContentHeader } from '@/components/common';
import {
  SaveButton,
} from '@/components/common/form';

import { useNavigate, useParams } from 'react-router-dom';
import { editEbookModule, fetchEbookModuleDetails } from '@/api/admin';
function Edit() {
  const { ebookId, ebookModuleId } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const [moduleTitle, setModuleTitle] = useState(''); 

  const fetchData = async () => {
    try {
      const response = await fetchEbookModuleDetails(ebookModuleId);
      setModuleTitle(response.ebookModule.title);
      console.log(response.ebookModule.title);
    } catch (error) {
      toast.error(error.message);
    } finally {
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const submissionData = new FormData();
      submissionData.append('moduleTitle', moduleTitle);
  
      const response = await editEbookModule(ebookModuleId,submissionData);
      toast.success("Ebook module updated successfully.");

      setModuleTitle('');
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1500);
      navigate(`/admin/ebooks/${ebookId}/modules`);
    } catch (error) {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      }
      console.error('Error:', error.message);
      toast.error('Error submitting the form. Please try again.');
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <ContentHeader title="Edit Module" />
      <ContentFormWrapper formTitle="Edit EBook Module">
        <form onSubmit={handleSubmit} autoComplete="off">
            <div className="row" >
              <div className="col-lg-6 mb-2">
                <label className="mont-font fw-600 font-xsss">
                  Module Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  placeholder="Enter Module Title"
                  value={moduleTitle}
                  onChange={(e) => {
                    setModuleTitle(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
          <SaveButton isSubmitting={isSubmitting} />
        </form>
      </ContentFormWrapper>
    </>
  );
}

export default Edit;
