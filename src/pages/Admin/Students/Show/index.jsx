import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import No_image from '@/assets/images/no_image.png';

import {
  ContentCardWrapper,
  ContentHeader,
  ContentLoader,
} from '@/components/common';
import { getStudentImages, deleteStudentImage } from '@/api/admin';

function Show({ title,isPrivate, isPublic}) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const { studentId } = useParams();
  const [loading, setLoading] = useState(true);
  const [studentImage, setStudentImageData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getStudentImages(studentId);
        setStudentImageData(data);
      } catch (error) {
        console.error('Error fetching student data:', error);
        toast.error('Failed to load images');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId]);

  const handleViewImage = (imageUrl) => {
    window.open(imageUrl, '_blank');
  };

  const handleDeleteImage = async (imageId) => {
    try {
      const response = await deleteStudentImage(imageId);
      
      // Check if the response indicates success
      if (response.status === true) {
        toast.success('Image deleted successfully');
        const updatedImages = studentImage.images.filter(
          (image) => image.id !== imageId
        );
        setStudentImageData({ ...studentImage, images: updatedImages });
      } else {
        toast.error(response.message || 'Failed to delete image');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      
      // Check if the error response contains a specific message
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to delete image');
      }
    }
  };
  
  const backLink = isPrivate ? '/admin/private-students' : '/admin/public-students';
  return (
    <div className="px-2">
      <ContentHeader title={title} backLink={backLink} />      
      
      {loading && (
        <div className="row my-5">
          <ContentLoader />
        </div>
      )}
      {!loading && (!studentImage || studentImage.images.length === 0) && (
        <div className="text-center my-5">
            <p>No images available for this student.</p>
          <img
            src={No_image}
            alt="No Images"
            className="mb-3"
            style={{ maxWidth: '150px' }}
          />
        
        </div>
      )}
      {studentImage && studentImage.images.length > 0 && (
        <ContentCardWrapper>
          {/* <div className="row">
            <div className="col-lg-12">
              <div className="mb-4 d-block w-100 rounded-lg border-0 text-center"> */}
                {/* <div className="image-gallery"> */}
                  {studentImage.images.map((item, index) => (
                    <div key={index} className="image-card">
                      <img
                        src={baseUrl + item.image_path}
                        alt="Student Image"
                        className="uniform-image"
                      />
                      <div className="actions">
                        <button
                          className="bg-current float-right border-0 text-center text-white font-xsss fw-600 p-3  rounded-sm d-inline-block"
                          onClick={() =>
                            handleViewImage(baseUrl + item.image_path)
                          }
                        >
                          <i className="feather-eye"></i>{' '}
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteImage(item.id)}
                        >
                          <i className="feather-trash"></i>{' '}
                        </button>
                      </div>
                    </div>
                  ))}
                {/* </div>
              </div>
            </div> */}
          {/* </div> */}
        </ContentCardWrapper>
      )}
    </div>
  );
}

Show.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Show;
