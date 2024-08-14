import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

import {
  fetchForumQuestionDetails,
  storeForumAnswer,
  voteForumAnswer,
} from '@/api/student';

import DefaultProfileImage from '@/assets/images/default/student.png';

import {
  ContentLoader,
  ContentHeader,
  ContentCardWrapper,
  ContentFallback,
} from '@/components/common';
import { getStudentDataFromLocalStorage } from '@/utils/services';
import { formatDateTime } from '@/utils/helpers';
import { AnswerForm } from '@/components/student/forum';

function Show() {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const studentData = JSON.parse(getStudentDataFromLocalStorage());

  const studentId = studentData.student_auth_id;
  const schoolId = studentData.school_id;

  const { forumId } = useParams();

  const [forum, setForum] = useState({
    question: '',
    answers: {},
  });
  const [answer, setAnswer] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMyAnswer, setHasMyAnswer] = useState();

  const fetchForum = useCallback(async () => {
    fetchForumQuestionDetails(forumId)
      .then((data) => {
        if (data) {
          setForum(data.forum);
          console.warn(data.forum);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
        toast.error(error.message);
      });
  }, [forumId]);

  useEffect(() => {
    fetchForum();
  }, [fetchForum]);

  useEffect(() => {
    const hasAnswer =
      Array.isArray(forum.answers) &&
      forum.answers.some((answer) => answer.student_id === studentId);
    setHasMyAnswer(hasAnswer);
  }, [forum.answers, studentId]);

  const handleInputChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('forumId', forumId);
      formData.append('schoolId', schoolId);
      formData.append('studentId', studentId);
      formData.append('answer', answer);

      const response = await storeForumAnswer(formData);
      toast.success(response.message);
      fetchForum();
    } catch (error) {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      }
      toast.error(error.message);
    } finally {
      setAnswer('');
    }
  };

  const handleVote = async (answerIndex, answerId, voteType) => {
    console.log(answerId, voteType);
    try {
      const formData = new FormData();
      formData.append('answerId', answerId);
      formData.append('studentId', studentId);
      formData.append('voteType', voteType);
      const response = await voteForumAnswer(formData);
      console.log(response);

      // Clone the forum object
      const updatedForum = { ...forum };
      updatedForum.answers[answerIndex].vote_count = response.data.forumAnswer.vote_count;

      // Get the current vote type for the specific answer
      const currentVoteType =
        updatedForum.answers && updatedForum.answers[answerIndex]
          ? updatedForum.answers[answerIndex].vote_type
          : 0;

      // Update vote_count and vote_type for the specific answer
      if (updatedForum.answers && updatedForum.answers[answerIndex]) {
        if (currentVoteType === voteType) {
          updatedForum.answers[answerIndex].vote_type = 0;
        } else {
          updatedForum.answers[answerIndex].vote_type = voteType;
        }
      }
      setForum(updatedForum);
      // Update the UI as needed (e.g., change button appearance)
    } catch (error) {
      toast.error('Failed to vote');
    }
  };

  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <ContentHeader title={`Forum`} />
      <ContentCardWrapper>
        {forum && !loading ? (
          <>
            <div className="row">
              <div className="col-12">
                <div className="card p-3 d-block border-0 d-block">
                  <figure className="avatar mb-0 float-left mr-2 overflow-hidden">
                    <img
                      src={
                        forum.question?.profile_image
                          ? baseUrl + forum.question?.profile_image
                          : DefaultProfileImage
                      }
                      alt="avatar"
                      className="w60 mr-1"
                    />
                  </figure>
                  <h5 className="font-lg fw-600 text-grey-800 mb-1">
                    {forum && forum.question?.question}
                  </h5>
                  <h4 className="font-xsss fw-600 text-grey-600 d-inline-block ml-0">
                    {formatDateTime(forum.question?.created_at)}
                  </h4>
                  <span className="dot ml-2 mr-2 d-inline-block btn-round-xss bg-grey"></span>
                  <span className="font-xsss fw-600 text-grey-600 d-inline-block ml-1">
                    Posted by{' '}
                    {forum.question?.student_id === studentId
                      ? ' you'
                      : forum.question?.student_name}
                  </span>
                </div>
              </div>
            </div>
            <h3 className="mt-3 fw-600 text-grey-500">Responses:</h3>
            <div className="row mt-3">
              {forum.answers && forum.answers.length > 0 ? (
                forum.answers?.map((answer, index) => (
                  <div
                    className="col-xl-12 col-lg-12 col-sm-12"
                    key={answer.id}
                  >
                    <div className="card w-100 p-3 text-left border-0 shadow-sm rounded-lg mb-1">
                      <div className="card-header bg-transparent border-0 d-flex justify-content-between">
                        <div className="w-50">
                          <img
                            src={
                              answer?.profile_image
                                ? baseUrl + answer?.profile_image
                                : DefaultProfileImage
                            }
                            alt="student"
                            className="w40 float-left mr-3"
                            style={{ borderRadius: '50%' }}
                          />
                          <h4 className="text-grey-900 fw-700 font-xsss mt-0 pt-1">
                            {answer?.student_name}
                          </h4>
                          <h5 className="font-xssss fw-500 mb-1 text-grey-600">
                            {formatDateTime(answer.created_at)}
                          </h5>
                        </div>
                        <div className="bg-grey px-2 rounded-pill d-flex">
                          <button
                            className={`btn-round-sm border-0 d-inline-block mt-1 mx-1 ${
                              answer.vote_type == 1
                                ? 'text-white bg-success'
                                : 'text-success'
                            }`}
                            onClick={() => handleVote(index, answer.id, 1)}
                            disabled={answer.student_id == studentId}
                          >
                            <i className="feather-thumbs-up font-xs"></i>
                          </button>
                          <p className="font-xsss fw-500 text-grey-900 lh-28 mt-1">
                            {answer.vote_count}
                          </p>
                          <button
                            className={`btn-round-sm border-0 d-inline-block my-1 mx-1 ${
                              answer.vote_type == -1
                                ? 'text-white bg-danger'
                                : 'text-danger'
                            }`}
                            onClick={() => handleVote(index, answer.id, -1)}
                            disabled={answer.student_id == studentId}
                          >
                            <i className="feather-thumbs-down font-xs"></i>
                          </button>
                        </div>
                      </div>
                      <div className="card-body pl-0 pt-0">
                        <p className="font-xsss fw-500 text-grey-900 lh-28 mt-0 mb-0 ">
                          {answer.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  {forum.question?.student_id === studentId ? (
                    <ContentFallback
                      message="No responses yet. Please come again later."
                      hasMargin={false}
                    />
                  ) : (
                    <ContentFallback
                      message="Please write your response."
                      hasMargin={false}
                    />
                  )}
                </>
              )}
            </div>
          </>
        ) : (
          <ContentLoader />
        )}
      </ContentCardWrapper>
      {forum.question?.student_id !== studentId && !hasMyAnswer && (
        <AnswerForm
          answer={answer}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          validationErrors={validationErrors}
        />
      )}
    </div>
  );
}

export default Show;
