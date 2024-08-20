import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

import { ContentHeader, ContentLoader } from '@/components/common';

import { deleteTest, fetchTests } from '@/api/admin';
import { fetchCourses, fetchSubjects } from '@/api/dropdown';

import { TERM_TYPES } from '@/utils/constants';
import ContentSelectFilter from '@/components/common/ContentSelectFilter';
import StatusBadge from '@/components/common/StatusBadge';

function Tests({ title }) {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);

  const fetchSubjectDropdownData = useCallback(() => {
    fetchSubjects()
      .then((data) => {
        setSubjects(data.subjects);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  useEffect(() => {
    fetchSubjectDropdownData();
  }, [fetchSubjectDropdownData]);

  const fetchCoursesDropdownData = useCallback((subjectId) => {
    fetchCourses(subjectId)
      .then((data) => {
        setCourses(data.courses);
      })
      .catch((error) => {
        console.error(error.message);
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

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await fetchTests(selectedSubject, selectedCourse);
      const data = response.tests;
      setTests(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tests:', error);
      setLoading(false);
    }
  }, [setTests, setLoading, selectedSubject, selectedCourse]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (testId) => {
    Swal.fire({
      title: 'Confirm!',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      text: 'Do you want to delete this test?',
      icon: 'warning',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteTest(testId);
          toast.success(response.message);
          await fetchData();
        } catch (error) {
          toast.error(error.message);
          console.error('Error deleting test:', error);
        }
      }
    });
  };

  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <ContentHeader
        title="Tests"
        buttons={[
          {
            link: 'create',
            text: 'New Test',
          },
          {
            iconClassName: '',
            link: '/admin/tests/question-bank',
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
                    name="selectedSubject"
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
                        <th className="border-0" scope="col">
                        Status
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
                    <tbody>
                      {tests && tests.length > 0 ? (
                        tests.map((test, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{test.title}</td>
                            <td>{test.subject}</td>
                            <td>{test.course}</td>
                            <td><StatusBadge status={test.status} /></td>
                            <td className="text-right pl-1 d-flex justify-content-end align-items-center">
                              <Link
                                to={`/admin/tests/${test.id}/results`}
                                className="btn btn-outline-success mr-2 btn-icon btn-sm"
                              >
                                <i className="feather-percent"></i>
                              </Link>
                              <Link
                                to={`/admin/tests/${test.id}`}
                                className="btn btn-outline-primary mr-2 btn-icon btn-sm"
                              >
                                <i className="feather-eye"></i>
                              </Link>
                              <Link
                                to={`/admin/tests/${test.id}/edit`}
                                className="btn btn-outline-warning btn-icon mr-2 btn-sm"
                              >
                                <i className="feather-edit"></i>
                              </Link>
                              <button
                                onClick={() => handleDelete(test.id)}
                                className="btn btn-outline-danger btn-icon btn-sm"
                              >
                                <i className="feather-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">
                            There are no tests available at the moment.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Tests.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Tests;
