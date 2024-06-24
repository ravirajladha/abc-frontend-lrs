import { useCallback, useEffect, useRef, useState } from 'react';
import { ContentFormWrapper, ContentHeader } from '@/components/common';
import { SaveButton, SelectInput } from '@/components/common/form';
import { updateCaseStudyElement, fetchCaseStudyElement } from '@/api/admin';
import { Paragraph } from '@/components/admin/eBook/createElements';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import {
  Appendices,
} from '@/components/admin/case-study/createElements';
import Point from '@/components/admin/case-study/editElements/Points';

function Edit() {
  const navigate = useNavigate();
  const {
    caseStudyId,
    caseStudyModuleId,
    caseStudySectionId,
    caseStudyElementId,
  } = useParams();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const [elementType, setElementType] = useState([]);
  const [selectedElement, setSelectedElement] = useState('');
  const [selectedElementId, setSelectedElementId] = useState('');
  const [additionalField, setAdditionalField] = useState(null);
  const [inputFields, setInputFields] = useState({});
  const isEditMode = true;

  const fetchData = async () => {
    try {
      const response = await fetchCaseStudyElement(caseStudyElementId);
      setElementType(response.element.case_study_element_type_id);
      setSelectedElementId(response.element.case_study_element_type_id);
      // Split the comma-separated string into an array
      const arrayFromCommaSeparatedString =
        response.element.list_points.split('#@#');
      // Store the array back in the same key
      const updatedElement = {
        ...response.element,
        list_points: arrayFromCommaSeparatedString,
      };

      setInputFields(updatedElement);
      console.warn(response.element);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.warn(inputFields);
    try {
      const submissionData = new FormData();
      submissionData.append('section_id', caseStudySectionId);
      submissionData.append(
        'element_type_id',
        inputFields.case_study_element_type_id
      );
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
      const response = await updateCaseStudyElement(
        caseStudyElementId,
        submissionData
      );
      toast.success(response.message);

      clearForm();
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1500);
      navigate(`/case-studies/${caseStudyId}/preview`);
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
  const handleInputArrayChange = (value, fieldName, index) => {
    console.log(value);
    setInputFields((prevInputFields) => {
      const newInputFields = { ...prevInputFields };

      // Initialize the array if it's undefined
      if (!Array.isArray(newInputFields[fieldName])) {
        newInputFields[fieldName] = [];
      }
      if(Array.isArray(value)){
        newInputFields[fieldName] = value;
      }else{
        newInputFields[fieldName][index] = value;
      }
      return newInputFields;
    });
  };
  const setAdditionalFieldBasedOnElementType = () => {
    if (selectedElementId === 1) {
      setAdditionalField(
        <Paragraph
          inputFields={inputFields}
          handleInputChange={handleInputChange}
        />
      );
    } else if (selectedElementId === 2) {
      setAdditionalField(
        <Point
          inputFields={inputFields}
          handleInputChange={handleInputChange}
          handleInputArrayChange={handleInputArrayChange}
        />
      );
    } else if (selectedElementId === 4) {
      setAdditionalField(
        <Appendices
          handleInputChange={handleInputChange}
          handleInputArrayChange={handleInputArrayChange}
        />
      );
    } else {
      setAdditionalField(null); // Clear additional fields if no matching element is found
    }
  };

  useEffect(() => {
    setAdditionalFieldBasedOnElementType();
  }, [selectedElementId, inputFields]);

  return (
    <>
      <div>
        <ContentHeader title="Edit Elements" />
        <ContentFormWrapper formTitle="Edit Elements">
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="row">
              <div className="col-lg-4 mb-2">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Element Type
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="elementType"
                    value={elementType}
                    placeholder="Element Type"
                    readOnly
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

export default Edit;
