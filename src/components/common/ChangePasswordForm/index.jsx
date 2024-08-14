import PropTypes from 'prop-types';

import { getUserDataFromLocalStorage, getStudentDataFromLocalStorage } from '@/utils/services';

function ChangePasswordForm({
  formData,
  validationErrors,
  passwordMatch,
  onInputChange,
  onUpdateClick,
}) {
  const userData = JSON.parse(getUserDataFromLocalStorage());
  const studentData = JSON.parse(getStudentDataFromLocalStorage());
  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card w-100 border-0 bg-white shadow-md p-0 mb-4 rounded-lg">
          <div className="card-header bg-white border-0 pt-1 border-0">
            <h2 className="fw-400 text-grey-700 font-lg d-block mt-3">
              Update <strong className="fw-600"> Password</strong>
            </h2>
          </div>
          <div className="card-body p-lg-5 p-4 w-100 border-0 ">
            <form action="#" onSubmit={onUpdateClick} autoComplete="off">
              <div className="row">
                <div className="col-lg-6 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={userData['username']}
                    
                      disabled
                    />
                  </div>
                </div>
                <div className="col-lg-6 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      defaultValue={userData['email']}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-lg-6 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={userData['phone_number']}
                      disabled
                    />
                  </div>
                </div>
                </div>
              <div className="row">
                <div className="col-lg-6 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Password *
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={onInputChange}
                      autoComplete="password"
                      placeholder="Enter new password"
                    />
                    {validationErrors.password && (
                      <span className="text-danger">
                        {validationErrors.password}
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-lg-6 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className={`form-control ${
                        !passwordMatch && 'border-danger'
                      }`}
                      value={formData.confirmPassword}
                      onChange={onInputChange}
                      autoComplete="confirm-password"
                      placeholder="Confirm new password"
                    />
                    {!passwordMatch && (
                      <small className="text-danger">
                        Passwords do not match.
                      </small>
                    )}
                    {validationErrors.confirmPassword && (
                      <span className="text-danger">
                        {validationErrors.confirmPassword}
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <span className="text-danger">
                      Note: Password must contain at least 6 characters.
                    </span>
                  </div>
                </div>

                <div className="col-lg-12 mt-4 text-right">
                  <button
                    type="submit"
                    className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0 ls-3"
                    disabled={
                      !passwordMatch ||
                      formData.password === '' ||
                      formData.confirmPassword === ''
                    }
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

ChangePasswordForm.propTypes = {
  formData: PropTypes.shape({
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
  }),
  validationErrors: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  passwordMatch: PropTypes.bool,
  onInputChange: PropTypes.func,
  onUpdateClick: PropTypes.func,
};

export default ChangePasswordForm;
