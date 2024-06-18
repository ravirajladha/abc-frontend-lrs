import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ZoomCallCard({ data }) {
  const [showLink, setShowLink] = useState(false);

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    // Show the link if the current time is between 6 AM and 7 AM
    if (hours >= 6 && hours < 7) {
      setShowLink(true);
    }
  }, []);

  return (
    <div className="card w-100 p-1 border-0 mt-4 rounded-lg bg-white shadow-xs overflow-hidden">
      <div className="card-body">
        <h4 className="font-xss text-grey-800 mt-1 lh-22 fw-700">
          {/* Add any additional heading content here */}
        </h4>
        <div className="row">
          {data && showLink ? (
            <Link
              to={data.url}
              className="btn ml-auto float-right border-0 d-flex fw-600 text-uppercase py-2 px-3 rounded-lg text-center font-xsss shadow-xs mr-2 bg-info text-white"
              target="_blank"
            >
              Join Zoom Call{' '}
              <i className="feather-arrow-right font-xs ml-2"></i>
            </Link>
          ) : (
            <p className="mx-auto text-info font-xsss fw-600 mr-2">
              The meeting will be live tomorrow at 6 AM.
            </p>
          )}
        </div>
        <Link
          to={data?.url}
          className="btn ml-auto float-right border-0 d-flex fw-600 text-uppercase py-2 px-3 rounded-lg text-center font-xsss shadow-xs mr-2 bg-info text-white"
          target="_blank"
        >
          Join Zoom Call <i className="feather-arrow-right font-xs ml-2"></i>
        </Link>
      </div>
    </div>
  );
}

export default ZoomCallCard;
