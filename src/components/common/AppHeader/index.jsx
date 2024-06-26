import React, { Component, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import DarkButton from '@/components/common/DarkButton';
import DefaultProfileImage from '@/assets/images/default/user.png';

function AppHeader({ toggleNav }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdownMenu = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div className="middle-sidebar-header bg-white">
      <button onClick={toggleNav} className="header-menu"></button>
      {/* <div className=" d-inline-block float-left mb-0 text-grey-900"> */}
      <div className=" d-inline-block float-left mb-0 text-grey-900">
        <h1
          style={{ letterSpacing: '2px', fontSize: '25px', fontWeight: '700' , userSelect: 'none' }}
        >
          &nbsp;ATOMS&nbsp;
        </h1>
      </div>
{/* atoms header */}
      <ul className="d-flex ml-auto right-menu-icon">
        <DarkButton />
        {/* <li>
          <Link to={'#'}>
            <i className="feather-message-square font-xl text-current"></i>
          </Link>
        </li> */}
        <li>
          <Link to={'#'}>
            <img
              src={DefaultProfileImage}
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
