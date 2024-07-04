import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ADMIN_ROUTES } from '@/utils/constants';
import LogoutButton from '@/components/common/LogoutButton';

import Logo from '@/assets/images/logo-transparent.png';
import { Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { AiFillAccountBook } from 'react-icons/ai';

function NavHeader({ isOpen, toggleNav }) {
  const [isFull, setIsFull] = useState(false);
  const [openGroups, setOpenGroups] = useState({});

  const toggleNavWidth = () => {
    mainContent.classList.toggle('menu-active');
    setIsFull(!isFull);
  };
  const toggleGroup = (group) => {
    setOpenGroups((prevState) => ({
      ...prevState,
      [group]: !prevState[group],
    }));
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
            {/* <span>Navigate </span> */}
          </div>
          <ul className="mb-3">
            <li className="logo d-none d-xl-block d-lg-block"></li>
            {/* {ADMIN_ROUTES.map((route, index) => (
              <li key={index}>
                {route.title && isFull ? (
                  <OverlayTrigger
                    delay={{ hide: 300, show: 250 }}
                    overlay={(props) => (
                      <Tooltip {...props}>{route.title}</Tooltip>
                    )}
                    placement="right"
                  >
                    <NavLink
                      to={route.path}
                      className="nav-content-bttn open-font"
                      data-tab="chats"
                    >
                      <i className={`${route.icon} mr-3`}></i>
                      <span>{route.title}</span>
                    </NavLink>
                  </OverlayTrigger>
                ) : (
                  <NavLink
                    to={route.path}
                    className="nav-content-bttn open-font"
                    data-tab="chats"
                  >
                    <i className={`${route.icon} mr-3`}></i>
                    <span>{route.title}</span>
                  </NavLink>
                )}
              </li>
            ))} */}
            {Object.keys(ADMIN_ROUTES).map((group, index) => (
              <div className={`mx-3`} key={index}>
                <div
                  onClick={() => toggleGroup(group)}
                  className={`py-3 px-2 d-flex justify-content-between open-font font-xss fw-600 shadow-sm border-bottom rounded ${
                    openGroups[group] ? 'border-warning' : ''
                  }`}
                >
                  <div className="d-flex">
                    {React.createElement(ADMIN_ROUTES[group].icon, {
                      className: 'mr-3 font-md',
                    })}
                    <span
                      className="ml-3"
                      style={{ display: isFull ? 'none' : 'inline' }}
                    >
                      {ADMIN_ROUTES[group].title}
                    </span>
                  </div>
                  <i
                    className={`feather-chevron-${
                      openGroups[group] ? 'up' : 'down'
                    } float-right`}
                  ></i>
                </div>
                {openGroups[group] && (
                  <ul className="">
                    {ADMIN_ROUTES[group].routes.map((route, routeIndex) => (
                      <li key={routeIndex} className="mx-0">
                        {route.title && isFull ? (
                          <OverlayTrigger
                            delay={{ hide: 300, show: 250 }}
                            overlay={(props) => (
                              <Tooltip {...props}>{route.title}</Tooltip>
                            )}
                            placement="right"
                          >
                            <NavLink
                              to={route.path}
                              className="nav-content-bttn open-font"
                              data-tab="chats"
                            >
                              <i className={`${route.icon} mr-3`}></i>
                              <span>{route.title}</span>
                            </NavLink>
                          </OverlayTrigger>
                        ) : (
                          <NavLink
                            to={route.path}
                            className="nav-content-bttn open-font"
                            data-tab="chats"
                          >
                            <i className={`${route.icon} mr-3`}></i>
                            <span>{route.title}</span>
                          </NavLink>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </ul>
          <div className="nav-caption fw-600 font-xssss text-grey-500">
            <span></span> Account
          </div>
          <ul className="mb-3">
            <li className="logo d-none d-xl-block d-lg-block"></li>
            <li>
              <Link
                to="/admin/settings"
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
