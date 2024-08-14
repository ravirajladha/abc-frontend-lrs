import React from 'react';
import PropsTypes from 'prop-types';

import {
  getStudentDataFromLocalStorage,
  getUserDataFromLocalStorage,
} from '@/utils/services';

import { USER_TYPES } from '@/utils/constants';

function Highlight({ showBackgroundImage = false }) {
  const userData = JSON.parse(getUserDataFromLocalStorage());
  const studentData = JSON.parse(getStudentDataFromLocalStorage());
console.log("userData: " + userData.name);
  console.log("studentData: " + studentData);

  const backgroundImageStyle = showBackgroundImage
    ? {
        backgroundImage: `url(/assets/images/placeholder-background.jpg)`,
        backgroundBlendMode: 'difference',
        backgroundSize: 'cover',
        backgroundPosition: '50% 39%',
      }
    : {};

  return (
    <div className="row">
      <div className="col-lg-12">
        <div
          className="card w-100 bg-lightblue shadow-xs p-lg-5 p-4 border-0 rounded-lg d-block float-left"
          style={backgroundImageStyle}
        >
          <h1 className="display1-size display2-md-size d-inline-block float-left mb-0 text-grey-900 fw-700">
            <span
              className="font-xssss fw-600 text-grey-600 d-block mb-2"
              style={{ fontSize: '20px' }}
            >
              Welcome,
            </span>
            {' '}
            {userData['username']}
            {/* {USER_TYPES.STUDENT == userData?.type
              ? `${studentData['student_name']}`
              : `${userData['username']}`} */}
            <span
              className="font-xsss fw-600 text-grey-700 d-block mt-2"
              style={{ fontSize: '20px' }}
            ></span>
          </h1>
        </div>
      </div>
    </div>
  );
}

Highlight.propTypes = {
  showBackgroundImage: PropsTypes.bool,
};

export default Highlight;
