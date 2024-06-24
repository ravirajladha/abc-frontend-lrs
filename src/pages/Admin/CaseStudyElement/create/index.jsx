import { useCallback, useEffect, useRef, useState } from 'react';
import { ContentFormWrapper, ContentHeader } from '@/components/common';
import { SaveButton, SelectInput } from '@/components/common/form';
import { createCaseStudyElement } from '@/api/admin';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

import { Paragraph } from '@/components/admin/eBook/createElements';
import {
  Appendices,
  Points,
} from '@/components/admin/case-study/createElements';

function Create() {
  const { caseStudyId, caseStudyModuleId, caseStudySectionId } = useParams();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const [selectedElement, setSelectedElement] = useState('');
  const [additionalField, setAdditionalField] = useState(null);
  const [inputFields, setInputFields] = useState({});

  const elementTypes = [
    { id: 1, name: 'Paragraph' },
    { id: 2, name: 'Points' },
    // { id: 3, name: 'Points with description' },
    { id: 4, name: 'Appendices' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.warn(inputFields);
    try {
      const submissionData = new FormData();
      submissionData.append('section_id', caseStudySectionId);
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
      const response = await createCaseStudyElement(
        caseStudySectionId,
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
  const handleInputArrayChange = (event, fieldName, index) => {
    const value = event.target.value;
    setInputFields((prevInputFields) => {
      const newInputFields = { ...prevInputFields };
      // Initialize the array if it's undefined
      if (!Array.isArray(newInputFields[fieldName])) {
        newInputFields[fieldName] = [];
      }
      newInputFields[fieldName][index] = value;
      return newInputFields;
    });
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
    } else if (selectedElementId === '2') {
      setAdditionalField(
        <Points
          inputFields={inputFields}
          handleInputChange={handleInputChange}
          handleInputArrayChange={handleInputArrayChange}
        />
      );
    } else if (selectedElementId === '4') {
      setAdditionalField(
        <Appendices
          handleInputChange={handleInputChange}
          handleInputArrayChange={handleInputArrayChange}
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
              link: `/case-studies/${caseStudyId}/preview`,
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
