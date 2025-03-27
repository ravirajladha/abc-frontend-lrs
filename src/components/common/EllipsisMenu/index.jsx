import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';

const EllipsisMenu = ({ items }) => {
  return (
    <Dropdown className="position-absolute right-0 mr-3 top-0 mt-3">
      <Dropdown.Toggle as="a" className="text-grey-500 font-xs">
        <i className="ti-more"></i>
      </Dropdown.Toggle>
      <Dropdown.Menu className="py-0 shadow-md" style={{ minWidth: '7rem' }}>
        {items.map((item, index) => (
          <Dropdown.Item
            as={item.href ? Link : 'button'}  // Conditionally render as link or button
            key={index}
            to={item.href ? item.href : undefined}  // Only use 'to' when href exists
            className="border-bottom font-xsss fw-500 px-3"
            onClick={item.onClick ? item.onClick : null}  // Attach onClick for actions
          >
            {item.label} <i className={`feather-${item?.icon} text-grey-500 font-xsss`}></i>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default EllipsisMenu;
