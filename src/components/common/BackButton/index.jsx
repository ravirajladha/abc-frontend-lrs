import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

function BackButton({ link }) {
  const navigate = useNavigate();

  const goBack = () => {
    if (link) {
      navigate(link);
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <OverlayTrigger
        delay={{ hide: 350, show: 200 }}
        overlay={(props) => <Tooltip {...props}>Go Back</Tooltip>}
        placement="bottom"
      >
        <button
          className="btn float-right text-uppercase py-2 px-3 d-inline-block rounded-lg text-center font-xssss shadow-xs btn-outline-warning btn-icon text-active-white me-2 back-button"
          onClick={goBack}
        >
          <i className="feather-arrow-left font-xsss"></i>
        </button>
      </OverlayTrigger>
    </>
  );
}

BackButton.propTypes = {
  link: PropTypes.string,
};

export default BackButton;
