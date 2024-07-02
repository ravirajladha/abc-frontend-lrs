import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { formatDate, formatSentence } from '@/utils/helpers';
import { ContentLoader } from '@/components/common';

function Forum({forumData, forumloading}) {

  return (
    <div className="card theme-light-bg overflow-hidden rounded-xxl border-0 mb-3">
      <div className="card-body d-flex justify-content-between align-items-end pl-4 pr-4 pt-4 pb-3">
        <h4 className="fw-700 font-xss">My Forum</h4>
        <Link to="/student/forum" className="position-absolute right-0 mr-4">
          <i className="ti-arrow-circle-right text-grey-500 font-xs"></i>
        </Link>
      </div>
      <div className="row pl-4 pr-2 pt-0 pb-3 border-0 w-100 d-block">
        {forumloading ? (
          <span>
            <ContentLoader />
          </span>
        ) : (
          <>
            {forumData && forumData.length > 0 ? (
              forumData.map((item, index) => (
                <Link
                  to={`/student/forum/${item.question_id}`}
                  className="col-12 mb-4 d-block"
                  key={index}
                >
                  {/* <span className="bg-current btn-round-xs rounded-lg font-xssss text-white fw-600">
                    {item.answers_count}
                  </span> */}
                  <span className="font-xssss fw-500 text-grey-500 ml-2">
                    {formatSentence(item.question, 8)}
                  </span>
                  <br />
                  <span className="ml-auto float-right font-xssss fw-500 text-grey-500">
                    {formatDate(item.created_at)}
                  </span>
                </Link>
              ))
            ) : (
              <div className="text-center">
                <span className="font-xssss text-center fw-500 text-grey-500 ml-2">
                  No forums / Reload to update once posted.
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Forum;
