import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';

const index = ({ items }) => {
  return (
    <Dropdown className="position-absolute right-0 mr-3 top-0 mt-3">
      <Dropdown.Toggle as="a" className="text-grey-500 font-xs">
        <i className="ti-more"></i>
      </Dropdown.Toggle>
      <Dropdown.Menu className='py-0 shadow-md' style={{minWidth:"7rem"}}>
        {items.map((item, index) => (
          <Dropdown.Item
            as={Link}
            key={index}
            to={item.href}
            className='border-bottom font-xsss fw-500 px-3'
          >
            {item.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default index