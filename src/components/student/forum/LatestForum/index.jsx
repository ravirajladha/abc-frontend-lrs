import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { fetchForum } from '@/api/student';
import { formatDateTime, formatSentence } from '@/utils/helpers';

import DefaultProfileImage from '@/assets/images/default/student.png';
import { ContentLoader } from '@/components/common';

function LatestForum() {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [forumData, setForumData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetchForum(null);
      setForumData(response.forum);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="card mt-lg-4 mb-2 d-block w-100 border-0 shadow-xss rounded-lg overflow-hidden p-4">
      <div className="card-body mb-2 pb-0">
        <h2 className="fw-500 font-md d-block">
          Latest <b>Forums</b>
        </h2>
      </div>
      <div className="card-body pb-0">
        <div className="row">
          {!loading ? (
            forumData &&
            forumData.length > 0 &&
            forumData.map((item) => (
              <Link
                to={`/student/forum/${item.question_id}`}
                key={item.question_id}
                className="col-xl-4 col-lg-6 col-md-6 col-sm-6 mb-4"
              >
                <div className="card w-100 p-0 shadow-xss border-0 rounded-lg overflow-hidden mr-1">
                  <div className="card-body pt-0">
                    <h4 className="fw-700 font-xss mt-3 lh-28 mt-0">
                      <Link
                        to={`/student/forum/${item.question_id}`}
                        className="text-dark text-grey-900"
                      >
                        {formatSentence(item.question, 12)}
                      </Link>
                    </h4>
                    <h6 className="font-xssss text-grey-500 fw-600 ml-0 mt-2">
                      {formatDateTime(item.created_at)}
                    </h6>
                    <ul className="memberlist mt-3 mb-2 ml-0 d-block">
                      <li>
                        <a href="#">
                          <img
                            src={
                              item.profile_image
                                ? baseUrl + item.profile_image
                                : DefaultProfileImage
                            }
                            alt="user"
                            className="w30 d-inline-block"
                          />
                        </a>
                      </li>
                      <li className="pl-4 w-auto">
                        <a href="#" className="fw-500 text-grey-500 font-xssss">
                          {item.student_name}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <ContentLoader />
          )}
        </div>
      </div>
    </div>
  );
}

export default LatestForum;
