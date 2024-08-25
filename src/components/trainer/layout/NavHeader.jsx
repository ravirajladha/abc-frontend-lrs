import React, { useCallback, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import LogoutButton from '@/components/common/LogoutButton';
import { TRAINER_ROUTES } from '@/utils/constants';

import Logo from '@/assets/images/logo-transparent.png';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { fetchUnrepliedQnACount } from '@/api/trainer';

function NavHeader({ isOpen, toggleNav }) {
  const [isFull, setIsFull] = useState(false);
  const [qnaCount, setQnaCount] = useState(0);

  const toggleNavWidth = () => {
    mainContent.classList.toggle('menu-active');
    setIsFull(!isFull);
  };

  const toggleNavClass = `${isFull ? 'menu-active' : ''}`;

  const getUnrepliedQnACount = useCallback(async () => {
    try {
      const response = await fetchUnrepliedQnACount();
      setQnaCount(response.qnaCount);
    } catch (error) {
      console.error('Error fetching qna Count:', error.message);
    }
  }, []);
  useEffect(() => {
    getUnrepliedQnACount();
  }, [getUnrepliedQnACount]);
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
            {TRAINER_ROUTES.map((route, index) => (
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
                      {route.path === '/trainer/qna' ? (
                      <span className="position-absolute top-0 right-0 badge bg-white text-dark rounded-pill p-1 font-xssss" style={{lineHeight:'15px'}}>
                        {qnaCount ? qnaCount : 0}
                      </span>
                    ) : null}
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
                    {route.path === '/trainer/qna' ? (
                      <span className="badge bg-white text-dark rounded-pill px-2" style={{lineHeight:'20px'}}>
                        {qnaCount ? qnaCount : 0}
                      </span>
                    ) : null}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
          <div className="nav-caption fw-600 font-xssss text-grey-500"></div>
          <ul>
            <li className="logo d-none d-xl-block d-lg-block"></li>
            <li>
            <OverlayTrigger
                delay={{ hide: 450, show: 300 }}
                overlay={(props) =>
                  isFull ? (
                    <Tooltip {...props}>Expand the sidebar</Tooltip>
                  ) : (
                    <span />
                  )
                }
                placement="right"
              >
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
              </OverlayTrigger>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

NavHeader.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleNav: PropTypes.bool.isRequired,
};

export default NavHeader;
