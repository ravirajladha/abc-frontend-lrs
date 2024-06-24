import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { ContentFormWrapper, ContentHeader } from '@/components/common';
import {
  SaveButton,
  AddFieldButton,
  DeleteFieldButton,
} from '@/components/common/form';

import { useNavigate, useParams } from 'react-router-dom';
import { createEbookSections } from '@/api/admin';

function Create() {
  const navigate = useNavigate();
  const { ebookId, ebookModuleId} = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const [sectionTitles, setSectionTitles] = useState(['']);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    try {
      const submissionData = new FormData();
      sectionTitles.forEach((title, index) => {
        submissionData.append(`sectionTitles[${index}]`, title);
      });
  
      const response = await createEbookSections(ebookId,ebookModuleId,submissionData);
      toast.success(response.message);

      clearForm();
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1500);
      navigate(`/admin/ebooks/${ebookId}/modules/${ebookModuleId}/sections`);
    } catch (error) {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      }
      console.error('Error:', error.message);
      toast.error('Error submitting the form. Please try again.');
      setIsSubmitting(false);
    }
  };

  const clearForm = () => {
    setSectionTitles(['']);
  };

  const deleteSection = (index) => {
    const updatedSectionTitles = [...sectionTitles];
    updatedSectionTitles.splice(index, 1);
    setSectionTitles(updatedSectionTitles);
  };
  const addSection = () => {
    setSectionTitles([...sectionTitles, '']);
  };
  return (
    <>
    <ContentHeader title="Add Sections" />
    <ContentFormWrapper formTitle="EBook Section">
      <form onSubmit={handleSubmit} autoComplete="off">
        {sectionTitles.map((title, index) => (
          <div className="row" key={index}>
            <div className="col-lg-6 mb-2">
              <label className="mont-font fw-600 font-xsss">
                Section Title
              </label>
              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="Enter Section Title"
                value={title}
                onChange={(e) => {
                  const updatedSectionTitles = [...sectionTitles];
                  updatedSectionTitles[index] = e.target.value;
                  setSectionTitles(updatedSectionTitles);
                }}
                required
              />
            </div>
            <DeleteFieldButton onClick={() => deleteSection(index)} />
          </div>
        ))}
        <AddFieldButton onClick={addSection} />

        <SaveButton isSubmitting={isSubmitting} />
      </form>
    </ContentFormWrapper>
  </>
  );
}

export default Create;
