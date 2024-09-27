import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Accordion } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import { ContentLoader } from '@/components/common';
import { getElabSubmissionByStudent, getResource } from '@/api/student';
import { getUserDataFromLocalStorage } from '@/utils/services';

const LearnTab = ({
  isLoading,
  courseData,
  activeVideoId,
  handleVideoClick,
}) => {
  console.log('subjectdata', courseData);
  const [elabSubmissionIds, setElabSubmissionIds] = useState({});
  const userDetail = JSON.parse(getUserDataFromLocalStorage());
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleDownload = async () => {
    try {
      const response = await fetch(`${baseUrl}api/download-zip`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resources.zip'; // The name of the file to be downloaded
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        console.error('Failed to download file');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    const fetchElabSubmissions = async () => {
      if (userDetail && userDetail.id) {
        const elabSubmissionIdsObj = {};
        for (const chapter of courseData) {
          for (const video of chapter.videos) {
            if (video.elab_id) {
              try {
                // console.log("details of param", userDetail.id, video.elab_id);
                const response = await getElabSubmissionByStudent(
                  userDetail.id,
                  video.elab_id
                );
                console.log('latest respoinse', response);
                elabSubmissionIdsObj[video.elab_id] = response;
              } catch (error) {
                console.error(
                  // `Error fetching eLab submission for elabId ${video.elab_id}:`,
                  `Error fetching eLab submission for elabId`
                );
              }
            }
          }
        }
        setElabSubmissionIds(elabSubmissionIdsObj);
      }
    };

    fetchElabSubmissions();
  }, [userDetail.userId, courseData]); // Include dependencies in useEffect
  console.log('inside externsalstudenlearn tab', courseData);
  let isPreviousChapterCompleted = true;
  return (
    <div className="video-playlist h-100" style={{ height: 400 }}>
      {isLoading ? (
        <ContentLoader className="my-5" />
      ) : (
        <div className="videos scroll-bar">
          <Accordion
            defaultActiveKey={0}
            // alwaysOpen
            className="accordion accordion-course"
          >
            {!courseData || courseData.length === 0 ? (
              <div className="text-center mt-5 col-12 h100">
                No content available.
              </div>
            ) : (
              courseData.map((chapter, index) => {
                
                const chapterVideos = chapter.videos;
                const hasVideos = chapterVideos && chapterVideos.length > 0;

                const isCompleted = chapter.progress_status == 2;
                const isProgress = chapter.progress_status == 1;
                const completedBufferTime = chapter.completedBufferTime;

                const shouldLockChapter =   (!isPreviousChapterCompleted);
                
                if (isCompleted && completedBufferTime) {
                  isPreviousChapterCompleted = true;
                } else {
                  isPreviousChapterCompleted = false;
                }

                return hasVideos ? (
                  <Accordion.Item
                    eventKey={index}
                    className="accordion-item border-0 mb-0 shadow-xss rounded-sm bg-white"
                    key={index}
                  >
                    <Accordion.Header>
                      {chapter.title}
                      {shouldLockChapter && (
                        <a className="btn btn-sm bg-danger text-white">
                          <i className="feather-lock"></i>
                        </a>
                      )}
                      {isCompleted && (
                        <a className="btn btn-sm bg-success text-white">
                          <i className="feather-check-circle"></i>
                        </a>
                      )}
                    </Accordion.Header>
                    {!shouldLockChapter && (
                      <Accordion.Body style={{ padding: 0 }}>
                        {chapterVideos.map((video, videoIndex) => {
                          const hasAssessment = video.assessment_id !== null;
                          const hasEBook = video.ebook_id !== null;
                          const hasElab = video.elab_id !== null;
                          //check for the elab is active or not here
                          const isActive = video.id === activeVideoId;
                          const elabSubmissionId =
                            elabSubmissionIds[video.elab_id] || null;

                          const isAssessmentPassed =
                            video.assessment_results.some(
                              (result) => result.is_passed === 1
                            );

                          return (
                            <div
                              className={`card-body d-flex p-1 video ${
                                isActive ? 'active' : ''
                              }`}
                              data-id={video.id}
                              key={videoIndex}
                              // onClick={() => console.log(video.url)}
                              onClick={() =>
                                handleVideoClick(
                                  video.id,
                                  video.url,
                                  video.title,
                                  chapter.title,
                                  video.description,
                                  video.assessment_results,
                                  video.watch_time
                                )
                              }
                            >
                              <i className="feather-play-circle mx-3 font-lg"></i>
                              <div
                                className="d-flex flex-column"
                                style={{ width: '100%' }}
                              >
                                <div>
                                  <span className="font-xsss fw-500 text-dark-500 ml-2">
                                    {video.title}
                                  </span>
                                  {video.video_complete_status == 1 ? (
                                    <i className="feather-check-circle text-success font-xssss float-right"></i>
                                  ) : (
                                    ''
                                  )}
                                </div>

                                <div className="d-flex">
                                  {hasAssessment && (
                                    <div
                                      className={`border-0 rounded-sm mx-1 lh-24 px-3 ${
                                        isAssessmentPassed
                                          ? 'bg-success'
                                          : 'bg-current'
                                      }`}
                                    >
                                      <Link
                                        className="font-xsssss fw-600 text-uppercase text-white"
                                        to={`${video.id}/assessment/${video.assessment_id}`}
                                        style={{
                                          pointerEvents: isAssessmentPassed
                                            ? 'none'
                                            : 'auto',
                                        }}
                                      >
                                        {isAssessmentPassed && (
                                          <i className="feather-check-circle text-white">
                                            {' '}
                                          </i>
                                        )}
                                        Assessment
                                      </Link>
                                    </div>
                                  )}

                                  {hasEBook && (
                                    <div className="border-0 rounded-sm mx-1 lh-24  px-3 bg-current">
                                      <Link
                                        className="font-xsssss fw-600 text-uppercase text-white"
                                        to={`/ebooks/${video.ebook_id}/preview/${video.ebook_module_id}/${video.ebook_sections}`}
                                      >
                                        eBook
                                      </Link>
                                    </div>
                                  )}
                                  {hasElab &&
                                  video.elab_status !== 0 &&
                                  !elabSubmissionId ? (
                                    <div className="border-0 rounded-sm mx-1 lh-24  px-3 bg-current">
                                      <Link
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-xsssss fw-600 text-uppercase text-white"
                                        to={`/student/elab/show/1/${video.course_id}/${video.elab_id}`}
                                      >
                                        eLab
                                      </Link>
                                    </div>
                                  ) : null}
                                  {hasElab &&
                                  video.elab_status !== 0 &&
                                  elabSubmissionId ? (
                                    <div className="border-0 rounded-sm mx-1 lh-24  px-3 bg-current">
                                      <Link
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-xsssss fw-600 text-uppercase text-white"
                                        to={`/student/elab/check-code/1/${video.course_id}/${video.elab_id}/${elabSubmissionId}`}
                                      >
                                        eLab <i className="feather-eye"></i>
                                      </Link>
                                    </div>
                                  ) : null}
                                  <div className="border-0 rounded-sm mx-1 lh-24  px-2 bg-current">
                                    <Link
                                      className="font-xsssss fw-600 text-uppercase text-white"
                                      // to={`${baseUrl}uploads/zip/resources.zip`}
                                      onClick={handleDownload}
                                    >
                                      <i className="feather-file"></i>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </Accordion.Body>
                    )}
                  </Accordion.Item>
                ) : null;
              })
            )}
          </Accordion>
        </div>
      )}
    </div>
  );
};

LearnTab.propTypes = {
  isLoading: PropTypes.bool,
  courseData: PropTypes.array,
  activeVideoId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleVideoClick: PropTypes.func,
};

export default LearnTab;
