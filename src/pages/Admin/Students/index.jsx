import { useState, useEffect } from 'react';
import { getPublicStudents, addStudentImages, updateStudentStatus } from '@/api/admin';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import DefaultProfileImage from '@/assets/images/default/student.png';
import { CustomModal, StudentTable, StudentCard } from '@/pages/Admin';
import PropTypes from 'prop-types';
import { Accordion, ContentHeader, Pagination } from '@/components/common';
import { getUserDataFromLocalStorage } from '@/utils/services';

function PublicStudent({ title }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const user_detail = JSON.parse(getUserDataFromLocalStorage());
  const createdBy = user_detail?.id;
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPublicStudents(currentPage);
        setStudents(data.students.data);
        setTotalPages(data.students.last_page);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const clearForm = () => {
    setSelectedImage(null);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleFileChange = (newImages) => {
    setImages(newImages);
  };

  const handleSubmit = async (e, images, studentId, studentAuthId, createdBy) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    try {
      const submissionData = new FormData();
      submissionData.append('student_id', studentId);
      submissionData.append('student_auth_id', studentAuthId);
      submissionData.append('created_by', createdBy);

      images.forEach((image) => {
        submissionData.append('images[]', image);
      });

      const response = await addStudentImages(submissionData);
      toast.success(response.message);
      setShowModal(false);
      clearForm();
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1500);
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message);
      setIsSubmitting(false);
    }
  };

  const toggleModal = (student) => {
    setSelectedStudent(student);
    setModalOpen(!modalOpen);
    setShowModal(true);
  };

  const handleStatusChange = async (index, newStatus) => {
    const data = { student_auth_id: students[index].auth_id, status: newStatus };
    try {
      const response = await updateStudentStatus(data);

      const updatedStudentsData = [...students];
      updatedStudentsData[index].status = newStatus;
      setStudents(updatedStudentsData);
      toast.success('Status updated successfully.');
    } catch (error) {
      console.error('There was an error updating the status!', error);
    }
  };

  const accordionItems = [
    {
      title: 'View as Table',
      content: (
        <StudentTable
          students={students}
          loading={loading}
          toggleModal={toggleModal}
          handleStatusChange={handleStatusChange}
        />
      ),
    },
    {
      title: 'View as Cards',
      content: (
        <StudentCard
          students={students}
          loading={loading}
          baseUrl={baseUrl}
          toggleModal={toggleModal}
        />
      ),
    },
  ];

  return (
    <>
      <ContentHeader
        title={title}
        buttons={[
          {
            link: 'create',
            text: 'New student',
          },
        ]}
      />
      <div className="px-2">
        <Accordion items={accordionItems} />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        {modalOpen && (
          <CustomModal
            isOpen={showModal}
            onClose={handleCloseModal}
            handleSubmit={(e, images) =>
              handleSubmit(e, images, selectedStudent.student_id, selectedStudent.auth_id, createdBy)
            }
            handleFileChange={handleFileChange}
            studentId={selectedStudent.student_id}
            createdBy={createdBy}
          />
        )}
      </div>
    </>
  );
}

PublicStudent.propTypes = {
  title: PropTypes.string,
};

export default PublicStudent;
