import React, { useCallback, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { QnaSearchResults } from '@/components/student/learn';
import { ContentLoader } from '@/components/common';

import DefaultStudentImage from '@/assets/images/default/student.png';
import DefaultTeacherImage from '@/assets/images/default/teacher.png';

import { formatTimestamp } from '@/utils/helpers';
import { fetchQnA, storeQnA, searchQuestion } from '@/api/student';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function QnaTab({
  subjectId,
  studentId,
  teacherId,
  isTeacherAvailable,
  isTabActive,
}) {
  const [loading, setLoading] = useState(true);

  const [chat, setChat] = useState([]);
  const [qnaSearchResult, setQnaSearchResult] = useState([]);
  const [selectedQnaId, setSelectedQnaId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);

  const [formData, setFormData] = useState({
    question: '',
    student_id: studentId,
    teacher_id: teacherId,
    subject_id: subjectId,
  });

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  const shouldShowInput = () => {
    const mergedMessages = chat.merged_messages;

    if (mergedMessages && Object.keys(mergedMessages).length > 0) {
      const lastMessage = Object.values(mergedMessages).pop();
      return lastMessage && lastMessage.sender_id !== studentId;
    }
    return true;
  };

  async function searchLive(question) {
    setFormData({ ...formData, question: question });
    if (question.trim() === '') {
      console.log(qnaSearchResult);
      setQnaSearchResult([]);
    } else {
      console.log(qnaSearchResult);
      try {
        const response = await searchQuestion(question);
        if (response?.questions) {
          setQnaSearchResult(response.questions);
        } else {
          setQnaSearchResult([]);
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  }

  function handleResultClick(selectedValue, selectedId) {
    setFormData({ ...formData, question: selectedValue });
    setSelectedQnaId(selectedId);
    setQnaSearchResult([]);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const updatedFormData = {
        ...formData,
        teacher_id: teacherId,
        qna_id: selectedQnaId,
      };
      console.log(updatedFormData);
      const response = await storeQnA(updatedFormData);
      getMessages();
      setIsSubmitting(false);
      // setChat((prevChat) => ({
      //   ...prevChat,
      //   merged_messages: {
      //     ...prevChat.merged_messages,
      //     [response.message.id]: response.message,
      //   },
      // }));
    } catch (error) {
      console.error(error.message);
      setIsSubmitting(false);
    }
    setFormData({ ...formData, question: '' });
  };

  const getMessages = useCallback(async () => {
    if (isTabActive && studentId && teacherId && subjectId) {
      try {
        const response = await fetchQnA(studentId, teacherId, subjectId);
        setChat(response);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setLoading(false);
      }
    }
    if (!teacherId) {
      setLoading(false);
    }
  }, [isTabActive, studentId, teacherId, subjectId]);

  useEffect(() => {
    getMessages();
  }, [getMessages, isTabActive]);

  return (
    <>
      <div
        className="messages-content chat-wrapper student-chat scroll-bar p-3"
        style={{ height: 365, overflowY: 'auto' }}
        ref={chatContainerRef}
      >
        {loading && <ContentLoader className="my-5" />}
        {chat && chat.merged_messages ? (
          Object.values(chat.merged_messages).map((message, index) => (
            <div
              className={`message-item ${
                message.sender_id === studentId ? 'outgoing-message' : ''
              }`}
              key={index}
            >
              <div className="message-user">
                <figure className="avatar overflow-hidden">
                  <img
                    src={
                      message.sender_id === studentId
                        ? DefaultStudentImage
                        : DefaultTeacherImage
                    }
                    alt="avatar"
                    style={{ height: 'auto' }}
                  />
                </figure>
                <div>
                  <h5>{message.sender_id === studentId ? 'You' : 'Teacher'}</h5>
                  <div className="time">
                    {message.created_at && formatTimestamp(message.created_at)}
                    {message.sender_id === studentId && (
                      <i className="ti-double-check text-info"></i>
                    )}
                  </div>
                </div>
              </div>
              <div
                className={`message-wrap ${
                  message.sender_id !== studentId ? 'shadow-none' : ''
                }`}
              >
                {message.response}
              </div>
              {message.sender_id !== studentId ? (
                <Link
                  target="_blank"
                  to={`/student/courses/1/learn`}
                  className="text-primary font-xssss fw-700"
                >
                  Video url
                </Link>
              ) : (
                ''
              )}
            </div>
          ))
        ) : (
          <div className="message-item"></div>
        )}
        {isTeacherAvailable && (
          <>
            {shouldShowInput() ? (
              <>
                <form
                  className="chat-form position-absolute bottom-0 w-100 left-0 bg-white z-index-1 p-3 shadow-xs theme-dark-bg  d-flex align-items-center"
                  onSubmit={handleSubmit}
                  autoComplete="off"
                >
                  <div className="form-group">
                    <input
                      type="text"
                      name="question"
                      className="text-grey-500 py-1"
                      style={{ color: '#000' }}
                      value={formData.question}
                      ref={inputRef}
                      placeholder={formData.question ? '' : 'Start typing..'}
                      onChange={(e) => searchLive(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className={`bg-current ${isSubmitting ? 'disabled' : ''}`}
                  >
                    {isSubmitting ? (
                      <Spinner
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="mr-2"
                      />
                    ) : (
                      <i className="ti-arrow-right text-white"></i>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center position-absolute bottom-0 w-100 left-0 bg-white z-index-1 p-3 shadow-xs theme-dark-bg">
                <span>Waiting for response...</span>
              </div>
            )}
          </>
        )}
        {!isTeacherAvailable && (
          <>
            <span className="text-center w-100 font-xss text-warning p-3">
              Chat Unavailable <br /> No Trainer Assigned
            </span>
          </>
        )}
      </div>

      <div style={{ width: '100%' }}>
        {qnaSearchResult && qnaSearchResult.length > 0 && (
          <>
            {/* {qnaSearchResult.map((qna) => (
              <div key={qna.id}>{qna.id}</div>
            ))} */}
            <QnaSearchResults
              results={qnaSearchResult}
              onResultClick={handleResultClick}
            />
          </>
        )}
      </div>
    </>
  );
}

QnaTab.propTypes = {
  subjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  studentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  teacherId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isTeacherAvailable: PropTypes.bool,
  isTabActive: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};

export default QnaTab;
