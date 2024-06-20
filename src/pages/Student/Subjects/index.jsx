import { useState, useEffect, useCallback } from 'react';
import { Link, useOutletContext, useNavigate } from 'react-router-dom';

import { ContentHeader, ContentLoader } from '@/components/common';

import { fetchSubjectsWithResults, startTest } from '@/api/student';

import { ContentFallback, ContentError } from '@/components/common';
import { getStudentDataFromLocalStorage } from '@/utils/services';
import { toast } from 'react-toastify';

import { Modal } from 'react-bootstrap';
function Subjects() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  // const studentData = useOutletContext();
  const navigate = useNavigate();
  const studentData = JSON.parse(getStudentDataFromLocalStorage());

  const studentId = studentData.student_id;
  const classId = studentData.class_id;
  const schoolId = studentData.school_id;
  console.log(studentData);
  const [subjects, setSubjects] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [currentSubject, setCurrentSubject] = useState(null);
  const handleOpenModal = (subject) => {
    setCurrentSubject(subject);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleStartTestFromModal = (subjectId, latestTestId) => {
    handleCloseModal();
    handleStartTest(subjectId, latestTestId);
  };

  const fetchSubjectsCallback = useCallback(() => {
    return fetchSubjectsWithResults(classId, studentId)
      .then((data) => {
        console.log('Fetching', data);
        setSubjects(data.subjects);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [classId]);

  useEffect(() => {
    fetchSubjectsCallback();
  }, []);

  const handleStartTest = async (subjectId, latestTestId) => {
    setLoading1(true);
    const data = {
      studentId, // Assuming this is available from context or state
      schoolId, // Assuming this is available from context or state
      subjectId,
      latestTestId,
    };

    try {
      const response = await startTest(data);
      console.log(response, ':rrespsonse');
      if (response.status === 200) {
        setLoading1(false);
        navigate(`term-test/${response.token}/${latestTestId}`); // Adjusted to use response.testSessionId directly
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      setLoading1(false);
      console.error(error);
      if (
        error.response &&
        error.response.data.message === 'Test already taken'
      ) {
        toast.error('You have already taken this test.');
      } else {
        toast.error('Unable to start the test. Please try again later.');
      }
    }
  };

  return (
    <div>
      <ContentHeader title="All" subtitle="Subjects" />
      <div className="row">
        {loading ? (
          <div className="text-center mt-5 col-12">
            <ContentLoader />
          </div>
        ) : error ? (
          <ContentError message={error.message} />
        ) : subjects && subjects.length > 0 ? (
          subjects?.map((subject, index) => (
            <div
              className={`${
                subject.results || subject.latest_test_id
                  ? 'col-xl-4'
                  : 'col-xl-3'
              } col-lg-6 mb-4`}
              key={index}
            >
              <div className="card py-4 px-0 w-100 h-100 shadow-xss rounded-lg border-0 text-center d-flex justify-content-center align-items-center">
                <div className="wrapper d-flex flex-row w-100">
                  <div
                    className={
                      subject.results || subject.latest_test_id
                        ? 'col-lg-5'
                        : 'col-lg-12'
                    }
                  >
                    <div>
                      <Link
                        to={''}
                        className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto img-fluid h100 w100"
                      >
                        <img
                          src={baseUrl + subject.image}
                          alt="icon"
                          className="p-1 w-100 h100 w100 object-fit-cover"
                        />
                      </Link>
                      <h4 className="fw-700 font-xs mt-3 lh-32 text-capitalize">
                        {subject.name}
                      </h4>
                      {subject?.subject_type && subject.subject_type == 3 && (
                        <h4 className="fw-500 font-xss">
                          {subject.super_subject_name}
                        </h4>
                      )}
                    </div>
                    <div>
                      <Link
                        to={subject.id + '/learn'}
                        className="px-2 py-1 mt-2 d-inline-block text-white fw-700 lh-32 rounded-lg w100 text-center font-xsssss ls-3 bg-success"
                      >
                        LEARN
                      </Link>
                    </div>
                  </div>

                  {/* Display results for the subject */}
                  {(subject.results || subject.latest_test_id) && (
                    <div className="col-lg-7 pl-0 pr-4">
                      <div className="row ">
                        <div className="col-12 table-responsive ">
                          <table className="table table-bordered mb-4">
                            <tbody>
                              {[1, 2, 3].map((termIndex) => {
                                const term_result = subject?.results?.find(
                                  (result) => result.term_type === termIndex
                                );

                                return (
                                  <tr
                                    key={termIndex}
                                    className="font-xssss fw-700 text-uppercase rounded-lg text-dark"
                                  >
                                    <th
                                      scope="row"
                                      className="border-success border-size-md"
                                    >
                                      {`Term ${termIndex}`}
                                    </th>
                                    <td className="border-size-md border-primary ml-2">
                                      Score:{' '}
                                      {term_result ? term_result.score : 'N/A'}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                        <div className="col-12 d-flex ">
                          {subject.latest_test_id && (
                            <button
                              // onClick={() =>
                              //   handleStartTest(
                              //     subject.id,
                              //     subject.latest_test_id
                              //   )
                              // }
                              onClick={() => handleOpenModal(subject)}
                              disabled={loading1}
                              className={`px-3 py-1 d-inline-block text-uppercase fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 mr-2 ${
                                subject.latest_test_id
                                  ? 'bg-current text-white'
                                  : 'd-none'
                              }`}
                              style={{
                                pointerEvents: subject.latest_test_id
                                  ? 'auto'
                                  : 'none',
                                cursor: subject.latest_test_id
                                  ? 'pointer'
                                  : 'not-allowed',
                              }}
                            >
                              {loading1
                                ? 'Loading...'
                                : subject.latest_term === 1
                                ? 'Term Test 1'
                                : subject.latest_term === 2
                                ? 'Term Test 2'
                                : 'Term Test 3'}
                            </button>

                          )}
                          {subject.results && (
                            <Link
                              to={subject.id + '/results'}
                              className={`px-4 py-1 d-inline-block text-uppercase fw-700 lh-30 rounded-lg text-center font-xsssss ls-3  bg-current text-white${
                                subject.results ? '' : 'd-none '
                              }`}
                            >
                              Results
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {showModal && (
              <div
                className={`modal modal-test-instructions  ${showModal ? 'show' : ''}`}
                onClick={handleCloseModal}
              >
                <div
                  className="modal-content-lg bg-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="modal-header modal-test-instructions-header">
                    <h3 className="modal-title modal-test-instructions-title ">Test Instructions </h3>{' '}
                    <span className="modal-title  modal-test-instructions-title text-sm mt-0 ml-4">
                      (Read Carefully before starting the test)
                    </span>
                    <button
                      type="button"
                      className="close modal-test-instructions-close"
                      onClick={handleCloseModal}
                    >
                      <span>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body modal-test-instructions-body">
                    {/* <div dangerouslySetInnerHTML={{ __html: currentSubject?.testDescription }} /> */}

                    <div
                      dangerouslySetInnerHTML={{
                        __html: currentSubject?.testDescription,
                      }}
                      style={{ listStyleType: 'disc', paddingLeft: '20px' }}
                    />
                  </div>
                  <div className="modal-footer modal-test-instructions-footer">
                    <button
                      type="button"
                      className="btn text-white bg-success"
                      onClick={() =>
                        handleStartTestFromModal(
                          currentSubject.id,
                          currentSubject.latest_test_id
                        )
                      }
                    >
                      Start Test
                    </button>
                  </div>
                </div>
              </div>
              )}
            </div>
          ))
        ) : (
          <ContentFallback message="  There are no subjects available at the moment." />
        )}
      </div>
    </div>
  );
}

export default Subjects;
