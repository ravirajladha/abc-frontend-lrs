import { Link } from 'react-router-dom';

import React from 'react';

const index = () => {
  return (
    <li>
      <Link to="#">
        <span className="dot-count bg-warning"></span>
        <i className="feather-bell font-xl text-white"></i>
        <div className="menu-dropdown">
          <h4 className="fw-700 font-xs mb-4">Notifications</h4>
          <div className="card bg-transparent-card w-100 border-0 mb-3">
            <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
              Student 1
              <span className="text-grey-400 font-xsssss fw-600 float-right mt-1">
                3 min
              </span>
            </h5>
            <h6 className="text-grey-500 fw-500 font-xssss lh-4">
              Student Registerd..
            </h6>
          </div>
          <div className="card bg-transparent-card w-100 border-0 mb-3">
            <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
              Student 2
              <span className="text-grey-400 font-xsssss fw-600 float-right mt-1">
                2 min
              </span>
            </h5>
            <h6 className="text-grey-500 fw-500 font-xssss lh-4">
              Payment Successful..
            </h6>
          </div>

          <div className="card bg-transparent-card w-100 border-0 mb-3">
            <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
              Student 3
              <span className="text-grey-400 font-xsssss fw-600 float-right mt-1">
                1 min
              </span>
            </h5>
            <h6 className="text-grey-500 fw-500 font-xssss lh-4">
              Job Applied..
            </h6>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default index;
