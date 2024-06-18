import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Card(props) {
  return (
    <div
      className={props.threeColumn ? 'col-xl-4 col-lg-6' : 'col-xl-3 col-lg-12'}
    >
      <div className="card w-100 p-1 border-0 mt-4 rounded-lg bg-white shadow-xs overflow-hidden">
        <div className="card-body p-4">
          <div className="row">
            <div className="col-8">
              <h2 className="text-grey-900 fw-700 font-xl mt-2 mb-2 ls-3 lh-1">
                {props?.itemValue ? props?.itemValue : '0'}
              </h2>
              <h4 className="fw-700 text-grey-500 font-xsss ls-3 text-uppercase mb-0 mt-0">
                {props?.itemName}
              </h4>
            </div>
            <div className="col-4 d-flex justify-content-end">
              <Link to={props?.itemLink ? props?.itemLink : '#'}>
                <i
                  className={`psor text-white btn-round-md font-xs feather-${props?.itemIcon} bg-primary-gradiant`}
                ></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  threeColumn: PropTypes.bool,
  itemValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  itemName: PropTypes.string.isRequired,
  itemLink: PropTypes.string,
  itemIcon: PropTypes.string.isRequired,
};

export default Card;
