import { useState, useEffect, useCallback } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai';

import {
  Timer,
  QuestionCard,
  ScoreCard,
} from '@/components/student/assessment';

import { ContentHeader, ContentLoader } from '@/components/common';
import { fetchAssessmentDetails, storeAssessmentResponse } from '@/api/student';

function AssessmentTest() {
  const { courseId, videoId, assessmentId } = useParams();
  const studentData = useOutletContext();
  const studentId = studentData.student_auth_id;


  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [result, setResult] = useState([]);
  const [testDuration, setTestDuration] = useState(null);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);
  const [timeTaken, setTimeTaken] = useState(0);
  const [assessmentDetails, setAssessmentDetails] = useState({});
  const [isFullScreen, setIsFullScreen] = useState(false);

  let currentQuestion;

  if (questions) {
    currentQuestion = questions[questionIndex];
  }

  const [testComplete, setTestComplete] = useState(false);

  const getAssessmentDetails = useCallback(async () => {
    try {
      const data = await fetchAssessmentDetails(assessmentId);
      setAssessmentDetails(data.assessment);
      setQuestions(data.assessment.questions);
      setTestDuration(data.assessment.time_limit);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching assessment details:', error);
    }
  }, [assessmentId]);

  useEffect(() => {
    getAssessmentDetails();
  }, [getAssessmentDetails, courseId, videoId, assessmentId]);

  //Handle Back Button Click
  useEffect(() => {
    const handleBackButtonClick = (event) => {
      event.preventDefault();
      console.log('back button clicked');
      if (!testComplete) {
        handleSubmit();
      }
    };

    window.addEventListener('popstate', handleBackButtonClick);

    return () => {
      window.removeEventListener('popstate', handleBackButtonClick);
    };
  }, [testComplete]);

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

  const submitAssessment = useCallback(async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('selectedAnswers', selectedAnswers);
      formData.append('selectedQuestionIds', selectedQuestionIds);
      formData.append('timeTaken', timeTaken);
      formData.append('studentId', studentId);
    
      formData.append('videoId', videoId);
      formData.append('courseId', courseId);
      formData.append('assessmentId', assessmentId);

      const response = await storeAssessmentResponse(formData);
      setLoading(false);
      setResult(response.assessment_result);
      console.log('Response submitted successfully!', response);
    } catch (error) {
      console.error('Error submitting response:', error);
    }
  }, [
    selectedAnswers,
    selectedQuestionIds,
    timeTaken,
    studentId,
    videoId,
    courseId,
    assessmentId,
  ]);

  useEffect(() => {
    if (testComplete) {
      submitAssessment();
    }
  }, [testComplete, submitAssessment]);

  const retakeAssessment = () => {
    setLoading(true);
    setResult([]);
    setQuestionIndex(0);
    setSelectedOption(null);
    setSelectedAnswers([]);
    setSelectedQuestionIds([]);
    setTimeTaken(0);
    setTestComplete(false);
    setLoading(false);
  };

  // Timer Functions

  const handleTestDuration = () => {
    setTestComplete(true);
  };

  const updateElapsedTime = (elapsedTime) => {
    setTimeTaken(elapsedTime);
  };

  const endTest = () => {
    handleSubmit();
  };


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

  return (
    <>
      <ContentHeader title="Assessment Test" hasBackButton={false} />
      {!testComplete ? (
        <>
          {!loading ? (
            <>
              <div className="row">
                <div className="col-8">
                  <h3 className="font-lg text-grey-800 fw-700">
                    {assessmentDetails?.title}
                  </h3>
                  <p className="font-xsss text-grey-800 fw-500  mt-2 ">
                    {assessmentDetails?.description}
                  </p>
                </div>
                <div className="col-4">
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
                  {questions && !testComplete && testDuration && (
                    <Timer
                      initialDuration={testDuration} //change to testDuration variable for dynamic
                      onComplete={endTest}
                      onUpdate={updateElapsedTime}
                    />
                  )}
                </div>
              </div>
              <div className="d-flex flex-column question_wrapper">
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
                      className="next-bttn p-2 mt-3 d-inline-block text-white fw-700 lh-30 rounded-lg w200 text-center font-xsssss ls-3 bg-current border-0 ls-3"
                    >
                      NEXT
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <ContentLoader />
          )}
        </>
      ) : (
        <ScoreCard
          result={result}
          submitting={loading}
          retakeAction={retakeAssessment}
          courseId={courseId}
        />
      )}
    </>
  );
}

export default AssessmentTest;
