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
      console.log(response, ':respsonse');
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
      <ContentHeader title="All" subtitle="Courses" />
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
              className={`col-lg-3`}
              key={index}
            >
              <div className="card py-4 px-0 pt-4 mt-4 w-100 h-100 shadow-xss rounded-lg border-0 text-center d-flex justify-content-center align-items-center">
                <div className="wrapper d-flex flex-row w-100">
                  <div className="col-lg-12">
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
                      {subject?.class_name && (
                        <h4 className="fw-500 font-xss">{subject.class_name}</h4>
                      )}
                    </div>
                    <div className="d-flex justify-content-center">
                      <Link
                        to={subject.id + '/course-preview'}
                        className="px-2 py-1 mt-2 mx-1 d-inline-block text-white fw-700 lh-32 rounded-lg w100 text-center font-xsssss ls-3 bg-success"
                      >
                        LEARN
                      </Link>
                      {subject.results && subject.results.length > 0 &&(
                        <Link
                          to={subject.id + '/results'}
                          className={`px-2 py-1 mt-2 mx-1 d-inline-block text-white fw-700 lh-32 rounded-lg w100 text-center font-xsssss ls-3 bg-current`}
                        >
                          RESULTS
                        </Link>
                      )}
                      {subject.chapter_completed && subject.latest_test_id && (
                        <button
                          onClick={() => handleOpenModal(subject)}
                          disabled={loading1}
                          className={`px-2 py-1 mt-2 mx-1 d-inline-block text-white text-uppercase fw-700 lh-32 rounded-lg w100 text-center font-xsssss ls-3 ${
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
                            : 'Take Test'}
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              </div>
              {showModal && (
                <div
                  className={`modal modal-test-instructions  ${
                    showModal ? 'show' : ''
                  }`}
                  onClick={handleCloseModal}
                >
                  <div
                    className="modal-content-lg bg-white"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="modal-header modal-test-instructions-header">
                      <h3 className="modal-title modal-test-instructions-title ">
                        Test Instructions{' '}
                      </h3>{' '}
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
