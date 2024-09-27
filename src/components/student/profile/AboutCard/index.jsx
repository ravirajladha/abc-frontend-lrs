import PropTypes from 'prop-types';

import DefaultProfileImage from '@/assets/images/default/student.png';
import { Link } from 'react-router-dom';
import { getUserDataFromLocalStorage } from '@/utils/services';

function AboutCard({ studentData, isProfileEditable }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const student = studentData;
  const userData = JSON.parse(getUserDataFromLocalStorage());
  return (
    <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
      {student && (
        <div className="card-body p-lg-5 p-4 w-100 border-0 mb-0">
            {isProfileEditable && (
              <Link
                to={`${student?.student_auth_id}/edit`}
                className="font-xs text-black float-right"
              >
                <i className="feather-edit" />{' '}
              </Link>
            )}

          <div className="row">
            <div className="col-lg-4">
              <div className="mb-4 d-block w-100 rounded-lg border-0 text-center ">
                <figure className="avatar shadow-lg rounded-circle ml-auto mr-auto mb-0 w100 overflow-hidden">
                  <img
                    src={
                      student?.profile_image
                        ? baseUrl + student?.profile_image
                        : DefaultProfileImage
                    }
                    alt="avatar"
                    className=" w-100"
                  />
                </figure>
                <h4 className="fw-700 font-xs my-2">{student?.student_name}</h4>
                <div className="clearfix"></div>
                <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-700">
                  <span className="text-grey-900 fw-600">Email:</span>{' '}
                  {userData?.email || 'N/A'}
                </span>
                <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-700">
                  <span className="text-grey-900 fw-600">Phone Number: </span>{' '}
                  {userData?.phone_number || 'N/A'}
                </span>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="form-group">
                <label className="mont-font fw-500 font-xsss">
                  <span className="fw-600 ">DOB: </span> {student?.dob || 'N/A'}
                </label>
              </div>
              <div className="form-group">
                <label className="mont-font fw-500 font-xsss">
                  <span className="fw-600 ">Address: </span>{' '}
                  {student?.address || 'N/A'}
                </label>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="form-group">
                <label className="mont-font fw-500 font-xsss">
                  <span className="fw-600 ">Gender: </span> Male
                </label>
              </div>
              <div className="form-group">
                <label className="mont-font fw-500 font-xsss">
                  <span className="fw-600 ">Pincode: </span>{' '}
                  {student?.pincode || 'N/A'}
                </label>
              </div>
            </div>
          </div>
          <div className="card w-100 border-top-current bg-lightgreen p-2 mb-2">
            <h4 className="font-xss fw-700 my-2">Educational Details</h4>
            <div className="card-body m-4 mb-0 bg-lightblue p-4 rounded-lg">
              <div className="row">
                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">College Name: </span>R.V.
                      College of Engineering, Bengaluru
                    </label>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">Start Date: </span>23/06/2022
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">End Date: </span>
                      23/06/2022
                    </label>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">Semester: </span>
                      6th
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card w-100 border-top-current bg-lightgreen p-2 mb-2">
            <h4 className="font-xss fw-700 my-2">Family Details</h4>
            <div className="card-body m-4 mb-0 bg-lightblue p-4 rounded-lg">
              <div className="row">
                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">Father Name: </span>Asish Sharma
                    </label>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">Father Email: </span>
                      father@gmail.com
                    </label>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">Father Phone: </span>
                      9314585552
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">Mother Name: </span>Asish Sharma
                    </label>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">Mother Email: </span>
                      mother@gmail.com
                    </label>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">Mother Phone: </span>
                      9314585552
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card w-100 border-top-current bg-lightgreen p-2 mb-2">
            <h4 className="font-xss fw-700 my-2">About Myself</h4>
            <div className="card-body m-4 mb-0 bg-lightblue p-4 rounded-lg">
              <div className="row">
                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">About me: </span>Lorem ipsum
                      dolor sit amet consectetur adipisicing elit. Quas,
                      cupiditate? Quidem explicabo blanditiis voluptatum veniam.
                      Hic similique distinctio ut aliquid.
                    </label>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">Hobbies: </span>Lorem, ipsum,
                      dolor sit.
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">Achievements: </span>
                      Lorem, ipsum, dolor sit.
                    </label>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">Language: </span> Kannda
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

AboutCard.propTypes = {
  studentData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default AboutCard;
