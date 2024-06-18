import { useState, useEffect, useCallback } from 'react';
import {
  getPublicStudents,
  getPrivateStudents,
  addStudentImages,
  getDinacharyaLogs,
  sendDinacharyaMessages,
} from '@/api/admin';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import DefaultProfileImage from '@/assets/images/default/student.png';
// import {BulkImageUploadModal} from '@/pages/Admin/PublicStudent/BulkImageUploadModal';
import { DinacharyaModal } from '@/pages/Admin';
import { DinacharyaLogsTable } from '@/pages/Admin';
import { StudentCard } from '@/pages/Admin';
import PropTypes from 'prop-types';

import { Accordion, Pagination } from '@/components/common';
import { getUserDataFromLocalStorage } from '@/utils/services';
import { fetchClasses, fetchSections, fetchPrivateSchools } from '@/api/common';
import ContentSelectFilter from '@/components/common/ContentSelectFilter';
import { Spinner } from 'react-bootstrap';
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
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState('');

  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    student_id: '',
    student_auth_id: '',
    created_by: '',
    image: '',
  });

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
        console.log('classes data', classes);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  useEffect(() => {
    fetchSchoolDropdownData();
    fetchClassDropdownData();
  }, [fetchSchoolDropdownData, fetchClassDropdownData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDinacharyaLogs({
          page: currentPage,
          schoolId: selectedSchool,
          classId: selectedClass,
        });
        console.log('dinacharya logs from inside', data.students.data);
        setStudents(data.students.data);
        setTotalPages(data.students.last_page);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, selectedSchool, selectedClass]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSchoolChange = async (event) => {
    const schoolId = event.target.value;
    setSelectedSchool(schoolId === '' ? '' : schoolId);

    setCurrentPage(1);
  };
  const handleClassChange = async (event) => {
    const classId = event.target.value;
    setSelectedClass(classId === '' ? '' : classId);

    setCurrentPage(1);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleFileChange = (newImages) => {
    setImages(newImages);
  };

  // const handleSubmit = async (
  //   e,
  //   images,
  //   studentId,
  //   studentAuthId,
  //   createdBy
  // ) => {
  //   if (e) e.preventDefault();
  //   setIsSubmitting(true);

  //   try {
  //     const submissionData = new FormData();
  //     submissionData.append('student_id', studentId);
  //     submissionData.append('student_id', studentAuthId);
  //     submissionData.append('created_by', createdBy);
  //     console.log('Type of images:', typeof images, images);

  //     images.forEach((image) => {
  //       submissionData.append('images[]', image);
  //     });

  //     const response = await addStudentImages(submissionData);
  //     toast.success(response.message);
  //     setShowModal(false);
  //     clearForm();
  //     setTimeout(() => {
  //       setIsSubmitting(false);
  //     }, 1500);
  //   } catch (error) {
  //     console.error('Error:', error);
  //     toast.error(error.message);
  //     setIsSubmitting(false);
  //   }
  // };
  const clearForm = () => {
    setFormData({
      student_id: '',
      student_auth_id: '',
      created_by: '',
    });
    setSelectedImage(null);
  };
  const toggleModal = (student) => {
    setSelectedStudent(student);
    setModalOpen(!modalOpen);
    setShowModal(true);
  };

  const accordionItems = [
    {
      title: 'View as Table',
      content: (
        <DinacharyaLogsTable
          students={students}
          loading={loading}
          toggleModal={toggleModal}
        />
      ),
    },
    // {
    //   title: 'View as Cards',
    //   content: (
    //     <StudentCard
    //       students={students}
    //       loading={loading}
    //       baseUrl={baseUrl}
    //       toggleModal={toggleModal}
    //     />
    //   ),
    // },
  ];
  // if (error) return <div>Error: {error.message}</div>;
  console.log('selected student', selectedStudent);
  const [isSendingMessages, setIsSendingMessages] = useState(false);

  const handleSendMessages = async () => {
    setIsSendingMessages(true);
    try {
      const response = await sendDinacharyaMessages();
      toast.success(response.message);
      setIsSendingMessages(false);
    } catch (error) {
      setIsSendingMessages(false);
      toast.error('Error sending the message: ' + error.message);
    }
  };
  return (
    <div className="px-2">
      <div className="row mb-4">
        <div className="col-lg-12 d-flex align-items-center justify-content-between">
          <h2 className="text-grey-900 font-md mb-0">
            <span className="fw-600">{title}</span>
          </h2>
          <div className="card-body d-flex px-4 pt-4 pb-0 justify-content-between">
            <h4 className="font-xssss text-grey-700">{''}</h4>
            <div className="d-flex">
              <button
                onClick={handleSendMessages}
                className={`btn ml-auto float-right border-0 d-flex fw-600 text-uppercase py-2 px-3 rounded-lg text-center font-xsss shadow-xs mr-2 text-white bg-primary-gradiant`}
                disabled={isSendingMessages} 
              >
                {isSendingMessages ? (
                  <Spinner
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="mr-2"
                  />
                ) : (
                  <>
                    Send Messages
                  </>
                )}
              </button>

              <ContentSelectFilter
                options={schools}
                name="selectedSchool"
                label="name"
                value={selectedSchool}
                onChange={handleSchoolChange}
                defaultText="All Schools"
                className="float-right filter mr-2"
              />
              <ContentSelectFilter
                options={classes}
                name="selectedClass"
                label="name"
                value={selectedClass}
                onChange={handleClassChange}
                defaultText="All Subjects"
                className="float-right filter mr-2"
              />
            </div>
          </div>
        </div>
      </div>

      <Accordion items={accordionItems} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {modalOpen && (
        <DinacharyaModal
          isOpen={showModal}
          onClose={handleCloseModal}
          handleSubmit={(e, images) =>
            handleSubmit(
              e,
              images,
              selectedStudent,
              selectedStudent.student_id,
              createdBy
            )
          }
          handleFileChange={handleFileChange}
          studentId={selectedStudent}
          createdBy={createdBy}
        />
      )}
    </div>
  );
}

PublicStudent.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default PublicStudent;
