import { useCallback, useEffect, useRef, useState } from 'react';
import { ContentFormWrapper, ContentHeader } from '@/components/common';
import { SaveButton, SelectInput } from '@/components/common/form';
import { fetchEbookElementTypes, createEbookElement } from '@/api/admin';
import {
  Example,
  ExampleImagePractice,
  ExamplePractice,
  ExampleVideoPractice,
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
  MultipleButtons,
  Paragraph,
  Points,
  SingleButton,
  TextBox,
} from '@/components/admin/eBook/createElements';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

function Create() {
  const { ebookId, ebookModuleId, ebookSectionId } = useParams();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const [elementTypes, setElementTypes] = useState([]);
  const [selectedElement, setSelectedElement] = useState('');
  const [additionalField, setAdditionalField] = useState(null);
  const [inputFields, setInputFields] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetchEbookElementTypes();
      setElementTypes(response.elementTypes);
      console.warn(response.elementTypes);
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
      const response = await createEbookElement(ebookSectionId, submissionData);
      toast.success(response.message);

      clearForm();
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1500);
      //   navigate('/admin/ebooks');
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
        <Heading
          inputFields={inputFields}
          handleInputChange={handleInputChange}
        />
      );
    } else if (selectedElementId === '2') {
      setAdditionalField(
        <Paragraph
          inputFields={inputFields}
          handleInputChange={handleInputChange}
        />
      );
    } else if (selectedElementId === '3') {
      setAdditionalField(
        <Image_1
          inputFields={inputFields}
          handleImageChange={handleImageChange}
        />
      );
    } else if (selectedElementId === '4') {
      const handleImageTypeChange = (event) => {
        const selectedValue = event.target.value;
        // SET input value of image type
        handleInputChange(event, 'image_type');
        setAdditionalField(
          <Image_2
            selectedValue={selectedValue}
            inputFields={inputFields}
            handleInputChange={handleInputChange}
            handleImageTypeChange={handleImageTypeChange}
          />
        );
      };
      setAdditionalField(
        <>
          <div className="col-lg-4 mb-3"></div>
          <div className="col-lg-4 mb-3"></div>
          <div className="col-lg-4 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">Image Type</label>
              <select
                className="form-control"
                name="image_type"
                id="image_type_2"
                onChange={handleImageTypeChange}
              >
                <option value="" selected disabled readOnly>
                  --select--
                </option>
                <option value="image_2_1">Type-1</option>
                <option value="image_2_2">Type-2</option>
                <option value="image_2_3">Type-3</option>
                <option value="image_2_4">Type-4</option>
              </select>
            </div>
          </div>
        </>
      );
    } else if (selectedElementId === '5') {
      const handleImageTypeChange = (event) => {
        const selectedValue = event.target.value;
        // SET input value of image type
        handleInputChange(event, 'image_type');
        setAdditionalField(
          <Image_3
            selectedValue={selectedValue}
            inputFields={inputFields}
            handleInputChange={handleInputChange}
            handleImageTypeChange={handleImageTypeChange}
          />
        );
      };
      setAdditionalField(
        <>
          <div className="col-lg-4 mb-3"></div>
          <div className="col-lg-4 mb-3"></div>
          <div className="col-lg-4 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">Image Type</label>
              <select
                className="form-control"
                name="image_type"
                id="image_type_3"
                onChange={handleImageTypeChange}
              >
                <option value="" selected disabled readOnly>
                  --select--
                </option>
                <option value="image_3_1">Type-1</option>
                <option value="image_3_2">Type-2</option>
              </select>
            </div>
          </div>
        </>
      );
    } else if (selectedElementId === '6') {
      const handleImageTypeChange = (event) => {
        const selectedValue = event.target.value;
        // SET input value of image type
        handleInputChange(event, 'image_type');
        setAdditionalField(
          <Image_4
            selectedValue={selectedValue}
            inputFields={inputFields}
            handleInputChange={handleInputChange}
            handleImageTypeChange={handleImageTypeChange}
          />
        );
      };
      setAdditionalField(
        <>
          <div className="col-lg-4 mb-3"></div>
          <div className="col-lg-4 mb-3"></div>
          <div className="col-lg-4 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">Image Type</label>
              <select
                className="form-control"
                name="image_type"
                id="image_type_4"
                onChange={handleImageTypeChange}
              >
                <option value="" selected disabled readOnly>
                  --select--
                </option>
                <option value="image_4_1">Type-1</option>
                <option value="image_4_2">Type-2</option>
                <option value="image_4_3">Type-3</option>
              </select>
            </div>
          </div>
        </>
      );
    } else if (selectedElementId === '7') {
      const handleImageTypeChange = (event) => {
        const selectedValue = event.target.value;
        // SET input value of image type
        handleInputChange(event, 'image_type');
        setAdditionalField(
          <Image_5
            selectedValue={selectedValue}
            inputFields={inputFields}
            handleInputChange={handleInputChange}
            handleImageTypeChange={handleImageTypeChange}
          />
        );
      };
      setAdditionalField(
        <>
          <div className="col-lg-4 mb-3"></div>
          <div className="col-lg-4 mb-3"></div>
          <div className="col-lg-4 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">Image Type</label>
              <select
                className="form-control"
                name="image_type"
                id="image_type_5"
                onChange={handleImageTypeChange}
              >
                <option value="" selected disabled readOnly>
                  --select--
                </option>
                <option value="image_5_1">Type-1</option>
                <option value="image_5_2">Type-2</option>
              </select>
            </div>
          </div>
        </>
      );
    } else if (selectedElementId === '8') {
      const handleImageTypeChange = (event) => {
        const selectedValue = event.target.value;
        // SET input value of image type
        handleInputChange(event, 'image_type');
        setAdditionalField(
          <Image_6
            selectedValue={selectedValue}
            inputFields={inputFields}
            handleInputChange={handleInputChange}
            handleImageTypeChange={handleImageTypeChange}
          />
        );
      };
      setAdditionalField(
        <>
          <div className="col-lg-4 mb-3"></div>
          <div className="col-lg-4 mb-3"></div>
          <div className="col-lg-4 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">Image Type</label>
              <select
                className="form-control"
                name="image_type"
                id="image_type_6"
                onChange={handleImageTypeChange}
              >
                <option value="" selected disabled readOnly>
                  --select--
                </option>
                <option value="image_6_1">Type-1</option>
                <option value="image_6_2">Type-2</option>
                <option value="image_6_3">Type-3</option>
              </select>
            </div>
          </div>
        </>
      );
    } else if (selectedElementId === '9') {
      const handleImageTypeChange = (event) => {
        const selectedValue = event.target.value;
        // SET input value of image type
        handleInputChange(event, 'image_type');
        setAdditionalField(
          <Image_7
            selectedValue={selectedValue}
            inputFields={inputFields}
            handleInputChange={handleInputChange}
            handleImageTypeChange={handleImageTypeChange}
          />
        );
      };
      setAdditionalField(
        <>
          <div className="col-lg-4 mb-3"></div>
          <div className="col-lg-4 mb-3"></div>
          <div className="col-lg-4 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">Image Type</label>
              <select
                className="form-control"
                name="image_type"
                id="image_type_7"
                onChange={handleImageTypeChange}
              >
                <option value="" selected disabled readOnly>
                  --select--
                </option>
                <option value="image_7_1">Type-1</option>
                <option value="image_7_2">Type-2</option>
              </select>
            </div>
          </div>
        </>
      );
    } else if (selectedElementId === '10') {
      const handleImageTypeChange = (event) => {
        const selectedValue = event.target.value;
        // SET input value of image type
        handleInputChange(event, 'image_type');
        setAdditionalField(
          <Image_8
            selectedValue={selectedValue}
            inputFields={inputFields}
            handleInputChange={handleInputChange}
            handleImageTypeChange={handleImageTypeChange}
          />
        );
      };
      setAdditionalField(
        <>
          <div className="col-lg-4 mb-3"></div>
          <div className="col-lg-4 mb-3"></div>
          <div className="col-lg-4 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">Image Type</label>
              <select
                className="form-control"
                name="image_type"
                id="image_type_8"
                onChange={handleImageTypeChange}
              >
                <option value="" selected disabled readOnly>
                  --select--
                </option>
                <option value="image_8_1">Type-1</option>
                <option value="image_8_2">Type-2</option>
              </select>
            </div>
          </div>
        </>
      );
    } else if (selectedElementId === '11') {
      const handleImageTypeChange = (event) => {
        const selectedValue = event.target.value;
        // SET input value of image type
        handleInputChange(event, 'image_type');
        setAdditionalField(
          <Image_10
            selectedValue={selectedValue}
            inputFields={inputFields}
            handleInputChange={handleInputChange}
            handleImageTypeChange={handleImageTypeChange}
          />
        );
      };
      setAdditionalField(
        <>
          <div className="col-lg-4 mb-3"></div>
          <div className="col-lg-4 mb-3"></div>
          <div className="col-lg-4 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">Image Type</label>
              <select
                className="form-control"
                name="image_type"
                id="image_type_10"
                onChange={handleImageTypeChange}
              >
                <option value="" selected disabled readOnly>
                  --select--
                </option>
                <option value="image_10_1">Type-1</option>
                <option value="image_10_2">Type-2</option>
                <option value="image_10_3">Type-3</option>
              </select>
            </div>
          </div>
        </>
      );
    } else if (selectedElementId === '12') {
      setAdditionalField(
        <Points
          inputFields={inputFields}
          handleInputChange={handleInputChange}
          handleInputArrayChange={handleInputArrayChange}
        />
      );
    } else if (selectedElementId === '13') {
      setAdditionalField(
        <Example
          inputFields={inputFields}
          handleInputChange={handleInputChange}
        />
      );
    } else if (selectedElementId === '14') {
      setAdditionalField(
        <Gif inputFields={inputFields} handleImageChange={handleImageChange} />
      );
    } else if (selectedElementId === '15') {
      setAdditionalField(
        <ExamplePractice
          inputFields={inputFields}
          handleInputArrayChange={handleInputArrayChange}
        />
      );
    } else if (selectedElementId === '16') {
      setAdditionalField(
        <ExampleVideoPractice
          handleFileArrayChange={handleFileArrayChange}
          handleInputArrayChange={handleInputArrayChange}
        />
      );
    } else if (selectedElementId === '17') {
      setAdditionalField(
        <ExampleImagePractice
          handleImageChange={handleImageChange}
          handleInputArrayChange={handleInputArrayChange}
        />
      );
    } else if (selectedElementId === '18') {
      setAdditionalField(
        <MultipleButtons
          handleInputArrayChange={handleInputArrayChange}
        />
      );
    } else if (selectedElementId === '19') {
      setAdditionalField(
        <TextBox
          handleInputArrayChange={handleInputArrayChange}
        />
      );
    } else if (selectedElementId === '20') {
      setAdditionalField(
        <SingleButton
        inputFields={inputFields}
        handleInputChange={handleInputChange}
        />
      );
    }else {
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
              link: `/ebooks/${ebookId}/preview`,
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
