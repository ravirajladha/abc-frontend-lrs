import { useState, useEffect, Suspense, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';
import {
  LearnTab,
  QnaTab,
  NoteTab,
  ExternalStudentLearnTab,
  LearnInfoTab,
} from '@/components/student/learn';

import PropTypes from 'prop-types';
import { useOutletContext } from 'react-router';
import {
  getUserDataFromLocalStorage,
  getStudentDataFromLocalStorage,
} from '@/utils/services';
import { MdLiveTv } from 'react-icons/md';
import { trackLiveSessionClick } from '@/api/student';

const VideoTabs = ({
  isLoading,
  courseId,
  courseData,
  studentId,
  isTrainerAvailable,
  trainerId,
  videoPlayer,
  activeVideoId,
  handleVideoClick,
  liveSessions,
}) => {
  const studentData = useOutletContext();
  const [activeTab, setActiveTab] = useState('learn');
  const isTabActive = (tabKey) => {
    return activeTab === tabKey;
  };
  const userData = JSON.parse(getUserDataFromLocalStorage());
  const studentDataLocal = JSON.parse(getStudentDataFromLocalStorage());
  const [showModal, setShowModal] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  // console.log("payment details", studentDataLocal.is_paid);
  // console.log("payment", isPaid);
  useEffect(() => {
    const isPaidStatus =
      localStorage.getItem('is_paid') === 'true' || studentDataLocal.is_paid;
    setIsPaid(isPaidStatus);
    setShowModal(!isPaidStatus);
  }, [studentDataLocal.is_paid]);

  const handlePaymentComplete = () => {
    setIsPaid(true);
    setShowModal(false);
    localStorage.setItem('is_paid', 'true'); // Ensure this is updated in local storage
  };
  const handleUrlClick = async (item) => {
    const respsonse = await trackLiveSessionClick(item.id);
    window.open(item.url, '_blank');
  };
  return (
    <>
      <div className="card w-100 d-block chat-body p-0 border-0 shadow-xss rounded-3 mb-3 h500 position-relative">
        <Tabs
          defaultActiveKey="learn"
          id="uncontrolled-tab-example"
          onSelect={(key) => setActiveTab(key)}
          className="list-inline-center d-flex text-center border-0 custom-tabs"
        >
          <Tab eventKey="learn" title="COURSE" className="list-inline-item">
            {/* {studentData.student_type === 0 ? (
              <LearnTab
                isLoading={isLoading}
                courseData={courseData}
                activeVideoId={activeVideoId}
                handleVideoClick={handleVideoClick}
              />
            ) : ( */}
            <ExternalStudentLearnTab
              isLoading={isLoading}
              courseData={courseData}
              activeVideoId={activeVideoId}
              handleVideoClick={handleVideoClick}
            />
            {/* )} */}
          </Tab>
          <Tab eventKey="chat" title="Q&A" className="list-inline-item">
            <QnaTab
              studentId={studentId}
              courseId={courseId}
              trainerId={trainerId}
              isTrainerAvailable={isTrainerAvailable}
              isTabActive={isTabActive}
            />
          </Tab>
          <Tab eventKey="notes" title="NOTES" className="list-inline-item">
            <NoteTab
              studentId={studentId}
              videoPlayer={videoPlayer}
              activeVideoId={activeVideoId}
              isTabActive={isTabActive}
            />
          </Tab>
          {studentData.student_type === 0 ? (
            ''
          ) : (
            <Tab
              eventKey="info"
              title={
                <span>
                  <i className="feather-info"></i> Info
                </span>
              }
              className="list-inline-item"
            >
              <LearnInfoTab />
            </Tab>
          )}
        </Tabs>
      </div>
      <div className="font-xs mb-2 text-center rounded-lg bg-white p-3 text-dark fw-400 border border-size-md">
        {liveSessions && liveSessions.length > 0
          ? liveSessions.map((item, index) => (
              <Link key={index}  className='d-flex py-2 border-bottom'
              onClick={() => handleUrlClick(item)}>
                <MdLiveTv
                  className="text-danger"
                />{' '}
                <p className="font-xsss fw-500 ml-2">{item.session_type == 1 ? "Q&A Session": "Live Session"} start at - {item.time.slice(0, 5)}</p>
              </Link>
            ))
          : 'No Live Classes'}
      </div>
    </>
  );
};

VideoTabs.propTypes = {
  isLoading: PropTypes.bool,
  courseData: PropTypes.array,
  courseId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  studentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isTrainerAvailable: PropTypes.bool,
  trainerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  videoPlayer: PropTypes.object,
  activeVideoId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleVideoClick: PropTypes.func,
};

export default VideoTabs;
