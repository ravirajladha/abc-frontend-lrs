import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.css';

function NavTab({ internshipId }) {
  return (
    <>
      <ul className="mb-3 nav nav-tabs user-profile xs-p-4 d-flex align-items-center justify-content-between product-info-tab border-bottom-0 bg-white shadow-xss rounded-lg w-100">
        <li className="nav-item">
          <NavLink
        
            to={`/admin/internship-admin/${internshipId}/internshipAdmin`}
            aria-selected="true"
            className="nav-link"
          >
            Profile
          </NavLink>
        </li>
        {/* <li className="nav-item">
          <NavLink
            to={`/admin/internship-admin/${internshipId}/trainers`}
            className="nav-link"
          >
            Trainers
          </NavLink>
        </li> */}
        <li className="nav-item">
          <NavLink
            to={`/admin/internship-admin/${internshipId}/students`}
            className="nav-link "
          >
            Students
          </NavLink>
        </li>
        {/* <li className="nav-item">
          <NavLink
            to={`/admin/internshipId-admin/${internshipId}/applications`}
            className="nav-link"
          >
            Applications
          </NavLink>
        </li> */}
      </ul>
    </>
  );
}

NavTab.propTypes = {
  schoolId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default NavTab;
