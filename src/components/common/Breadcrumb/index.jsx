import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items, className }) => (
  <nav aria-label="breadcrumb">
    <ol className={`breadcrumb ${className}`}>
      {items.map((item, index) => (
        <li key={`breadcrumb-${index}`} className="breadcrumb-item">
          {item.href ? (
            <Link to={item.href} className="breadcrumb-link">
              {item.name}
            </Link>
          ) : (
            <span className="breadcrumb-placeholder">{item.name}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

Breadcrumb.defaultProps = {
  items: [],
  className: '',
};

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string,
    })
  ).isRequired,
  className: PropTypes.string,
};

export default Breadcrumb;
