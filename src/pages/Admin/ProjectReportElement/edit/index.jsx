import { useCallback, useEffect, useRef, useState } from 'react';
import { ContentFormWrapper, ContentHeader } from '@/components/common';
import { SaveButton, SelectInput } from '@/components/common/form';
import { updateProjectReportElement, fetchProjectReportElement } from '@/api/admin';
import {
  Paragraph,
} from '@/components/admin/eBook/createElements';
import { useNavigate,useParams } from 'react-router';
import { toast } from 'react-toastify';


function Edit() {
  const navigate = useNavigate();
  const { projectReportId, projectReportModuleId, projectReportSectionId, projectReportElementId } = useParams();

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
      const response = await fetchProjectReportElement(projectReportElementId);
      setElementType(response.element.project_report_element_type_id);
      setSelectedElementId(response.element.project_report_element_type_id);
      setInputFields(response.element)
    //   console.warn(response.element);
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
        submissionData.append('section_id', projectReportSectionId);
        submissionData.append('element_type_id', inputFields.project_report_element_type_id);
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
        const response = await updateProjectReportElement(projectReportElementId, submissionData);
        toast.success(response.message);
  
        clearForm();
        setTimeout(() => {
          setIsSubmitting(false);
        }, 1500);
          navigate(`/project-reports/${projectReportId}/preview`);
      } catch (error) {
        if (error.validationErrors) {
          setValidationErrors(error.validationErrors);
        }
        console.error('Error:', error.message);
        toast.error('Error submitting the form. Please try again.');
        setIsSubmitting(false);
      }
  }
  
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
  const setAdditionalFieldBasedOnElementType = () => {
    if (selectedElementId === 1) {
        setAdditionalField(
          <Paragraph
            inputFields={inputFields}
            handleInputChange={handleInputChange}
          />
        );
    }else {
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
    )
}

export default Edit
