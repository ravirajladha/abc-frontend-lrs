import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchMyCourses, startTest, trackLiveSessionClick } from '@/api/student';
import { ContentItemCard, ContentLoader } from '@/components/common';
import { Link, useNavigate } from 'react-router-dom';
import { PiCertificateBold } from 'react-icons/pi';
import { MdLiveTv, MdOutlineAssessment } from 'react-icons/md';
import { getStudentDataFromLocalStorage } from '@/utils/services';
import StarRatings from 'react-star-ratings';
import { formatDate } from '@/utils/helpers';

function CoursesCard({ title }) {
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();
  const studentData = JSON.parse(getStudentDataFromLocalStorage());

  const studentId = studentData.student_auth_id;
  if (!studentId) {
    console.error('Student auth ID is not available');
    return;
  }

  const [loading1, setLoading1] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);

  const fetchCoursesCallback = useCallback(async () => {
    try {
      const data = await fetchMyCourses();
      setCourses(data.courses);
    } catch (error) {
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCoursesCallback();
  }, [fetchCoursesCallback]);

  const handleToggleView = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  const handleOpenModal = (course) => {
    setCurrentCourse(course);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleStartTestFromModal = (subjectId, latestTestId) => {
    handleCloseModal();
    handleStartTest(subjectId, latestTestId);
  };
  const handleStartTest = async (courseId, latestTestId) => {
    setLoading1(true);
    const data = {
      studentId, // Assuming this is available from context or state
      courseId,
      latestTestId,
    };

    try {
      const response = await startTest(data);
      console.log(response, ':respsonse');
      if (response.status === 200) {
        setLoading1(false);
        navigate(`/student/courses/test/${response.token}/${latestTestId}`); // Adjusted to use response.testSessionId directly
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

  const handleUrlClick = async (item) => {
    const respsonse = await trackLiveSessionClick(item.id);
    window.open(item.url, '_blank');
  };
  return (
    <>
      <h4 className="font-xs text-grey-800 my-3 lh-22 fw-700">{title}</h4>
      <div className="row">
        {loading ? (
          <div className="text-center col-12">
            <ContentLoader />
          </div>
        ) : courses && courses !== null && courses.length > 0 ? (
          <>
            {courses
              .slice(0, showAll ? courses.length : 4)
              .map((course, index) => (
                <div className="col-lg-3" key={index}>
                  <div
                    className="card course-card p-0 shadow-md border-0 rounded-lg overflow-hidden mr-3 mb-4 h-100"
                    key={index}
                  >
                    <div
                      className="card-image w-100 mb-3"
                      style={{ height: '200px' }}
                    >
                      <Link
                        to={`/student/courses/${course.id}/learn`}
                        className="video-bttn position-relative d-block h-100"
                      >
                        <img
                          src={baseUrl + course.image}
                          alt="course"
                          className="w-100 h-100"
                          style={{ objectFit: 'cover' }}
                        />
                      </Link>
                    </div>
                    <div className="card-body py-0">
                      <div className="d-flex justify-content-between">
                        <span
                          className={`font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 d-inline-block mr-1 alert-warning text-warning`}
                        >
                          {course.subject_name}
                        </span>
                        <div>
                          <StarRatings
                            rating={Number(course?.average_rating || 0)}
                            starRatedColor="gold"
                            numberOfStars={5}
                            starDimension="15px"
                            starSpacing="1px"
                          />
                          <h4 className="font-xsssss text-grey-600 fw-600 mt-1">
                            Based on {course.total_ratings} ratings
                          </h4>
                        </div>
                      </div>
                      <h4 className="fw-700 font-xss mt-2 lh-26 mt-0">
                        <Link
                          to={`/student/courses/${course.id}/learn`}
                          className="text-dark text-grey-900"
                        >
                          {course.name}
                        </Link>
                      </h4>
                      <span className="font-xssss fw-500 text-grey-900 d-inline-block ml-0 text-dark">
                        {course.trainer_name}
                      </span>
                      <hr />
                      <div className="progress mt-3 h10">
                        <div
                          className="progress-bar progress-bar-striped progress-bar-animated"
                          role="progressbar"
                          aria-valuemin="0"
                          style={{ width: `${course.completePercentage}%` }}
                        ></div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div className="d-flex flex-column">
                          <h4 className="fw-500 font-xssss mt-2">
                            Start date: {formatDate(course.start_date)}
                          </h4>
                          <h4 className="fw-500 font-xssss mt-2">
                            End date:{' '}
                            {course.results && course.results.length > 0
                              ? formatDate(course.results[0].created_at)
                              : '-'}
                          </h4>
                        </div>
                        <h4 className="fw-500 font-xssss mt-2">
                          Validity: {course.access_validity} days
                        </h4>
                      </div>
                      {course.liveSessions && course.liveSessions.length > 0
                        ? course.liveSessions.map((item, index) => (
                            <Link
                              key={index}
                              className="d-flex py-2 border-bottom"
                              onClick={() => handleUrlClick(item)}
                            >
                              <MdLiveTv
                                className="text-danger"
                              />{' '}
                              <p className="font-xsss fw-500 ml-2">
                                {item.session_type === 1
                                  ? 'Q&A Session'
                                  : 'Live Session'}{' '}
                                start at - {item.time.slice(0, 5)}
                              </p>
                            </Link>
                          ))
                        : ''}
                    </div>

                    <div className="card-footer bg-white">
                      {/* <p className="font-xssss text-grey-700 fw-500">Complete the course and test to get certificate.*</p> */}
                      <div className="d-flex justify-content-around mt-2">
                        {course.results && course.results.length > 0 && (
                          <>
                            <Link
                              className="d-flex flex-column align-items-center"
                              to={`/student/courses/${course.id}/results`}
                            >
                              <MdOutlineAssessment className="font-md text-primary" />
                              <p className="font-xssss text-grey-900 fw-500">
                                Result
                              </p>
                            </Link>
                            <Link
                              to={`/student/courses/${course.id}/certificate`}
                              className="d-flex flex-column align-items-center"
                            >
                              <PiCertificateBold className="font-md text-success text-center" />
                              <p className="font-xssss text-grey-900 fw-500">
                                Certificate
                              </p>
                            </Link>
                          </>
                        )}
                        {/* {course.chapter_completed && */}
                        {course.latest_test_id && (
                          <button
                            className="d-flex flex-column align-items-center"
                            onClick={() => handleOpenModal(course)}
                          >
                            <MdOutlineAssessment className="font-md text-primary" />
                            <p className="font-xssss text-grey-900 fw-500">
                              Test
                            </p>
                          </button>
                        )}
                        {/* <button className="d-flex flex-column align-items-center"
                        onClick={() => handleGenerateCertificate(course)}>
                          <PiCertificateBold className="font-md text-success text-center" />
                          <p className="font-xssss text-grey-900 fw-500">
                            Certificate
                          </p>
                        </button> */}
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
                              __html: currentCourse?.testDescription,
                            }}
                            style={{
                              listStyleType: 'disc',
                              paddingLeft: '20px',
                            }}
                          />
                        </div>
                        <div className="modal-footer modal-test-instructions-footer">
                          <button
                            type="button"
                            className="btn text-white bg-success"
                            onClick={() =>
                              handleStartTestFromModal(
                                currentCourse.id,
                                currentCourse.latest_test_id
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
              ))}
            {courses.length > 4 && (
              <div className="text-right mt-3 col-12">
                <button
                  className="btn bg-primary font-xsss text-white"
                  onClick={handleToggleView}
                >
                  {showAll ? 'View Less' : 'View All'}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center mt-5 col-12">
            <div className="alert" role="alert">
              There are no courses available at the moment.
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CoursesCard;
