import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Timer, QuestionCard, ScoreCard } from '@/components/student/test';
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai';
import { getStudentDataFromLocalStorage } from '@/utils/services';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import {
  ContentFallback,
  ContentLoader,
  ContentDisplayModal,
} from '@/components/common';

import {
  fetchJobDetailsByToken,
  storeJobResponseWithToken,
} from '@/api/student';

function JobTest() {
  // const { subjectId, jobId } = useParams();
  const { token, jobId } = useParams();
  console.log('token and jobId', token, jobId);
  // const subjectId = 1;
  const navigate = useNavigate();

  // const studentData = useOutletContext();
  const studentData = JSON.parse(getStudentDataFromLocalStorage());

  // console.log(studentData1, 'Student');
  const studentId = studentData.student_id;
  const schoolId = studentData.school_id;
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [testDuration, setTestDuration] = useState(null);
  // const [subjectId, setSubjectId] = useState(null);
  const [passingPercentage, setPassingPercentage] = useState(null);
  const [classId, setClassId] = useState(null);
  const [testId, setTestId] = useState(null);
  const [result, setResult] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);
  const [timeTaken, setTimeTaken] = useState(0);
  const [testDetails, setTestDetails] = useState({});
  const hasFetched = useRef(false);

  // let currentQuestion;
  // if (questions) {
  //   currentQuestion = questions[questionIndex];
  // }

  let currentQuestion = questions ? questions[questionIndex] : null;
  const [testComplete, setTestComplete] = useState(false);

  const getTestDetails = useCallback(async () => {
    try {
      const data = await fetchJobDetailsByToken(token, jobId);
      // console.log('data inside', data.data);
      // console.log('data from the test', data);

      if (!data.status) {
        toast.error(data.data.message); // Show error message from the server as a toast
        console.log('navigatesd');
        navigate('/student/jobs'); // Navigate back
        return;
      }
      // setSubjectId(data.data.job_test.subject_id);
      setClassId(data.data.test_result.class_id);
      setTestDetails(data.data.job_test);
      setQuestions(data.data.job_test.questions);
      setTestId(data.data.job_test.id);
      setPassingPercentage(data.data.job.passing_percentage);
      const duration = parseInt(data.data.job_test.time_limit);
      setTestDuration(duration);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching test details:', error);
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    if (!hasFetched.current) {
      getTestDetails();
      hasFetched.current = true;
    }
  }, [getTestDetails, jobId]);

  const [showModal1, setShowModal1] = useState(false);

  const handleEndTestConfirmation = async () => {
    console.log('attemptin g to end te thst');
    setTestComplete(true); // Only complete the test after confirmation
    await submitTest();
    // Redirect after completion
  };

  const handleNextQuestion = () => {
    setQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedQuestionIds((prevSelectedQuestionIds) => [
      ...prevSelectedQuestionIds,
      currentQuestion.id,
    ]);
    setSelectedOption(null);
    if (selectedOption) {
      setSelectedAnswers((prevSelectedAnswers) => [
        ...prevSelectedAnswers,
        selectedOption,
      ]);
    }
    setSelectedOption(null);
  };

  const handleSubmit = () => {
    if (questionIndex < questions.length) {
      setQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedQuestionIds((prevSelectedQuestionIds) => [
        ...prevSelectedQuestionIds,
        currentQuestion.id,
      ]);
      setSelectedOption(null);
      if (selectedOption) {
        setSelectedAnswers((prevSelectedAnswers) => [
          ...prevSelectedAnswers,
          selectedOption,
        ]);
      }
      setSelectedOption(null);
    }
    setTestComplete(true);
  };
  // 'need the test to be sumitted once the tab is refreshed or closed'

  const submitTest = useCallback(async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('selectedAnswers', selectedAnswers);
      formData.append('selectedQuestionIds', selectedQuestionIds);
      formData.append('timeTaken', timeTaken);
      formData.append('studentId', studentId);
      formData.append('schoolId', schoolId);
      formData.append('testId', testId);
      formData.append('passingPercentage', passingPercentage);

      formData.append('classId', classId);
      formData.append('jobId', jobId);
      formData.append('token', token);
      const response = await storeJobResponseWithToken(formData);
      setLoading(false);
      setResult(response.test_result);
      console.log('Response submitted successfully!', response);
    } catch (error) {
      console.error('Error submitting response:', error);
    }
  }, [selectedAnswers, selectedQuestionIds, timeTaken, studentId, jobId]);

  useEffect(() => {
    const handleBeforeUnload = async (event) => {
      if (!testComplete) {
        event.preventDefault(); // Prevent the default behavior
        event.returnValue = ''; // Some browsers require a return value to show the message

        // Set test as complete and submit
        setTestComplete(true);
        await submitTest();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [testComplete, submitTest]);

  useEffect(() => {
    if (testComplete) {
      submitTest();
    }
  }, [testComplete, submitTest]);

  // Timer Functions
  const updateElapsedTime = (elapsedTime) => {
    setTimeTaken(elapsedTime);
  };
  const handleShowModal = () => {
    // setSelectedJob(job);
    setShowModal1(true);
  };
  const handleTimerCompletion = () => {
    endTest();
  };

  const endTest = () => {
    setTestComplete(true);
  };

  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    function exitHandler(e) {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
        return;
      }
      setIsFullScreen(true);
    }

    document.addEventListener('fullscreenchange', exitHandler);
    document.addEventListener('webkitfullscreenchange', exitHandler);
    document.addEventListener('mozfullscreenchange', exitHandler);
    document.addEventListener('MSFullscreenChange', exitHandler);

    return () => {
      document.removeEventListener('fullscreenchange', exitHandler);
      document.removeEventListener('webkitfullscreenchange', exitHandler);
      document.removeEventListener('mozfullscreenchange', exitHandler);
      document.removeEventListener('MSFullscreenChange', exitHandler);
    };
  }, [isFullScreen]);
  const handleCloseModal = () => {
    setShowModal1(!showModal1);
  };
  const handleAnotherAction = () => {
    alert('Another action button pressed');
    // Your logic for another action
    setShowModal1(false);
  };
  return (
    <>
      {/* <ContentHeader
        title="Test"
        hasBackButton={false}
        className="mt-4"
        style={{ margin: '10px' }}
      /> */}
      {testDetails ? (
        <>
          {!testComplete ? (
            <>
              {!loading ? (
                <>
                  <div className="row" style={{ margin: '20px' }}>
                    <div className="col-6">
                      <h6 className="font-lg text-grey-800 fw-700 lh-32 mt-3 ">
                        Job Test
                      </h6>
                      <h3 className="font-lg text-grey-800 fw-700 lh-32 mt-3 ">
                        {testDetails?.title}
                      </h3>
                      <p className="font-xsss text-grey-800 fw-500  mt-2 ">
                        {testDetails?.description}
                      </p>
                    </div>
                    <div className="col-6">
                      {/* full screen toggle starts */}
                      <div className="flex items-center mb-4 gap-2 ">
                        <button
                          className="preferenceBtn group"
                          onClick={handleFullScreen}
                        >
                          <div className="h-4 w-4 text-dark-gray-6 font-bold text-lg">
                            {!isFullScreen ? (
                              <AiOutlineFullscreen />
                            ) : (
                              <AiOutlineFullscreenExit />
                            )}
                          </div>
                          <div className="preferenceBtn-tooltip">
                            Full Screen
                          </div>
                        </button>
                      </div>

                      {/* full screen toggle ends */}
                      {questions && !testComplete && testDuration && (
                        <Timer
                          initialDuration={testDuration}
                          onComplete={handleTimerCompletion}
                          onUpdate={updateElapsedTime}
                        />
                      )}
                    </div>
                  </div>
                  <div
                    className="d-flex flex-column question_wrapper"
                    style={{ margin: '20px' }}
                  >
                    <QuestionCard
                      index={questionIndex}
                      question={currentQuestion}
                      selectedOption={selectedOption}
                      setSelectedOption={setSelectedOption}
                      setSelectedAnswers={setSelectedAnswers}
                    />
                    <div>
                      {questionIndex === questions?.length - 1 ? (
                        <button
                          type="submit"
                          onClick={handleSubmit}
                          className="p-2 mt-3 d-inline-block float-right text-white fw-700 lh-30 rounded-lg w200 text-center font-xsssss ls-3 bg-current border-0 ls-3"
                        >
                          SUBMIT
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleNextQuestion}
                          className="next-bttn p-2 mt-3 d-inline-block float-right text-white fw-700 lh-30 rounded-lg w200 text-center font-xsssss ls-3 bg-current border-0 ls-3"
                        >
                          NEXT
                        </button>
                      )}
                      {/* <ModalConfirmation /> */}
                      {/* <button
                        type="button"
                        onClick={() => setShowModal1(true)}
                        className="next-bttn p-2 mt-3 d-inline-block text-white fw-700 lh-30 rounded-lg w200 text-center btn-danger font-xsssss ls-3 bg-red-gradiant border-0 ls-3"
                      >
                        End Test
                      </button> */}
                      {/* <Link
                        to="#"
                        onClick={() => handleShowModal()}
                        className="next-bttn p-2 mt-3 d-inline-block text-white fw-700 lh-30 rounded-lg w200 text-center btn-danger font-xsssss ls-3 bg-red-gradiant border-0 ls-3"
                      >
                        End Test
                      </Link> */}
                    </div>
                  </div>
                </>
              ) : (
                <ContentLoader />
              )}
              <ContentDisplayModal
                show={showModal1}
                handleClose={handleCloseModal}
                title="Job Details"
                content={
                  <>
                    {' '}
                    <div className="row">
                      <div className="col-12">
                        <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
                          {/* <div className="modal-body">
                                <p className="modal-text">
                                  Are you sure you want to end the test?
                                </p>
                              </div> */}
                          {/* <div className="modal-footer"> */}
                          <button
                            onClick={handleEndTestConfirmation}
                            className="btn btn-danger"
                          >
                            Yes, end test
                          </button>
                          <button
                            onClick={() => setShowModal1(false)}
                            className="btn btn-success"
                          >
                            No, continue test
                          </button>
                          <button
                            onClick={handleAnotherAction}
                            className="btn mt-4 bg-current text-center text-white font-xsss fw-600 p-2 w175 rounded-lg d-inline-block border-0 ls-3 text-uppercase"
                          >
                            Another action
                          </button>
                          {/* </div> */}
                        </div>
                      </div>
                    </div>
                  </>
                }
              />
            </>
          ) : (
            <ScoreCard result={result} submitting={loading} is_job={true}/>
          )}
        </>
      ) : (
        <ContentFallback message="Test Completed Successfully!" />
      )}
    </>
  );
}

export default JobTest;
