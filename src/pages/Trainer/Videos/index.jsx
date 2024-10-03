import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { ContentHeader, ContentLoader } from '@/components/common';

import { fetchVideoDetails } from '@/api/admin';
import { formatDateTime } from '@/utils/helpers';

function Show() {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const { courseId, subjectId, chapterId, contentId } = useParams();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [video, setVideo] = useState(null);

  const getContentDetails = useCallback(() => {
    return fetchVideoDetails(contentId)
      .then((data) => {
        setVideo(data.video);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [contentId]);

  useEffect(() => {
    getContentDetails();
  }, [getContentDetails]);

  return (
    <div>
      <ContentHeader
        title="Content"
        // buttons={[
        //   {
        //     iconClassName: 'feather-edit mr-2',
        //     link: 'edit',
        //     text: 'Edit',
        //   },
        // ]}
      />
      <>
        {isLoading ? (
          <ContentLoader />
        ) : (
          <>
            {video && (
              <div className="row">
                <div className="col-12">
                  <h2 className="fw-700 font-md d-block lh-4 mb-2">
                    {video?.title}
                  </h2>
                </div>
                <div className="col-xl-8 col-xxl-9">
                  <div className="card border-0 mb-0 rounded-lg overflow-hidden">
                    <div className="react-player">
                      <video
                        src={baseUrl + 'uploads/' + video?.url}
                        preload="auto"
                        // autoPlay
                        controls
                        style={{ width: '100%', height: 'auto' }}
                      ></video>
                    </div>
                  </div>
                  <p className="font-xsss fw-600 text-grey-500 d-inline-block mt-3">
                    <span className="font-xsss fw-500 text-grey-600 d-inline-block ml-0 text-dark">
                      Posted on {formatDateTime(video?.updated_at)}{' '}
                    </span>
                  </p>
                </div>
                <div className="col-xl-4 col-xxl-3">
                  <div className="card mb-lg-3 mb-sm-2 d-block border-0 rounded-lg overflow-hidden p-4 shadow-md">
                    <h2 className="fw-600 font-sm mb-3 mt-1 pl-1 mb-3">
                      Description
                    </h2>
                    <p className="font-xssss fw-500 lh-28 text-grey-600 mb-0 pl-2">
                      {video?.description}
                    </p>
                  </div>
                  <div className="card mb-lg-3 mb-sm-2 d-block border-0 rounded-lg overflow-hidden p-4 shadow-md">
                    <h2 className="fw-600 font-sm mb-3 mt-1 pl-1 mb-3">
                      Assessment: {video?.assessment_title}{' '}
                      {video?.assessment_id && (
                        <Link
                          to={`/trainer/assessments/${video.assessment_id}`}
                          className=" btn-icon btn-sm mr-2"
                        >
                          <i className="feather-eye"></i>
                        </Link>
                      )}
                    </h2>
                    {video?.assessment_id === null && (
                      <span className="badge badge-pill badge-danger px-3 py-2">
                        NO
                      </span>
                    )}
                  </div>
                  <div className="card mb-lg-3 mb-sm-2 d-block border-0 rounded-lg overflow-hidden p-4 shadow-md">
                    <h2 className="fw-600 font-sm mb-3 mt-1 pl-1 mb-3">
                      eLab: {video?.elab_title}{' '}
                      {/* <Link
                        to={`/ebooks/${video.elab_id}/preview`}
                        className=" btn-icon btn-sm mr-2"
                      >
                        <i className="feather-eye"></i>
                      </Link> */}
                    </h2>
                    {video?.elab_id === null && (
                      <span className="badge badge-pill badge-danger px-3 py-2">
                        NO
                      </span>
                    )}
                  </div>
                  <div className="card mb-lg-3 mb-sm-2 d-block border-0 rounded-lg overflow-hidden p-4 shadow-md">
                    <h2 className="fw-600 font-sm mb-3 mt-1 pl-1 mb-3">
                      eBook: {video?.ebook_title}
                      {video?.ebook_sections && (
                        <Link
                          to={`/ebooks/${video.ebook_id}/preview`}
                          className=" btn-icon btn-sm mr-2"
                        >
                          <i className="feather-eye"></i>
                        </Link>
                      )}
                    </h2>
                    {video?.ebook_sections === null && (
                      <span className="badge badge-pill badge-danger px-3 py-2">
                        NO
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </>
    </div>
  );
}

export default Show;
