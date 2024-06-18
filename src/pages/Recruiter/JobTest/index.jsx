import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

import { ContentHeader, ContentLoader } from '@/components/common';
import { deleteTermTest, fetchJobTests } from '@/api/recruiter';
import { fetchClasses } from '@/api/dropdown';

import ContentSelectFilter from '@/components/common/ContentSelectFilter';

function Tests({ title}) {
  const [termTests, setTermTests] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [classes, setClasses] = useState([]);

  const [selectedClass, setSelectedClass] = useState([]);

  const fetchClassDropdownData = useCallback(() => {
    fetchClasses()
      .then((data) => {
        setClasses(data.classes);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  useEffect(() => {
    fetchClassDropdownData();
  }, [fetchClassDropdownData]);

  const getClassNames = (classIds) => {
    const ids = classIds.split(',');
    const classNames = ids
      .map((id) => {
        const classObj = classes.find((cls) => cls.id === parseInt(id));
        return classObj ? classObj.name : null;
      })
      .filter((name) => name !== null)
      .join(', ');

    return classNames;
  };

  const handleClassChange = ({ target: { value } }) => {
    setSelectedClass(value);
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await fetchJobTests(selectedClass);
      const data = response.term_tests;
      setTermTests(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching term tests:', error);
      setLoading(false);
    }
  }, [setTermTests, setLoading, selectedClass]);

  useEffect(() => {
    console.log('data', termTests);
    fetchData();
  }, [fetchData]);

  const handleDelete = async (testId) => {
    Swal.fire({
      title: 'Confirm!',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      text: 'Do you want to delete this term test?',
      icon: 'warning',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteTermTest(testId);
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
        title="Job Tests"
        buttons={[
          {
            link: 'create',
            text: 'New Test',
          },
          {
            iconClassName: '',
            link: 'question-bank',
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
                    options={classes}
                    name="selectedClass"
                    label="name"
                    value={selectedClass || ''}
                    onChange={handleClassChange}
                    defaultText="All Subjects"
                    className="float-right filter mr-2"
                  />
                  {/* <ContentSelectFilter
                    options={subjects}
                    name="selectedClass"
                    label="name"
                    value={selectedSubject || ''}
                    onChange={handleSubjectChange}
                    placeholder="Select a Subject"
                    defaultText="All Subjects"
                    className="float-right filter mr-2"
                  /> */}
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
                          No. Of Questions
                        </th>
                        {/* <th className="border-0" scope="col">
                          Subject
                        </th> */}
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
                      {termTests && termTests.length > 0 ? (
                        termTests.map((test, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            {/* <td>
                              {
                                TERM_TYPES.find(
                                  (item) => item.id === test.term_type
                                )?.name
                              }
                            </td> */}
                            <td>{test.title}</td>
                            {/* <td>{test.class_id}</td> */}

                            <td>{getClassNames(test.class_id)}</td>
                            <td>{test.no_of_questions}</td>
                            {/* <td>{test.subject}</td> */}
                            <td className="text-right pl-1">
                              {/* <Link
                                to={`${test.id}/results`}
                                className="btn btn-outline-success mr-2 btn-icon btn-sm"
                              >
                                <i className="feather-percent"></i>
                              </Link> */}
                              <Link
                                to={`${test.id}`}
                                className="btn btn-outline-primary mr-2 btn-icon btn-sm"
                              >
                                <i className="feather-eye"></i>
                              </Link>
                              <Link
                                to={`${test.id}/edit`}
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
