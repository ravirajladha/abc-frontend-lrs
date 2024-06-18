import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import NotFoundImage from '@/assets/images/default/404.gif';
import { reset } from '@/store/authSlice';

function NotFound() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const goBack = () => {
    if (isAuthenticated) {
      navigate(-1);
    } else {
      dispatch(reset());
      navigate('/');
    }
  };

  return (
    <Fragment>
      <div className="card pt-lg--10 pt-5 pb-lg--10 pb-5 vh-100 d-flex justify-content-center align-items-center">
        <div className="container ">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-6 col-md-8 text-center">
              <div className="border-0 text-center d-block">
                <img
                  src={NotFoundImage}
                  alt="404 Page Not Found"
                  className="w-100 mw-400 mb-4 mx-auto"
                />
                <h1 className="fw-700 text-grey-900 display4-size display4-md-size">
                  Oops! It looks like you&apos;re lost.
                </h1>
                <p className="text-grey-500 font-xss">
                  The page you&apos;re looking for isn&apos;t available.
                </p>

                <button
                  onClick={goBack}
                  className="btn text-uppercase py-3 px-4 mt-2 d-inline-block fw-500 text-white rounded-lg text-center font-xss shadow-xs bg-primary-gradiant "
                >
                   <i className="feather-arrow-left font-xss "></i> Previous Page
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default NotFound;
