import React from 'react';
import PropTypes from 'prop-types';

import DefaultStudentImage from '@/assets/images/default/student.png';
import DefaultTrainerImage from '@/assets/images/default/user.png';

import { formatTimestamp } from '@/utils/helpers';

import { ContentLoader } from '@/components/common';
import { Link } from 'react-router-dom';

function ChatInterface({
  users,
  messages,
  loading,
  trainerName,
  trainerId,
  selectedStudent,
  showInput,
}) {
  return (
    <>
      <div
        className="chat-wrapper pt-0 w-100 position-relative scroll-bar bg-white theme-dark-bg trainer-chat"
        style={{ marginBottom: '90px', height: 'calc(100vh - 240px)' }}
      >
        <div className="chat-body p-3">
          <div className="messages-content pb-5" style={{ height: 660 }}>
            {selectedStudent?.id ? (
              <>
                {!loading ? (
                  <>
                    {messages && messages.length > 0 && users ? (
                      messages.map((message, index) => {
                        const user = users.find(
                          (user) => user.auth_id === message.receiver_id
                        );
                        const isOutgoing = message.sender_id === trainerId;
                        return (
                          <div
                            className={`message-item ${
                              isOutgoing ? 'outgoing-message' : ''
                            }`}
                            key={index}
                          >
                            <div className="message-user">
                              <figure className="avatar overflow-hidden">
                                <img
                                  src={
                                    isOutgoing
                                      ? DefaultTrainerImage
                                      : user?.profile_image
                                      ? `assets/images/${user.profile_image}`
                                      : DefaultStudentImage
                                  }
                                  alt="Avatar"
                                />
                              </figure>
                              <div>
                                <h5>
                                  {isOutgoing
                                    ? trainerName
                                    : selectedStudent?.name}
                                </h5>
                                <div className="time">
                                  {formatTimestamp(message.updated_at)}
                                </div>
                              </div>
                            </div>
                            <div className="message-wrap">
                              {message.response}
                              <br />
                            </div>
                            {isOutgoing ? (
                              <Link
                                target="_blank"
                                to={``}
                                className="text-primary font-xssss fw-700"
                              >
                                Video url
                              </Link>
                            ) : (
                              ''
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div className="h-100 w-100 d-flex align-items-center justify-content-center">
                        <h4 className="font-xsss text-dark d-block text-center">
                          {selectedStudent?.name
                            ? selectedStudent?.name
                            : 'Student'}{' '}
                          had never asked any questions!
                        </h4>
                      </div>
                    )}
                    <div className="clearfix"></div>{' '}
                    {messages && messages.length > 0 && users && !showInput && (
                      <div
                        className="chat-bottom dark-bg p-3 shadow-none"
                        style={{ width: '98%' }}
                      >
                        <div className="h-100 w-100 d-flex align-items-center justify-content-center">
                          <h4 className="font-xsss text-dark d-block text-center">
                            You are all caught up, there are no questions to
                            answer!
                          </h4>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="h-100 w-100 d-flex align-items-center justify-content-center">
                    <ContentLoader />
                  </div>
                )}
              </>
            ) : (
              <div className="h-100 w-100 d-flex align-items-center justify-content-center">
                Select a student to view their questions.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

ChatInterface.propTypes = {
  users: PropTypes.array,
  messages: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  showInput: PropTypes.bool.isRequired,
  trainerName: PropTypes.string,
  trainerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selectedStudent: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
};

ChatInterface.defaultProps = {
  trainerName: '',
};

export default ChatInterface;
