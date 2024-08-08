import { useState, useEffect, useCallback } from 'react';
import {
  getPublicStudents,
  getPrivateStudents,
  addStudentImages,
  updateStudentStatus,
} from '@/api/admin';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import DefaultProfileImage from '@/assets/images/default/student.png';
// import {BulkImageUploadModal} from '@/pages/Admin/PublicStudent/BulkImageUploadModal';
import { CustomModal } from '@/pages/Admin';
import { StudentTable } from '@/pages/Admin';
import { StudentCard } from '@/pages/Admin';
import PropTypes from 'prop-types';

import { Accordion, ContentHeader, Pagination } from '@/components/common';
import { getUserDataFromLocalStorage } from '@/utils/services';
import { fetchClasses, fetchSections, fetchPrivateSchools } from '@/api/common';
import ContentSelectFilter from '@/components/common/ContentSelectFilter';
function PublicStudent({ title, isPrivate, isPublic }) {
  console.log('title', title);
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
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState('');

  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState('');

  const fetchSchoolDropdownData = useCallback(() => {
    fetchPrivateSchools()
      .then((data) => {
        setSchools(data);
        console.log('school data', schools);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);
  const fetchClassDropdownData = useCallback(() => {
    fetchClasses()
      .then((data) => {
        setClasses(data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  const fetchSectionsDropdownData = useCallback(() => {
    fetchSections()
      .then((data) => {
        setSections(data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  useEffect(() => {
    fetchSchoolDropdownData();
  }, [fetchSchoolDropdownData]);
  useEffect(() => {
    fetchClassDropdownData();
  }, [fetchClassDropdownData]);

  useEffect(() => {
    fetchSectionsDropdownData();
  }, [fetchSectionsDropdownData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data = isPrivate ? await getPrivateStudents(currentPage) : await getPublicStudents(currentPage);
        const data = isPrivate
          ? await getPrivateStudents(
              currentPage,
              selectedSchool,
              selectedClass,
              selectedSection
            )
          : await getPublicStudents(
              currentPage,
              selectedClass,
              selectedSection
            );
        setStudents(data.students.data);
        setTotalPages(data.students.last_page);
        console.log('data of students', data.students);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [isPrivate, currentPage, selectedSchool, selectedClass, selectedSection]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (error) return <div>Error: {error.message}</div>;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    student_id: '',
    student_auth_id: '',
    created_by: '',
    image: '',
  });

  const clearForm = () => {
    setFormData({
      student_id: '',
      student_auth_id: '',
      created_by: '',
    });
    setSelectedImage(null);
  };
  const handleSchoolChange = async (event) => {
    const schoolId = event.target.value;
    setSelectedSchool(schoolId === '' ? '' : schoolId);

    setCurrentPage(1);
  };
  const handleClassChange = async (event) => {
    const classId = event.target.value;
    setSelectedClass(classId === '' ? '' : classId);
    setSelectedSection('');
    setCurrentPage(1);
  };

  const handleSectionChange = async (event) => {
    const sectionId = event.target.value;
    setSelectedSection(sectionId === '' ? '' : sectionId);
    setCurrentPage(1); // Reset to first page when filters change
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleFileChange = (newImages) => {
    setImages(newImages);
  };

  const handleSubmit = async (
    e,
    images,
    studentId,
    studentAuthId,
    createdBy
  ) => {
    if (e) e.preventDefault(); // Only call preventDefault if event is provided
    setIsSubmitting(true);

    try {
      const submissionData = new FormData();
      submissionData.append('student_id', studentId);
      submissionData.append('student_auth_id', studentAuthId); // Ensure this is set correctly elsewhere in your component
      submissionData.append('created_by', createdBy);
      console.log('Type of images:', typeof images, images);

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
    const data = {"student_auth_id": students[index].auth_id, "status": newStatus}
    try {
      const response = await updateStudentStatus(data);

        const updatedStudentsData = [...students];
        updatedStudentsData[index].status = newStatus;
        setStudents(updatedStudentsData);
      toast.success('Status updated successfully.');
    } catch (error) {
      console.error("There was an error updating the status!", error);
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
            link: `create`,
            text: 'New student',
          },
        ]}
      />
      <div className="px-2">
        <Accordion items={accordionItems} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        {modalOpen && (
          <CustomModal
            isOpen={showModal}
            onClose={handleCloseModal}
            handleSubmit={(e, images) =>
              handleSubmit(
                e,
                images,
                selectedStudent.student_id,
                selectedStudent.auth_id,
                createdBy
              )
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
  subtitle: PropTypes.string,
};

export default PublicStudent;
