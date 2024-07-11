import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Accordion } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import { ContentLoader } from '@/components/common';
import { getUserDataFromLocalStorage } from '@/utils/services';

const ChapterAccordion = ({ isLoading, chapterData }) => {
  console.log('chapterData', chapterData);
  const userDetail = JSON.parse(getUserDataFromLocalStorage());

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
            {!chapterData || chapterData.length === 0 ? (
              <div className="text-center mt-5 col-12 h100">
                No content available.
              </div>
            ) : (
              chapterData.map((chapter, index) => {
                const chapterVideos = chapter.videos;
                const hasVideos = chapterVideos && chapterVideos.length > 0;
                return hasVideos ? (
                  <Accordion.Item
                    eventKey={index}
                    className="accordion-item border-0 mb-0 shadow-xss rounded-sm bg-white"
                    key={index}
                  >
                    <Accordion.Header>{chapter.title}</Accordion.Header>
                    <Accordion.Body style={{ padding: 0 }}>
                      {chapterVideos.map((video, videoIndex) => {
                        return (
                          <div
                            className={`card-body d-flex p-1 video`}
                            data-id={video.id}
                            key={videoIndex}
                          >
                            <span className="bg-current btn-round-xs rounded-lg font-xssss text-white fw-600">
                              {videoIndex + 1}
                            </span>
                            <div
                              className="d-flex flex-column"
                              style={{ width: '100%' }}
                            >
                              <div>
                                <span className="font-xsss fw-500 text-dark-500 ml-2">
                                  {video.title}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </Accordion.Body>
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

ChapterAccordion.propTypes = {
  isLoading: PropTypes.bool,
  chapterData: PropTypes.array,
};

export default ChapterAccordion;
