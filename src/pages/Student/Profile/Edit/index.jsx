import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

import {
  ContentLoader,
  ContentHeader,
  ContentFallback,
} from '@/components/common';

import { getStudentDataFromLocalStorage } from '@/utils/services';
import {
  EditAboutSection,
  EditEducationSection,
  EditFamilySection,
  EditPersonalDetailSection,
} from '@/components/student/profile';

function Index() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const studentData = JSON.parse(getStudentDataFromLocalStorage());
  const [selectedImage, setSelectedImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    selectedImage: null,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setSelectedImage(selectedImage);
    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedImage,
    }));
  };

  const fetchData = useCallback(async () => {}, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('submitted');
    // navigate(`/student/profile`);
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
                  <Link
                  to={'/student/profile'}
                    type="button"
                    className="bg-current border-0 float-right text-center text-white font-xsss fw-600 px-3 py-2 w150 rounded-lg d-inline-block"
                  >
                    <i className="feather-save mr-2"></i> Save
                  </Link>
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
