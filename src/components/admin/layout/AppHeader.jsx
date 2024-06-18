import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import DarkButton from '@/components/common/DarkButton';
import DefaultProfileImage from '@/assets/images/default/user.png';

import 'react-toastify/dist/ReactToastify.css';
function AppHeader({ toggleNav }) {
  return (
    <div className="middle-sidebar-header bg-white">
      <button onClick={toggleNav} className="header-menu"></button>
      <ul className="d-flex ml-auto right-menu-icon">
        <DarkButton />
        <li>
          <Link to="forum">
            <i className="feather-message-square font-xl text-current"></i>
          </Link>
        </li>
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
