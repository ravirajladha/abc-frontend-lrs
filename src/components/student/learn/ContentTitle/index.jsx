import React from 'react';

function ContentTitle({ title, trainer, chapter }) {
  return (
    <div className="card d-block border-0 rounded-lg overflow-hidden dark-bg-transparent bg-transparent mt-4 pb-3">
      <div className="row">
        <div className="col-10">
          <h2 className="fw-700 font-lg d-block lh-4 mb-2 text-capitalize">{title}</h2>
        </div>
      </div>

      <span className="font-xss fw-700 text-grey-900 d-inline-block ml-0 text-dark">
        {chapter}
      </span>
      <span className="dot ml-2 mr-2 d-inline-block btn-round-xss bg-grey"></span>
      <span className="font-xss fw-600 text-grey-500 d-inline-block ml-1">
      {trainer}
      </span>
    </div>
  );
}

export default ContentTitle;
