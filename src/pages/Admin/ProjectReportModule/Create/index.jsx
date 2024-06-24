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
import { createProjectReportModules } from '@/api/admin';


function Create() {
  const navigate = useNavigate();
  const {projectReportId} = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const [moduleTitles, setModuleTitles] = useState(['']); // Array to store video names

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    try {
      const submissionData = new FormData();
      moduleTitles.forEach((title, index) => {
        submissionData.append(`moduleTitles[${index}]`, title);
      });
  

      const response = await createProjectReportModules(projectReportId,submissionData);
      toast.success(response.message);

      clearForm();
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1500);
      navigate(`/admin/project-reports/${projectReportId}/modules`);
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
    setModuleTitles(['']);
  };

  const deleteModule = (index) => {
    const updatedModuleTitles = [...moduleTitles];
    updatedModuleTitles.splice(index, 1);
    setModuleTitles(updatedModuleTitles);
  };
  const addModule = () => {
    setModuleTitles([...moduleTitles, '']);
  };

  return (
    <>
      <ContentHeader title="Add Modules" />
      <ContentFormWrapper formTitle="Project Report Modules">
        <form onSubmit={handleSubmit} autoComplete="off">
          {moduleTitles.map((title, index) => (
            <div className="row" key={index}>
              <div className="col-lg-6 mb-2">
                <label className="mont-font fw-600 font-xsss">
                  Module Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  placeholder="Enter Module Title"
                  value={title}
                  onChange={(e) => {
                    const updatedModuleTitles = [...moduleTitles];
                    updatedModuleTitles[index] = e.target.value;
                    setModuleTitles(updatedModuleTitles);
                  }}
                  required
                />
              </div>
              <DeleteFieldButton onClick={() => deleteModule(index)} />
            </div>
          ))}
          <AddFieldButton onClick={addModule} />

          <SaveButton isSubmitting={isSubmitting} />
        </form>
      </ContentFormWrapper>
    </>
  );
}

export default Create;
