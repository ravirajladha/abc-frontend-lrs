import { useCallback, useEffect, useRef, useState } from 'react';
import { ContentFormWrapper, ContentHeader } from '@/components/common';
import { SaveButton, SelectInput } from '@/components/common/form';
import { createProjectReportElement } from '@/api/admin';
import { Paragraph } from '@/components/admin/eBook/createElements';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

function Create() {
  const { projectReportId, projectReportModuleId, projectReportSectionId } =
    useParams();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const [selectedElement, setSelectedElement] = useState('');
  const [additionalField, setAdditionalField] = useState(null);
  const [inputFields, setInputFields] = useState({});

  const elementTypes = [{ id: 1, name: 'Paragraph' }];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.warn(inputFields);
    try {
      const submissionData = new FormData();
      submissionData.append('section_id', projectReportSectionId);
      submissionData.append('element_type_id', selectedElement);
      Object.keys(inputFields).forEach((fieldName) => {
        const fieldValues = inputFields[fieldName];

        if (Array.isArray(fieldValues)) {
          fieldValues.forEach((value, index) => {
            submissionData.append(`${fieldName}[${index}]`, value);
          });
        } else {
          // If there is only one value, treat it as a single value
          submissionData.append(fieldName, fieldValues);
        }
      });
      const response = await createProjectReportElement(
        projectReportSectionId,
        submissionData
      );
      toast.success(response.message);

      clearForm();
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1500);
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
    setSelectedElement('');
    setAdditionalField(null);
    setInputFields({});
  };

  const handleInputChange = (event, fieldName) => {
    const value = event.target.value;
    setInputFields((prevInputFields) => ({
      ...prevInputFields,
      [fieldName]: value,
    }));
  };
  const handleElementTypeChange = (event) => {
    const selectedElementId = event.target.value;
    setSelectedElement(selectedElementId);

    if (selectedElementId === '1') {
      setAdditionalField(
        <Paragraph
          inputFields={inputFields}
          handleInputChange={handleInputChange}
        />
      );
    } else {
      setAdditionalField(null); // Clear additional fields if no matching element is found
    }
    setInputFields({});
  };
  return (
    <>
      <div>
        <ContentHeader
          title="Create Elements"
          buttons={[
            {
              link: `/project-reports/${projectReportId}/preview`,
              text: 'View',
            },
          ]}
        />
        <ContentFormWrapper formTitle="New Elements">
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="row">
              <div className="col-lg-4 mb-2">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Select Element Type
                  </label>
                  <SelectInput
                    className="form-control"
                    options={elementTypes}
                    name="selectedElementType"
                    label="name"
                    value={selectedElement}
                    onChange={handleElementTypeChange}
                    placeholder="Select Element Type"
                    required
                  />
                  {validationErrors.selectedElement && (
                    <span className="text-danger">
                      {validationErrors.selectedElement}
                    </span>
                  )}
                </div>
              </div>
              {additionalField}

              <SaveButton isSubmitting={isSubmitting} />
            </div>
          </form>
        </ContentFormWrapper>
      </div>
    </>
  );
}

export default Create;
