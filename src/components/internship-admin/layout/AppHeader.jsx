import { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import DarkButton from '@/components/common/DarkButton';
import Notification from '@/components/common/Notification';
import DefaultProfileImage from '@/assets/images/default/user.png';
import LogoutButton from '@/components/common/LogoutButton';

function AppHeader({ toggleNav }) {

  return (
    <div className="middle-sidebar-header" style={{ background: "linear-gradient(90deg, #ffa629 0%, #ff9500 100%)"}}>

      <button onClick={toggleNav} className="header-menu"></button>
      <ul className="d-flex ml-auto right-menu-icon">
        <DarkButton />
        <Notification/>
        <li>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Settings</Tooltip>}
          >
            <Link to="/internship-admin/settings">
              <i className="feather-settings font-xl text-white"></i>
            </Link>
          </OverlayTrigger>
        </li>

        <li>

        <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Profile</Tooltip>}
          >
           <Link to={'#'}>
            <img
              src={DefaultProfileImage}
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
              <LogoutButton />
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
