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
import { DinacharyaModal } from '@/pages/Admin';
import { DinacharyaLogsTable } from '@/pages/Admin';
import PropTypes from 'prop-types';

import { Accordion, Pagination } from '@/components/common';
import { getUserDataFromLocalStorage } from '@/utils/services';
import { fetchSubjects, fetchPrivateSchools } from '@/api/common';
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

  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
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
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  const fetchSubjectDropdownData = useCallback(() => {
    fetchSubjects()
      .then((data) => {
        setSubjects(data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  useEffect(() => {
    fetchSchoolDropdownData();
    fetchSubjectDropdownData();
  }, [fetchSchoolDropdownData, fetchSubjectDropdownData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDinacharyaLogs({
          page: currentPage,
          schoolId: selectedSchool,
          subjectId: selectedSubject,
        });
        setStudents(data.students.data);
        setTotalPages(data.students.last_page);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, selectedSchool, selectedSubject]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSchoolChange = async (event) => {
    const schoolId = event.target.value;
    setSelectedSchool(schoolId === '' ? '' : schoolId);
    setCurrentPage(1);
  };

  const handleSubjectChange = async (event) => {
    const subjectId = event.target.value;
    setSelectedSubject(subjectId === '' ? '' : subjectId);
    setCurrentPage(1);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleFileChange = (newImages) => {
    setImages(newImages);
  };

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
  ];

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
                  'Send Messages'
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
                options={subjects}
                name="selectedSubject"
                label="name"
                value={selectedSubject}
                onChange={handleSubjectChange}
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
