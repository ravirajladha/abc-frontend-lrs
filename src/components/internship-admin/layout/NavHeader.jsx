import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import LogoutButton from '@/components/common/LogoutButton';
import { INTERNSHIP_ADMIN_ROUTES } from '@/utils/constants';

import Logo from '@/assets/images/logo-transparent.png';

function NavHeader({ isOpen, toggleNav }) {
  const [isFull, setIsFull] = useState(false);

  const toggleNavWidth = () => {
    mainContent.classList.toggle('menu-active');
    setIsFull(!isFull);
  };

  const toggleNavClass = `${isFull ? 'menu-active' : ''}`;
  return (
    <nav
      className={`navigation scroll-bar  ${toggleNavClass} ${
        isOpen ? 'nav-active' : ''
      }`}
    >
      <div className="container pl-0 pr-0">
        <div className="nav-content">
          <div className="nav-top">
            <Link to="/" className="justify-content-center pl-0">
              <img src={Logo} alt="Logo" className="" width={65} />
            </Link>
            <span
              onClick={toggleNav}
              className="close-nav d-inline-block d-lg-none"
            >
              <i className="ti-close bg-grey mb-4 btn-round-sm font-xssss fw-700  ml-auto mr-2 "></i>
            </span>
          </div>
          <div className="nav-caption fw-600 font-xssss text-grey-500">
            {/* <span>Navigate </span>Feeds */}
          </div>
          <ul className="mb-3">
            <li className="logo d-none d-xl-block d-lg-block"></li>
            {INTERNSHIP_ADMIN_ROUTES.map((route, index) => (
              <li key={index}>
                <NavLink
                  to={route.path}
                  className="nav-content-bttn open-font"
                  data-tab="chats"
                >
                  <i className={`${route.icon} mr-3`}></i>
                  <span>{route.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="nav-caption fw-600 font-xssss text-grey-500">
            <span></span> Account
          </div>
          <ul className="mb-3">
            <li className="logo d-none d-xl-block d-lg-block"></li>
            <li>
              <Link
                to="/school/settings"
                className="nav-content-bttn open-font h-auto pt-2 pb-2"
              >
                <i className="font-sm feather-settings mr-3 text-dark"></i>
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <LogoutButton />
            </li>
          </ul>
          <div className="nav-caption fw-600 font-xssss text-grey-500"></div>
          <ul>
            <li className="logo d-none d-xl-block d-lg-block"></li>
            <li>
              <Link
                to="#"
                onClick={toggleNavWidth}
                className="nav-content-bttn open-font h-auto pt-2 pb-2"
              >
                <i
                  className={`font-sm ${
                    isFull ? 'feather-chevron-right' : 'feather-chevron-left'
                  }  mr-3 text-dark`}
                ></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

NavHeader.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleNav: PropTypes.func.isRequired,
};

export default NavHeader;
