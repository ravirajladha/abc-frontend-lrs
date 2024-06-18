import { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { updateChapter } from '@/api/admin';
import { fetchChapterData } from '@/api/common';

import { ContentLoader, ContentHeader } from '@/components/common';

function Edit() {
  const navigate = useNavigate();
  const { classId, subjectId, chapterId } = useParams();
  const fileInputRef = useRef();

  const [formData, setFormData] = useState({
    chapter_name: '',
    // chapter_image: null,
    // chapter_image_name: '',
    chapter_description: '',
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const getChapterDetails = useCallback(async () => {
    try {
      const response = await fetchChapterData(classId, subjectId, chapterId);
      const data = response.chapter;
      setFormData((prevFormData) => ({
        ...prevFormData,
        chapter_name: data.chapter_name,
        chapter_description: data.chapter_description,
      }));
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }, [classId, subjectId, chapterId]);

  useEffect(() => {
    getChapterDetails();
  }, [getChapterDetails]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setValidationErrors({});
  };

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       chapter_image: file,
  //       chapter_image_name: file.name,
  //     }));
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const submissionData = new FormData();

    submissionData.append('_method', 'PUT');
    submissionData.append('chapter_name', formData.chapter_name || '');
    submissionData.append(
      'chapter_description',
      formData.chapter_description || ''
    );

    // if (formData.chapter_image) {
    //   submissionData.append(
    //     'chapter_image',
    //     formData.chapter_image,
    //     formData.chapter_image.name
    //   );
    // }

    try {
      const response = await updateChapter(chapterId, submissionData);
      toast.success('Chapter updated successfully', response);
      navigate(`/admin/classes/${classId}/subjects/${subjectId}/chapters`);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      }
      toast.error(error.message);
    }
  };

  return (
    <div className="px-2">
      <ContentHeader title="Edit" subtitle="Chapter" />
      <div className="row">
        <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
          <div className="card-body p-lg-5 p-4 w-100 border-0 mb-0">
            {loading ? (
              <ContentLoader />
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-6 col-md-12 mb-3">
                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss">
                        Chapter Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="chapter_name"
                        value={formData.chapter_name}
                        onChange={handleFormChange}
                        placeholder="Enter Chapter Name"
                      />
                      {validationErrors.chapter_name && (
                        <span className="text-danger">
                          {validationErrors.chapter_name}
                        </span>
                      )}
                    </div>
                  </div>
                {/*    <div className="col-lg-6 col-md-12 mb-3">
                    <div className="form-group">
                      <label className="mont-font form-label fw-600 font-xsss">
                        Chapter Image
                      </label>
                     <input
                        type="text"
                        className="form-control"
                        placeholder="Select Chapter Image"
                        value={formData.chapter_image_name}
                        onClick={() => fileInputRef.current.click()}
                        readOnly
                      /> 
                      <input
                        type="file"
                        className="custom-file-input"
                        name="chapter_image"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                      />
                      {validationErrors.chapter_image && (
                        <span className="text-danger">
                          {validationErrors.chapter_image}
                        </span>
                      )}
                    </div>
                  </div>*/}
                  <div className="col-lg-12 col-md-12 mb-3">
                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss">
                        Chapter Description
                      </label>
                      <textarea
                        type="text"
                        className="form-control mb-0 p-3 h100 lh-16"
                        name="chapter_description"
                        value={formData.chapter_description || ''}
                        onChange={handleFormChange}
                        placeholder="Enter Chapter Description"
                      />
                      {validationErrors.chapter_description && (
                        <span className="text-danger">
                          {validationErrors.chapter_description}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 mb-0 mt-2 pl-0">
                  <button
                    type="submit"
                    className="bg-current border-0 float-right text-center text-white font-xsss fw-600 px-3 py-2 w150 rounded-lg d-inline-block"
                  >
                    <i className="feather-save mr-2"></i> Save
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Edit.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Edit;
