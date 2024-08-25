import React from 'react';
import PropTypes from 'prop-types';
import DefaultStudentImage from '@/assets/images/default/student.png';

function ChatUserList({ imageUrl, name, studentClass, status, onClick }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  return (
    <li
      className="bg-transparent list-group-item border-0 no-icon pl-0 cursor-pointer"
      onClick={onClick}
    >
      <figure className="avatar float-left mb-0 mr-3 overflow-hidden">
        <img
          src={
            imageUrl
              ? `${baseUrl}${imageUrl}`
              : DefaultStudentImage
          }
          alt="Avatar"
          className="w45 rounded-circle"
        />
      </figure>
      <h3 className="fw-700 mb-0 mt-1">
        <span className="font-xsss text-grey-900 text-dark d-block">
          {name}
        </span>
        <span className="font-xssss text-grey-500 text-dark d-block">
          {studentClass}
        </span>
      </h3>
      <span
        className={`${
          status ? ' bg-success' : 'bg-grey'
        } circle-icon ms-auto btn-round-xss badge d-block p-0`}
      ></span>
    </li>
  );
}

ChatUserList.propTypes = {
  imageUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
  studentClass: PropTypes.string.isRequired,
  status: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

ChatUserList.defaultProps = {
  status: '',
};

export default ChatUserList;