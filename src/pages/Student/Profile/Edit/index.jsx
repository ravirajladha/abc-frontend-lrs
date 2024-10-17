import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';

import {
  ContentLoader,
  ContentHeader,
  ContentFallback,
} from '@/components/common';

import {
  EditAboutSection,
  EditEducationSection,
  EditFamilySection,
  EditPersonalDetailSection,
} from '@/components/student/profile';
import { getStudentDetails, updateStudentProfile } from '@/api/student';

function Index() {
  const navigate = useNavigate();
  const { studentId } = useParams();

  const [selectedImage, setSelectedImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setSelectedImage(selectedImage);
    setFormData((prevFormData) => ({
      ...prevFormData,
      profile_image: selectedImage,
    }));
  };

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await getStudentDetails(studentId);
        setFormData(response.student);
      } catch (error) {
        toast.error('Failed to fetch student details');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, [studentId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formDataToSend = new FormData();

      // Append fields
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
  
      // If there's an image, append it to the formData
      if (formData.profile_image) {
        formDataToSend.append('profile_image', formData.profile_image);
      }

      const response = await updateStudentProfile(studentId, formDataToSend);
      toast.success('Student updated successfully', response);
      navigate(-1);
    } catch (error) {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      }
      toast.error(error.message);
    } finally {
      // setLoading(false);
    }
  };
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
    console.log(currentStep + ' step');
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const renderStepIndicator = () => {
    return (
      <div className="d-flex justify-content-between mb-4 px-5">
        {Array.from({ length: totalSteps }, (_, index) => (
          <span
            key={index}
            className={`font-xss fw-500 px-3 py-2 rounded-xl bg-${
              currentStep === index + 1 ? 'lightblue' : 'grey'
            }`}
          >
            Step- {index + 1}
          </span>
        ))}
      </div>
    );
  };
  return (
    <>
      <ContentHeader title="Profile" subtitle="Edit" />
      {loading ? (
        <ContentLoader />
      ) : (
        <>
          <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
            {renderStepIndicator()}
            <div className="card-body px-lg-5 w-100 border-0 mb-0">
              <form onSubmit={handleSubmit} autoComplete="off">
                {currentStep == 1 && (
                  <EditPersonalDetailSection
                    formData={formData}
                    handleFormChange={handleFormChange}
                    handleImageChange={handleImageChange}
                  />
                )}
                {currentStep == 2 && <EditEducationSection />}
                {currentStep == 3 && <EditFamilySection />}
                {currentStep == 4 && <EditAboutSection />}
                {currentStep > 1 && (
                  <button
                    type="button"
                    className="bg-secondary border-0 float-left text-center text-white font-xsss fw-600 px-3 py-2 w150 rounded-lg d-inline-block"
                    onClick={prevStep}
                  >
                    <i className="feather-arrow-left mr-2"></i> Previous
                  </button>
                )}
                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    className="bg-current border-0 float-right text-center text-white font-xsss fw-600 px-3 py-2 w150 rounded-lg d-inline-block"
                    onClick={nextStep}
                  >
                    Next <i className="feather-arrow-right ml-2"></i>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="bg-current border-0 float-right text-center text-white font-xsss fw-600 px-3 py-2 w150 rounded-lg d-inline-block"
                    onClick={handleSubmit}
                  >
                    Save <i className="feather-arrow-right ml-2"></i>
                  </button>
                )}
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Index;
