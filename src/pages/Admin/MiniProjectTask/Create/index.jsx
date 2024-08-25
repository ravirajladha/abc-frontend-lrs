import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import { ContentFormWrapper, ContentHeader } from '@/components/common';
import { SaveButton, SelectInput } from '@/components/common/form';

import { fetchSelectedActiveElabs } from '@/api/common';
import { createMiniProjectTask,getMiniProjectDetail } from '@/api/admin';

function Create() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [elabs, setElabs] = useState([]);
  const [formData, setFormData] = useState({
    projectId: projectId,
    elabId: '',
    name: '',
    description: '',
  });
  const [courseId, setCourseId] = useState(null);
  const [subjectId, setSubjectId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});


  const fetchMiniProjectAndElabsData = useCallback(async () => {
    try {
      const miniProjectDetailsResponse = await getMiniProjectDetail(projectId);
      console.log("minin project detail from inside the task creation", miniProjectDetailsResponse);
      setCourseId(miniProjectDetailsResponse.miniProject.course_id); // Extract classId from the response
      setSubjectId(miniProjectDetailsResponse.miniProject.subject_id); // Extract subjectId from the response
  
      const elabsResponse = await fetchSelectedActiveElabs(miniProjectDetailsResponse.miniProject.subject_id, miniProjectDetailsResponse.miniProject.course_id);
      console.log(elabsResponse, "elab response");
      setElabs(elabsResponse.elabs);
    } catch (error) {
      toast.error(error.message);
    }
  }, [projectId]);
  

  useEffect(() => {
    fetchMiniProjectAndElabsData();
  }, [fetchMiniProjectAndElabsData]);



  const clearForm = () => {
    setFormData({
      elabId: '',
      name: '',
      description: '',
    });
    setValidationErrors({});
  };

  const handleElabChange = ({ target: { value } }) => {
    setFormData((prevData) => ({ ...prevData, elabId: value }));
    setValidationErrors(({ elabId: _, ...prevErrors }) => prevErrors);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('data to submit', formData);
    try {
      const response = await createMiniProjectTask(formData);
      toast.success(response.message);

      clearForm();
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1500);
      navigate(`/admin/mini-project-tasks/${projectId}`);
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
    <div>
      <ContentHeader title="Create Mini Project Task" />
      <ContentFormWrapper formTitle="New Mini Project">
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="row">
            <div className="col-lg-6 mb-2">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Select Elab
                </label>
                <SelectInput
                  className="form-control"
                  options={elabs}
                  name="elabId"
                  label="title"
                  value={formData.elabId}
                  onChange={handleElabChange}
                  placeholder="Select Elab"
                />
                {validationErrors.elabId && (
                  <span className="text-danger">{validationErrors.elabId}</span>
                )}
              </div>
            </div>
            <div className="col-lg-6 mb-2">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Task Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Enter Task Name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {validationErrors.name && (
                  <span className="text-danger">{validationErrors.name}</span>
                )}
              </div>
            </div>
            <div className="col-lg-12 mb-2">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Description
                </label>
                <textarea
                  className="form-control mb-0 p-3 h100 lh-16"
                  name="description"
                  placeholder="Enter Description"
                  rows="4"
                  value={formData.description}
                  onChange={handleInputChange}
                />
                {validationErrors.description && (
                  <span className="text-danger">
                    {validationErrors.description}
                  </span>
                )}
              </div>
            </div>
            <SaveButton isSubmitting={isSubmitting} />
          </div>
        </form>
      </ContentFormWrapper>
    </div>
  );
}

export default Create;
