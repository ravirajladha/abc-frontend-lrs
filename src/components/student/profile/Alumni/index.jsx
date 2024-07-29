import PropTypes from 'prop-types';
import { useState } from 'react';
import DefaultProfileImage from '@/assets/images/default/student.png';

function Index() {
  const [status, setStatus] = useState('Inactive');

  // Function to change the status
  const handleChangeStatus = () => {
    setStatus(status === 'Inactive' ? 'Active' : 'Inactive');
  };
  return (
    <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
      <div className="card-body">
        <button
          onClick={handleChangeStatus}
          className={`btn btn-primary text-white font-xsss fw-500 float-right ${
            status == 'Active' ? 'disabled' : ''
          }`}
        >
          Become Alumni
        </button>
        {status == 'Active' ? (
          <p className="text-success text-center font-xsss fw-600">
            You are a alumni now.
          </p>
        ) : (
          ''
        )}
        <br />
        <div className="row mt-4">
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="mb-4 d-block w-100 rounded-lg border-0 text-center">
                  <figure className="avatar ml-auto shadow-lg rounded-circle mr-auto mb-0 w100 overflow-hidden fixed-avatar">
                    <img
                      src={DefaultProfileImage}
                      alt="avatar"
                      className="w-100 mt-2"
                    />
                  </figure>
                  <h4 className="fw-700 font-xs my-3">Aditya</h4>
                  <div className="clearfix"></div>
                  <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-success d-inline-block text-success mb-1 mr-1">
                    aditya@gmail.com
                  </span>
                  <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-primary d-inline-block text-primary mb-1 mr-1">
                    9874265555
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="mb-4 d-block w-100 rounded-lg border-0 text-center">
                  <figure className="avatar ml-auto shadow-lg rounded-circle mr-auto mb-0 w100 overflow-hidden fixed-avatar">
                    <img
                      src={DefaultProfileImage}
                      alt="avatar"
                      className="w-100 mt-2"
                    />
                  </figure>
                  <h4 className="fw-700 font-xs my-3">Sumit</h4>
                  <div className="clearfix"></div>
                  <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-success d-inline-block text-success mb-1 mr-1">
                    sumit@gmail.com
                  </span>
                  <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-primary d-inline-block text-primary mb-1 mr-1">
                    9874265555
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="mb-4 d-block w-100 rounded-lg border-0 text-center">
                  <figure className="avatar ml-auto shadow-lg rounded-circle mr-auto mb-0 w100 overflow-hidden fixed-avatar">
                    <img
                      src={DefaultProfileImage}
                      alt="avatar"
                      className="w-100 mt-2"
                    />
                  </figure>
                  <h4 className="fw-700 font-xs my-3">Sekhar</h4>
                  <div className="clearfix"></div>
                  <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-success d-inline-block text-success mb-1 mr-1">
                    sekhar@gmail.com
                  </span>
                  <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-primary d-inline-block text-primary mb-1 mr-1">
                    9874265555
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Index.propTypes = {
  reportData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Index;
