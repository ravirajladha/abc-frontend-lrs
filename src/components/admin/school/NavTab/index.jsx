import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.css';

function NavTab({ schoolId }) {
  return (
    <>
      <ul className="mb-3 nav nav-tabs user-profile xs-p-4 d-flex align-items-center justify-content-between product-info-tab border-bottom-0 bg-white shadow-xss rounded-lg w-100">
        <li className="nav-item">
          <NavLink
        
            to={`/admin/schools/${schoolId}/school`}
            aria-selected="true"
            className="nav-link"
          >
            School
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={`/admin/schools/${schoolId}/teachers`}
            className="nav-link"
          >
            Teachers
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={`/admin/schools/${schoolId}/students`}
            className="nav-link "
          >
            Students
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={`/admin/schools/${schoolId}/applications`}
            className="nav-link"
          >
            Applications
          </NavLink>
        </li>
      </ul>
    </>
  );
}

NavTab.propTypes = {
  schoolId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default NavTab;
