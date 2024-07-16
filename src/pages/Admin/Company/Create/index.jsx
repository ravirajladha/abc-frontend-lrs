import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ContentHeader, ContentFormWrapper } from '@/components/common';
import { FileInput } from '@/components/common/form';
const CreateCompany = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    location: '',
    image: '',
    category: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleFileChange = (file) => {
    setFormData((prevData) => ({
      ...prevData,
      image: file ? file : '',
    }));
    setSelectedImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Implement form submission logic here
    try {
      // Simulate form submission
      console.log('Form submitted:', formData);
      toast.success('Company created successfully.');
      setIsSubmitting(false);
      navigate('/path-to-redirect'); // Replace with actual path to redirect
    } catch (error) {
      toast.error('Error submitting the form. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ContentHeader title="Create Company" />
      <ContentFormWrapper formTitle="Create Company">
        <form
          id="createCompanyForm"
          onSubmit={handleSubmit}
          className={isSubmitting ? 'blurred-form' : ''}
          autoComplete="off"
        >
          <div className="row">
            <div className="col-lg-6 mb-2">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Title *</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  placeholder="Enter Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
                {validationErrors.title && (
                  <div className="text-danger">{validationErrors.title}</div>
                )}
              </div>
            </div>

            <div className="col-lg-6 mb-2">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Subtitle *</label>
                <input
                  type="text"
                  className="form-control"
                  name="subtitle"
                  placeholder="Enter Subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                />
                {validationErrors.subtitle && (
                  <div className="text-danger">{validationErrors.subtitle}</div>
                )}
              </div>
            </div>

            <div className="col-lg-6 mb-2">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Location *</label>
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  placeholder="Enter Location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
                {validationErrors.location && (
                  <div className="text-danger">{validationErrors.location}</div>
                )}
              </div>
            </div>

            <div className="col-lg-6 mb-2">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Category *</label>
                <select
                  className="form-control"
                  name="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="">Select Category</option>
                  <option value="IT">IT</option>
                  <option value="Non-IT">Non-IT</option>
                </select>
                {validationErrors.category && (
                  <div className="text-danger">{validationErrors.category}</div>
                )}
              </div>
            </div>

            <div className="col-lg-6 mb-2">
              <FileInput
                fileTypes="image"
                required
                onSelectFile={handleFileChange}
                selectedFile={selectedImage}
                clearSelectedFile={() => setSelectedImage(null)}
              />
              {validationErrors.image && (
                <div className="text-danger">{validationErrors.image}</div>
              )}
            </div>

            <div className="col-lg-12 mb-2">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Description *</label>
                <textarea
                  className="form-control mb-0 p-3 h100 lh-16"
                  name="description"
                  placeholder="Enter Description"
                  rows="4"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
                {validationErrors.description && (
                  <div className="text-danger">{validationErrors.description}</div>
                )}
              </div>
            </div>

            <div className="col-lg-12">
              <button
                type="submit"
                className="bg-current border-0 float-right text-center text-white font-xsss fw-600 px-3 py-2 w150 rounded-lg d-inline-block"
              >
                <i className="feather-save mr-2"></i> Save
              </button>
            </div>
          </div>
        </form>
      </ContentFormWrapper>
    </>
  );
};

export default CreateCompany;
