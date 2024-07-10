import { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import DarkButton from '@/components/common/DarkButton';
import DefaultProfileImage from '@/assets/images/default/student.png';
import { getStudentDataFromLocalStorage } from '@/utils/services';

function AppHeader({ toggleNav }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const studentData = JSON.parse(getStudentDataFromLocalStorage());

  return (
    <div className="middle-sidebar-header bg-white"  >
  {/* <div className="middle-sidebar-header bg-white" style={{ borderBottom: '2px solid #0f36c0' }}>  */}
      <button onClick={toggleNav} className="header-menu"></button>
      <div className=" d-inline-block float-left mb-0 text-grey-900">
        <h1
          style={{ letterSpacing: '2px', fontSize: '25px', fontWeight: '700', userSelect: 'none' }}
        >
          &nbsp;ATOMS&nbsp;
        </h1>
      </div>
{/* atoms header */}

      <ul className="d-flex ml-auto right-menu-icon">
        <DarkButton />
        <li>
          <Link to="profile">
            <img
              src={
                studentData['profile_image']
                  ? baseUrl + studentData['profile_image']
                  : DefaultProfileImage
              }
              alt="user"
              className="w40 mt--1 rounded-circle bg-white"
            />
          </Link>
        </li>
        <li>
          <span className="menu-search-icon"></span>
        </li>
      </ul>
    </div>
  );
}
AppHeader.propTypes = {
  toggleNav: PropTypes.func.isRequired,
};

export default AppHeader;
