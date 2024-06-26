import PropTypes from 'prop-types';

import DefaultProfileImage from '@/assets/images/default/student.png';

function Profile({ studentData }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  return (
    <div className="card overflow-hidden subscribe-widget p-3 mb-3 rounded-xxl border-0">
      <div
        className="card-body p-2 d-block text-center bg-no-repeat bg-image-topcenter"
        style={{ backgroundImage: `url("assets/images/user-pattern.png")` }}
      >
        <figure className="avatar ml-auto mr-auto mb-0 mt-2 w90">
          <img
            src={
              studentData['profile_image']
                ? baseUrl + studentData['profile_image']
                : DefaultProfileImage
            }
            alt="avatar"
            className="float-right shadow-sm rounded-circle w-100"
          />
        </figure>
        <div className="clearfix"></div>
        <h2 className="text-black text-capitalize font-xss lh-3 fw-700 mt-3 mb-1">
          {studentData['student_name']}
        </h2>

        {/* <ul className="list-inline border-0 mt-4">
          <li className="list-inline-item text-center mr-4">
            <h4 className="fw-700 font-md">
              {studentData['class_name']}

              <span className="font-xssss fw-500 mt-1 text-grey-500 d-block">
                Class
              </span>
            </h4>
          </li>
          <li className="list-inline-item text-center mr-4">
            <h4 className="fw-700 font-md">
              {studentData['section_name']}
              <span className="font-xssss fw-500 mt-1 text-grey-500 d-block">
                Section
              </span>
            </h4>
          </li>
        </ul> */}
      </div>
    </div>
  );
}

Profile.propTypes = {
  studentData: PropTypes.object,
};

export default Profile;
