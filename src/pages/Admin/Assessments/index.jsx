import { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { ContentLoader } from '@/components/common';
import { ContentHeader } from '@/components/common';
import { Link } from 'react-router-dom';

import { fetchChapters, fetchCourses, fetchSubjects } from '@/api/dropdown';
import { fetchAssessments, deleteAssessment } from '@/api/admin';
import ContentSelectFilter from '@/components/common/ContentSelectFilter';

function Assessments({ title }) {
  const [loading, setLoading] = useState(true);

  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState([]);

  const fetchSubjectDropdownData = useCallback(() => {
    fetchSubjects()
      .then((data) => {
        setSubjects(data.subjects);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  });

  useEffect(() => {
    fetchSubjectDropdownData();
  }, [fetchSubjectDropdownData]);

  const fetchCoursesDropdownData = useCallback((subjectId) => {
    fetchCourses(subjectId)
      .then((data) => {
        setCourses(data.courses);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  const handleSubjectChange = ({ target: { value } }) => {
    setSelectedSubject(value);
    setCourses([]);
    setSelectedCourse();
    if (value) {
      fetchCoursesDropdownData(value);
    }
  };


  const handleCourseChange = ({ target: { value } }) => {
    setSelectedCourse(value);
  };

  const [assessments, setAssessments] = useState([]);

  const fetchAssessmentsData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAssessments(selectedSubject, selectedCourse);
      setAssessments(data.assessments);
      setLoading(false);
    } catch (error) {
      // console.error('Error fetching assessments:', error);
      toast.error('Failed to fetch assessments', error.message);
      setLoading(false);
    }
  }, [selectedCourse, selectedSubject]);

  const handleDelete = useCallback(
    async (assessmentId) => {
      Swal.fire({
        title: 'Confirm!',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        text: 'Do you want to delete this assessment?',
        icon: 'warning',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await deleteAssessment(assessmentId);
            fetchAssessmentsData();
            toast.success(response.message);
          } catch (error) {
            toast.error(error.message);
          }
        }
      });
    },
    [fetchAssessmentsData]
  );

  useEffect(() => {
    fetchAssessmentsData();
  }, [fetchAssessmentsData]);

  return (
    <>
      <ContentHeader
        title="Assessments"
        buttons={[
          {
            link: 'create',
            text: 'New Assessment',
          },
          {
            iconClassName: '',
            link: '/admin/assessments/question-bank',
            text: 'Question Bank',
          },
        ]}
      />
      {loading ? (
        <div className="text-center mt-5 col-12">
          <ContentLoader />
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-12">
            <div className="card border-0 mt-0 rounded-lg shadow-sm">
              <div className="card-body d-flex align-items-center justify-content-between pt-4 px-4 pb-0">
                <h4 className="font-xss text-grey-800 mt-3 fw-700">{title}</h4>
                <div className="d-flex g-4">
                  <ContentSelectFilter
                    options={subjects}
                    name="selectedSubject"
                    label="name"
                    value={selectedSubject || ''}
                    onChange={handleSubjectChange}
                    defaultText="All Subjects"
                    className="float-right filter mr-2"
                  />
                  <ContentSelectFilter
                    options={courses}
                    name="selectedCourse"
                    label="name"
                    value={selectedCourse || ''}
                    onChange={handleCourseChange}
                    placeholder="Select a Course"
                    defaultText="All Courses"
                    className="float-right filter mr-2"
                  />
                  
                </div>
              </div>
              <div className="card-body p-4">
                <div className="table-responsive">
                  <table className="table table-admin mb-0 ">
                    <thead className="bg-greylight rounded-10 ">
                      <tr>
                        <th className="border-0" scope="col">
                          #
                        </th>
                        <th className="border-0" scope="col">
                          Name
                        </th>
                        <th className="border-0" scope="col">
                        Subject
                        </th>
                        <th className="border-0" scope="col">
                          Course
                        </th>
                        <th
                          scope="col"
                          className="text-right border-0 pl-1"
                          width="25%"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    {assessments && assessments?.length > 0 ? (
                      <tbody>
                        {assessments?.map((assessment, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <strong>{assessment.title}</strong>
                            </td>
                            <td>{assessment.subject}</td>
                            <td>{assessment.course}</td>
                            <td className="text-right">
                              <Link
                                to={`${assessment.id}/results`}
                                className="btn btn-outline-success btn-icon btn-sm mr-2"
                              >
                                <i className="feather-percent"></i>
                              </Link>

                              <Link
                                to={`${assessment.id}`}
                                className="btn btn-outline-warning btn-icon btn-sm mr-2"
                              >
                                <i className="feather-eye"></i>
                              </Link>

                              <Link
                                to={`${assessment.id}/edit`}
                                className="btn btn-outline-primary btn-icon btn-sm mr-2"
                              >
                                <i className="feather-edit"></i>
                              </Link>

                              <Link
                                to="#"
                                className="btn btn-outline-danger btn-icon btn-sm"
                                onClick={() => handleDelete(assessment.id)}
                              >
                                <i className="feather-trash"></i>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    ) : (
                      <tbody>
                        <tr>
                          <td colSpan="5" className="text-center">
                            There are no assessments available at the moment.
                          </td>
                        </tr>
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

Assessments.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Assessments;
