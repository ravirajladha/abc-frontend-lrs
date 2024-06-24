import { useCallback, useEffect, useRef, useState } from 'react';
import { ContentFormWrapper, ContentHeader } from '@/components/common';
import { SaveButton, SelectInput } from '@/components/common/form';
import { fetchEbookElement, updateEbookElement } from '@/api/admin';
import {
  Example,
  Gif,
  Heading,
  Image_1,
  Image_10,
  Image_2,
  Image_3,
  Image_4,
  Image_5,
  Image_6,
  Image_7,
  Image_8,
  Paragraph,
  SingleButton,
} from '@/components/admin/eBook/createElements';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { ExampleImagePractice, ExamplePractice, ExampleVideoPractice, MultipleButtons, Points, TextBox } from '@/components/admin/eBook/editElements';

function Edit() {
  const navigate = useNavigate();
  const { ebookId, ebookModuleId, ebookSectionId, ebookElementId } =
    useParams();

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
      const response = await fetchEbookElement(ebookElementId);
      setElementType(response.element.ebook_element_type_id);
      setSelectedElementId(response.element.ebook_element_type_id);
      let updatedElement = { ...response.element }; // Initialize updatedElement with the original response.element
      if (response.element.ebook_element_type_id === 12) {
        const arrayFromCommaSeparatedString =
          response.element.list_points.split('#@#');
        // Store the array back in the same key
        updatedElement = {
          ...response.element,
          list_points: arrayFromCommaSeparatedString,
        };
      }
      else if (response.element.ebook_element_type_id === 15) {
        updatedElement = {
          ...response.element,
          example_text: response.element.example_text.split('#@#'),
          example_description: response.element.example_description.split('#@#'),
          practice_description: response.element.practice_description.split('#@#'),
        };
      }
      else if (response.element.ebook_element_type_id === 16) {
        updatedElement = {
          ...response.element,
          example_gif: response.element.example_description.split('#@#'),
          practice_description: response.element.practice_description.split('#@#'),
        };
      }
      else if (response.element.ebook_element_type_id === 17) {
        updatedElement = {
          ...response.element,
          example_image_text: response.element.example_image_text.split('#@#'),
          example_description: response.element.example_description.split('#@#'),
          practice_description: response.element.practice_description.split('#@#'),
        };
      }
      else if (response.element.ebook_element_type_id === 18) {
        updatedElement = {
          ...response.element,
          button_text: response.element.button_text.split('#@#'),
        };
      }
      else if (response.element.ebook_element_type_id === 19) {
        updatedElement = {
          ...response.element,
          button_text: response.element.button_text.split('#@#'),
        };
      }
      setInputFields(updatedElement); // Update inputFields state with the updatedElement
      console.warn(updatedElement);
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
      submissionData.append('section_id', ebookSectionId);
      submissionData.append(
        'element_type_id',
        inputFields.ebook_element_type_id
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
      const response = await updateEbookElement(ebookElementId, submissionData);
      toast.success(response.message);

      clearForm();
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1500);
      navigate(`/ebooks/${ebookId}/preview`);
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
      if (Array.isArray(value)) {
        newInputFields[fieldName] = value;
      } else {
        newInputFields[fieldName][index] = value;
      }
      return newInputFields;
    });
  };
  const handleImageChange = (event, fieldName) => {
    const file = event.target.files[0];
    setInputFields((prevInputFields) => ({
      ...prevInputFields,
      [fieldName]: file,
    }));
  };
  const handleFileArrayChange = (event, fieldName, index) => {
    const value = event.target.files[0];
    setInputFields((prevInputFields) => {
      const newInputFields = { ...prevInputFields };
      if (!Array.isArray(newInputFields[fieldName])) {
        newInputFields[fieldName] = [];
      }
      newInputFields[fieldName][index] = value;
      return newInputFields;
    });
  };
  const setAdditionalFieldBasedOnElementType = () => {
    if (selectedElementId === 1) {
      setAdditionalField(
        <Heading
          inputFields={inputFields}
          handleInputChange={handleInputChange}
        />
      );
    } else if (selectedElementId === 2) {
      setAdditionalField(
        <Paragraph
          inputFields={inputFields}
          handleInputChange={handleInputChange}
        />
      );
    } else if (selectedElementId === 3) {
      setAdditionalField(
        <Image_1
          inputFields={inputFields}
          handleInputChange={handleInputChange}
        />
      );
    } else if (selectedElementId === 4) {
      const handleImageTypeChange = (event) => {
        const selectedValue = event.target.value;
        // SET input value of image type
        handleInputChange(event, 'image_type');
        setAdditionalField(
          <Image_2
            selectedValue={inputFields.image_type}
            inputFields={inputFields}
            handleInputChange={handleInputChange}
            handleImageTypeChange={handleImageTypeChange}
          />
        );
      };
      setAdditionalField(
        <>
          <Image_2
            selectedValue={inputFields.image_type}
            inputFields={inputFields}
            handleInputChange={handleInputChange}
            handleImageTypeChange={handleImageTypeChange}
          />
        </>
      );
    } else if (selectedElementId === 5) {
      const handleImageTypeChange = (event) => {
        const selectedValue = event.target.value;
        // SET input value of image type
        handleInputChange(event, 'image_type');
        setAdditionalField(
          <Image_3
            selectedValue={inputFields.image_type}
            inputFields={inputFields}
            handleInputChange={handleInputChange}
            handleImageTypeChange={handleImageTypeChange}
          />
        );
      };
      setAdditionalField(
        <>
          <Image_3
            selectedValue={inputFields.image_type}
            inputFields={inputFields}
            handleInputChange={handleInputChange}
            handleImageTypeChange={handleImageTypeChange}
          />
        </>
      );
    } else if (selectedElementId === 6) {
      const handleImageTypeChange = (event) => {
        const selectedValue = event.target.value;
        // SET input value of image type
        handleInputChange(event, 'image_type');
        setAdditionalField(
          <Image_4
            selectedValue={inputFields.image_type}
            inputFields={inputFields}
            handleInputChange={handleInputChange}
            handleImageTypeChange={handleImageTypeChange}
          />
        );
      };
      setAdditionalField(
        <>
          <Image_4
            selectedValue={inputFields.image_type}
            inputFields={inputFields}
            handleInputChange={handleInputChange}
            handleImageTypeChange={handleImageTypeChange}
          />
        </>
      );
    } else if (selectedElementId === 7) {
      const handleImageTypeChange = (event) => {
        const selectedValue = event.target.value;
        // SET input value of image type
        handleInputChange(event, 'image_type');
        setAdditionalField(
          <Image_5
            selectedValue={inputFields.image_type}
            inputFields={inputFields}
            handleInputChange={handleInputChange}
            handleImageTypeChange={handleImageTypeChange}
          />
        );
      };
      setAdditionalField(
        <>
          <Image_5
            selectedValue={inputFields.image_type}
            inputFields={inputFields}
            handleInputChange={handleInputChange}
            handleImageTypeChange={handleImageTypeChange}
          />
        </>
      );
    } else if (selectedElementId === 8) {
      const handleImageTypeChange = (event) => {
        const selectedValue = event.target.value;
        // SET input value of image type
        handleInputChange(event, 'image_type');
        setAdditionalField(
          <Image_6
            selectedValue={inputFields.image_type}
            inputFields={inputFields}
            handleInputChange={handleInputChange}
            handleImageTypeChange={handleImageTypeChange}
          />
        );
      };
      setAdditionalField(
        <>
          <Image_6
            selectedValue={inputFields.image_type}
            inputFields={inputFields}
            handleInputChange={handleInputChange}
            handleImageTypeChange={handleImageTypeChange}
          />
        </>
      );
    } else if (selectedElementId === 9) {
      const handleImageTypeChange = (event) => {
        const selectedValue = event.target.value;
        // SET input value of image type
        handleInputChange(event, 'image_type');
        setAdditionalField(
          <Image_7
            selectedValue={inputFields.image_type}
            inputFields={inputFields}
            handleInputChange={handleInputChange}
            handleImageTypeChange={handleImageTypeChange}
          />
        );
      };
      setAdditionalField(
        <>
          <Image_7
            selectedValue={inputFields.image_type}
            inputFields={inputFields}
            handleInputChange={handleInputChange}
            handleImageTypeChange={handleImageTypeChange}
          />
        </>
      );
    } else if (selectedElementId === 10) {
      const handleImageTypeChange = (event) => {
        const selectedValue = event.target.value;
        // SET input value of image type
        handleInputChange(event, 'image_type');
        setAdditionalField(
          <Image_8
            selectedValue={inputFields.image_type}
            inputFields={inputFields}
            handleInputChange={handleInputChange}
            handleImageTypeChange={handleImageTypeChange}
          />
        );
      };
      setAdditionalField(
        <>
          <Image_8
            selectedValue={inputFields.image_type}
            inputFields={inputFields}
            handleInputChange={handleInputChange}
            handleImageTypeChange={handleImageTypeChange}
          />
        </>
      );
    } else if (selectedElementId === 11) {
      const handleImageTypeChange = (event) => {
        const selectedValue = event.target.value;
        // SET input value of image type
        handleInputChange(event, 'image_type');
        setAdditionalField(
          <Image_10
            selectedValue={inputFields.image_type}
            inputFields={inputFields}
            handleInputChange={handleInputChange}
            handleImageTypeChange={handleImageTypeChange}
          />
        );
      };
      setAdditionalField(
        <>
          <Image_10
            selectedValue={inputFields.image_type}
            inputFields={inputFields}
            handleInputChange={handleInputChange}
            handleImageTypeChange={handleImageTypeChange}
          />
        </>
      );
    } else if (selectedElementId === 12) {
      setAdditionalField(
        <Points
          inputFields={inputFields}
          handleInputChange={handleInputChange}
          handleInputArrayChange={handleInputArrayChange}
        />
      );
    } else if (selectedElementId === 13) {
      setAdditionalField(
        <Example
          inputFields={inputFields}
          handleInputChange={handleInputChange}
          handleInputArrayChange={handleInputArrayChange}
        />
      );
    } else if (selectedElementId === 14) {
      setAdditionalField(
        <Gif inputFields={inputFields} handleImageChange={handleImageChange} />
      );
    } else if (selectedElementId === 15) {
      setAdditionalField(
        <ExamplePractice
          inputFields={inputFields}
          handleInputArrayChange={handleInputArrayChange}
        />
      );
    } else if (selectedElementId === 16) {
      setAdditionalField(
        <ExampleVideoPractice
          inputFields={inputFields}
          handleInputArrayChange={handleInputArrayChange}
          handleFileArrayChange={handleFileArrayChange}
        />
      );
    } else if (selectedElementId === 17) {
      setAdditionalField(
        <ExampleImagePractice
          inputFields={inputFields}
          handleInputArrayChange={handleInputArrayChange}
        />
      );
    } else if (selectedElementId === 18) {
      setAdditionalField(
        <MultipleButtons
          inputFields={inputFields}
          handleInputArrayChange={handleInputArrayChange}
        />
      );
    } else if (selectedElementId === 19) {
      setAdditionalField(
        <TextBox
          inputFields={inputFields}
          handleInputArrayChange={handleInputArrayChange}
        />
      );
    }else if (selectedElementId === 20) {
      setAdditionalField(
        <SingleButton
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
  );
}

export default Edit;
