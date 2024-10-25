import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

import {
  ContentFormWrapper,
  ContentHeader,
  ContentLoader,
} from '@/components/common';
import { SaveButton, SelectInput } from '@/components/common/form';

import { getUserDataFromLocalStorage } from '@/utils/services';
import { getTrainerDetails, updateTrainerProfile } from '@/api/trainer';
import { setUserDataInLocalStorage } from '@/utils/helpers';
import DefaultProfileImage from '@/assets/images/default/user.png';

function Index() {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();
  const { trainerId } = useParams();
  const userData = JSON.parse(getUserDataFromLocalStorage());

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      profile_image: selectedImage,
    }));
  };

  useEffect(() => {
    const fetchTrainerDetails = async () => {
      try {
        const response = await getTrainerDetails(trainerId);
        setFormData(response.trainer);
      } catch (error) {
        toast.error('Failed to fetch trainer details');
      } finally {
        setLoading(false);
      }
    };
    fetchTrainerDetails();
  }, [trainerId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        const value = formData[key];
        formDataToSend.append(key, value);
      });
      // If there's an image, append it to the formData
      if (formData.profile_image) {
        formDataToSend.append('profile_image', formData.profile_image);
      }

      const response = await updateTrainerProfile(trainerId, formDataToSend);

      // Update user data in localStorage (if applicable)
      const updatedUserData = {
        ...userData, // existing user data
        username: formData.name, // assuming name is in updatedData
        email: formData.email,
        phone_number: formData.phone_number,
        // Add other relevant fields as needed
      };
      setUserDataInLocalStorage(updatedUserData);

      toast.success('Trainer data updated successfully', response);
      navigate(-1);
    } catch (error) {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
        toast.error(error.message);
      }
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  return (
    <div>
      <ContentHeader title="Update Profile" />
      {loading ? (
        <ContentLoader />
      ) : (
        <>
          <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
            <div className="card-body px-lg-5 w-100 border-0 mb-0">
              <form onSubmit={handleSubmit} autoComplete="off">
                <div className="row justify-content-center">
                  <div className="col-lg-4 mb-2">
                    <div className="form-group text-center">
                      <label className="mont-font fw-600 font-xsss">
                        <img
                          className="rounded-lg"
                          src={
                            formData.profile_image instanceof File
                              ? URL.createObjectURL(formData.profile_image) // New image preview
                              : formData.profile_image
                              ? baseUrl + formData.profile_image
                              : DefaultProfileImage // URL from backend or default image
                          }
                          alt="thumbnail"
                          width="120"
                          height="120"
                        />
                      </label>
                      <input
                        type="file"
                        name="image"
                        id="file"
                        className="input-file"
                        onChange={handleImageChange}
                        accept=".jpg, .jpeg, .png"
                      />
                      <label
                        htmlFor="file"
                        className="rounded-lg text-center bg-white btn-tertiary js-labelFile w-100 border-0"
                      >
                        <i className="ti-cloud-down small-icon mr-3"></i>
                        <span className="js-fileName">
                          {formData.profile_image ? (
                            <>{formData.profile_image.name} </>
                          ) : (
                            'Click to Upload an image'
                          )}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-4 col-md-12 mb-3">
                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="Enter Name"
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12 mb-3">
                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss">
                        Email
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="Enter Email"
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12 mb-3">
                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleFormChange}
                        placeholder="Enter Phone Number"
                        maxLength="10"
                        onKeyDown={(e) => {
                          // Only allow numbers (and optionally other characters like Backspace, Delete)
                          if (
                            !/^\d*$/.test(e.key) &&
                            e.key !== 'Backspace' &&
                            e.key !== 'Delete' &&
                            e.key !== 'Tab'
                          ) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12 mb-3">
                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss">
                        Employee ID
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="emp_id"
                        value={formData.emp_id}
                        onChange={handleFormChange}
                        placeholder="Enter employee id"
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12 mb-3">
                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss">
                        Experience
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="experience"
                        value={formData.experience}
                        onChange={handleFormChange}
                        placeholder="Enter Experience in years"
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12 mb-3">
                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss">
                        Expertise
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="expertise"
                        value={formData.expertise}
                        onChange={handleFormChange}
                        placeholder="Enter Expertise"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 mb-3">
                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss">
                        About
                      </label>
                      <textarea
                        type="text"
                        className="form-control mb-0 p-3 h100 lh-16"
                        name="description"
                        value={formData.description}
                        onChange={handleFormChange}
                        placeholder="Enter About"
                      />
                    </div>
                  </div>
                </div>
                <SaveButton isSubmitting={isSubmitting} />
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Index;
