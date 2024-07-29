import { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import DarkButton from '@/components/common/DarkButton';
import DefaultProfileImage from '@/assets/images/default/student.png';
import { getStudentDataFromLocalStorage } from '@/utils/services';
import { HeaderSearchBar, NotificationStudent } from '@/components/common';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import LogOutButton from '@/components/common/LogoutButton';

function AppHeader({ toggleNav }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const studentData = JSON.parse(getStudentDataFromLocalStorage());

  return (
    <div className="middle-sidebar-header"  
    style={{ background: "linear-gradient(90deg, #ffa629 0%, #ff9500 100%)"}}
    >
      <button onClick={toggleNav} className="header-menu"></button>
      <div className=" d-inline-block float-left mb-0 text-grey-900">
        <h1
          style={{
            letterSpacing: '2px',
            fontSize: '25px',
            fontWeight: '700',
            userSelect: 'none',
          }}
        >
          &nbsp;ATOMS&nbsp;
        </h1>
      </div>
      <HeaderSearchBar />
      {/* atoms header */}
      <ul className="d-flex ml-auto right-menu-icon">
        <DarkButton />
        <NotificationStudent />
        <li>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Settings</Tooltip>}
          >
            <Link to="/student/settings">
              <i className="feather-settings font-xl text-white"></i>
            </Link>
          </OverlayTrigger>
        </li>
        <li>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Profile</Tooltip>}
          >
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
          </OverlayTrigger>
        </li>
        <li>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Logout</Tooltip>}
          >
            <span>
              <LogOutButton />
            </span>
          </OverlayTrigger>
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
