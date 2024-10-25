import { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import DarkButton from '@/components/common/DarkButton';
import DefaultProfileImage from '@/assets/images/default/user.png';
import { HeaderSearchBar, Notification } from '@/components/common';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import LogOutButton from '@/components/common/LogoutButton';

function AppHeader({ toggleNav }) {

  return (
    <div className="middle-sidebar-header bg-white"  style={{ background: "linear-gradient(90deg, #ffa629 0%, #ff9500 100%)"}}>
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
      <HeaderSearchBar/>
      <ul className="d-flex ml-auto right-menu-icon">
        <DarkButton />
        <Notification/>
        <li>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Settings</Tooltip>}
          >
            <Link to="/trainer/settings">
              <i className="feather-settings font-xl text-white"></i>
            </Link>
          </OverlayTrigger>
        </li>
        <li>
           <Link to={'profile'}>
            <img
              src={DefaultProfileImage}
              alt="user"
              className="w40 mt--1 rounded-circle bg-white"
            />
          </Link>
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
