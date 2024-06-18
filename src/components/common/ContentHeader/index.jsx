import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import BackButton from '@/components/common/BackButton';

function ContentHeader({
  title,
  subtitle,
  buttons,
  backLink,
  hasMargin = true,
  hasBackButton = true,
}) {
  return (
    <div className={`row ${hasMargin ? 'mb-4' : ''}`}>
      <div className="col-lg-12 d-flex align-items-center justify-content-between">
        <h2 className="text-grey-900 font-md mb-0">
          <span className="fw-600">{title}</span> {subtitle}
        </h2>
        <div className="d-flex align-items-center">
          {buttons &&
            buttons.map((button, index) => (
              <Link
                key={index}
                to={button.link}
                className={`btn ml-auto float-right border-0 d-flex fw-600 text-uppercase py-2 px-3 rounded-lg text-center font-xsss shadow-xs mr-2 ${
                  button.className ?? 'text-white bg-primary-gradiant'
                }`}
                target={button.target ? '_blank' : undefined}
              >
                <span
                  className={`${
                    button.iconClassName ??
                    'feather-plus font-xsss mr-1 fw-bolder'
                  }`}
                  style={{ marginTop: '2.5px' }}
                ></span>
                {button.text}
              </Link>
            ))}
          {hasBackButton && <BackButton className="mx-2" link={backLink} />}
        </div>
      </div>
    </div>
  );
}

ContentHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  hasMargin: PropTypes.bool,
  hasBackButton: PropTypes.bool,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      className: PropTypes.string,
      iconClassName: PropTypes.string,
      target: PropTypes.string,
    })
  ),
  backLink: PropTypes.string,
};

export default ContentHeader;
