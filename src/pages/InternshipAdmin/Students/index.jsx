import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import { ContentHeader, ContentLoader } from '@/components/common';

import { deleteStudent, fetchStudentsBySubjectAndSection } from '@/api/internshipAdmin';
import { fetchSubjects, fetchSections } from '@/api/common';
import ContentSelectFilter from '@/components/common/ContentSelectFilter';
import { getUserDataFromLocalStorage } from '@/utils/services';

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState('');
  const userData = JSON.parse(getUserDataFromLocalStorage());
  const privateSchoolBool = userData.school_type === 1;

  const fetchSubjectDropdownData = useCallback(() => {
    fetchSubjects()
      .then((data) => {
        setSubjects(data);
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
    fetchSubjectDropdownData();
  }, []);

  useEffect(() => {
    fetchSectionsDropdownData();
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const data = await fetchStudentsBySubjectAndSection(null, null);
        setStudents(data.students);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const handleSubjectChange = async (event) => {
    const subjectId = event.target.value;
    setSelectedSubject(subjectId === '' ? '' : subjectId);
    setSelectedSection('');
  };

  const handleSectionChange = async (event) => {
    const sectionId = event.target.value;
    setSelectedSection(sectionId === '' ? '' : sectionId);
    setLoading(true);
    try {
      const data = await fetchStudentsBySubjectAndSection(
        selectedSubject === '' ? null : selectedSubject,
        sectionId === '' ? null : sectionId
      );
      setStudents(data.students);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleDelete = async (studentId) => {
    Swal.fire({
      title: 'Confirm!',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      text: 'Do you want to delete this student?',
      icon: 'warning',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteStudent(studentId);
          window.location.reload();
          toast.success(response.message);
        } catch (error) {
          toast.error(error.message);
          console.error('Error deleting student:', error);
        }
      }
    });
  };

  const buttons = [
    privateSchoolBool && {
      link: 'create',
      text: 'New Student',
    },
  ].filter(Boolean);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <ContentHeader title="All" subtitle="Students" buttons={buttons} />
      <div className="row">
        <div className="col-lg-12">
          <div className="card border-0 mt-0 rounded-lg shadow-xs">
            <div className="card-body d-flex px-4 pt-4 pb-0 justify-content-between">
              {/* <h4 className="font-xssss text-grey-700">Click on the student name to view assessment result*</h4> */}
              {/* <div className="d-flex">
                <ContentSelectFilter
                  options={subjects}
                  name="selectedSubject"
                  label="name"
                  value={selectedSubject}
                  onChange={handleSubjectChange}
                  defaultText="All Subjects"
                  className="float-right filter mr-2"
                />
                <ContentSelectFilter
                  options={sections}
                  name="selectedSection"
                  label="name"
                  value={selectedSection}
                  onChange={handleSectionChange}
                  defaultText="All Sections"
                  className="float-right filter mr-2"
                />
              </div> */}
            </div>
            {loading ? (
              <div className="text-center col-12">
                <ContentLoader />
              </div>
            ) : students && students.length > 0 ? (
              <div className="card-body p-4">
                <div className="table-responsive">
                  <table className="table table-admin mb-0 ">
                    <thead className="bg-greylight rounded-10 ovh border-0">
                      <tr>
                        <th className="border-0" width="4%">
                          #
                        </th>
                        <th className="border-0" width="15%">
                          Name
                        </th>
                        <th className="border-0" width="8%">
                          Roll Number
                        </th>
                        <th className="border-0" width="10%">
                          Phone Number
                        </th>
                        <th className="border-0" width="10%">
                          Email
                        </th>
                        <th className="border-0" width="15%">
                          Subject
                        </th>
                        <th className="border-0" width="10%">
                          Section
                        </th>
                        <th className="border-0" width="15%">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <Link
                              to={`${student.auth_id}/${student.subject_id}/assessment-result`}
                            >
                              {student.name}
                            </Link>
                          </td>
                          <td>{student.username}</td>
                          <td>{student.phone_number}</td>
                          <td>{student.email}</td>
                          <td>{student.subject_name}</td>
                          <td>{student.section_name}</td>
                          <td>
                            <Link
                              to={`public-students/${student.student_id}/show-profile`}
                              className="btn btn-outline-success btn-icon btn-sm mr-2"
                            >
                              <i className="feather-eye"></i>
                            </Link>
                            <Link
                              to={`${student.auth_id}/edit`}
                              className="btn btn-outline-warning btn-icon btn-sm mr-2"
                            >
                              <i className="feather-edit"></i>
                            </Link>
                            <button
                              onClick={() => handleDelete(student.auth_id)}
                              className="btn btn-outline-danger btn-icon btn-sm"
                            >
                              <i className="feather-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center mt-5 col-12">
                <div className="alert" role="alert">
                  There are no students available at the moment.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Students;
