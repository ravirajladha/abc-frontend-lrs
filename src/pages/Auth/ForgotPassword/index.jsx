import { useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'react-bootstrap';

import { authService } from '@/utils/services';

import Logo from '@/assets/images/logo-transparent.png';

function ForgotPassword() {
  const dispatch = useDispatch();

  const [validationErrors, setValidationErrors] = useState({});
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Password
  const [verifySuccessMessage, setVerifySuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleVerifyEmail = async (e) => {
    e.preventDefault();

    if (!email || loading) {
      toast.warning('Please enter a valid email.');
      return;
    }

    try {
      setLoading(true);
      const response = await authService.verifyEmailAndSendOtp({ email });
      console.log(response);
      toast.success('Email verified');
      setVerifySuccessMessage(response.data.message);
      setValidationErrors({});
      setStep(2); // Move to OTP step
    } catch (err) {
        if (err.response.status === 400 && err.response.data.data) {
            setValidationErrors(err.response.data.data);
          }
      toast.error('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp || loading) {
      toast.warning('Please enter the OTP.');
      return;
    }

    try {
      setLoading(true);
      const response = await authService.verifyOtp({ email, otp });
      console.log(response);
      toast.success(response.data.message || 'OTP verified.');
      setValidationErrors({});
      setStep(3); // Move to password reset step
    } catch (err) {
        if (err.response.status === 400 && err.response.data.data) {
            setValidationErrors(err.response.data.data);
          }
      toast.error('OTP verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!password || password !== confirmPassword || loading) {
      toast.warning('Passwords do not match or are invalid.');
      return;
    }

    try {
      setLoading(true);
      const response = await authService.resetPassword({ email,
        password,
        password_confirmation: confirmPassword, });
      console.log(response);
      toast.success(response.data.message || 'Password reset successfully.');
      setValidationErrors({});
      navigate('/login');
    } catch (err) {
        if (err.response.status === 400 && err.response.data.data) {
            setValidationErrors(err.response.data.data);
          }
      toast.error('Password reset failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="main-wrap card overflow-hidden vh-100">
        <ToastContainer autoClose={3000} closeOnClick />
        <div className="row justify-content-center align-items-center">
          <div
            className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
            style={{
              backgroundImage: `url(/assets/images/classroom1.jpg)`,
              backgroundColor: '#f2f2f2',
              transition: '0.5s ease-in-out',
            }}
          ></div>

          <div className="col-xl-7 vh-100 align-items-center d-flex rounded-lg overflow-hidden">
            <div className="card shadow-none border-0 ml-auto mr-auto login-card">
              <div className="card-body rounded-0 text-left">
                <img
                  src={Logo}
                  alt="logo"
                  className="inline-center flex center my-3"
                  width={100}
                />
                <br />
                <h2 className="fw-700 display1-size display2-md-size mb-3">
                  Reset Password
                </h2>
                {step === 1 && (
                  <form onSubmit={handleVerifyEmail} autoComplete="off">
                    <div className="form-group icon-input mb-3">
                      <i className="font-sm ti-email text-grey-500 pr-0"></i>
                      <input
                        type="email"
                        className="style2-input pl-5 form-control text-grey-900 font-xssss fw-600"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={step !== 1}
                      />
                      {validationErrors.email && (
                        <span className="text-danger">
                          {validationErrors.email}
                        </span>
                      )}
                    </div>
                    <div className="col-sm-12 p-0 text-left mt-3">
                      <div className="form-group mb-1">
                        <button
                          type="submit"
                          className={`form-control btn text-center style2-input text-white fw-600 bg-dark border-0 p-0 ${
                            loading ? 'disabled' : ''
                          }`}
                          disabled={loading}
                        >
                          {loading ? (
                            <Spinner
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              className="mr-2"
                            />
                          ) : (
                            'Verify Email'
                          )}
                        </button>
                        <h6 className="text-primary font-xssss fw-500 mt-0 mb-0 lh-32">
                          <Link to="/login" className="fw-700 ml-1">
                            Back to Login
                          </Link>
                        </h6>
                      </div>
                    </div>
                  </form>
                )}

                {step === 2 && (
                  <form onSubmit={handleVerifyOtp} autoComplete="off">
                    <h4 className='font-xsss text-grey-500'><i className='feather-check-square text-success rounded-lg p-1'></i> {verifySuccessMessage}</h4>
                    <div className="form-group icon-input mb-3">
                      <i className="font-sm ti-mobile text-grey-500 pr-0"></i>
                      <input
                        type="text"
                        className="style2-input pl-5 form-control text-grey-900 font-xssss fw-600"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                      {validationErrors.otp && (
                        <span className="text-danger">
                          {validationErrors.otp}
                        </span>
                      )}
                    </div>
                    <div className="col-sm-12 p-0 text-left mt-3">
                      <div className="form-group mb-1">
                        <button
                          type="submit"
                          className={`form-control btn text-center style2-input text-white fw-600 bg-dark border-0 p-0 ${
                            loading ? 'disabled' : ''
                          }`}
                          disabled={loading}
                        >
                          {loading ? (
                            <Spinner
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              className="mr-2"
                            />
                          ) : (
                            'Verify OTP'
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {step === 3 && (
                  <form onSubmit={handleResetPassword} autoComplete="off">
                    <div className="form-group icon-input mb-3">
                      <i className="font-sm ti-lock text-grey-500 pr-0"></i>
                      <input
                        type="password"
                        className="style2-input pl-5 form-control text-grey-900 font-xssss fw-600"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {validationErrors.password && (
                        <span className="text-danger">
                          {validationErrors.password}
                        </span>
                      )}
                    </div>
                    <div className="form-group icon-input mb-3">
                      <i className="font-sm ti-lock text-grey-500 pr-0"></i>
                      <input
                        type="password"
                        className="style2-input pl-5 form-control text-grey-900 font-xssss fw-600"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      {validationErrors.confirmPassword && (
                        <span className="text-danger">
                          {validationErrors.confirmPassword}
                        </span>
                      )}
                    </div>
                    <div className="col-sm-12 p-0 text-left mt-3">
                      <div className="form-group mb-1">
                        <button
                          type="submit"
                          className={`form-control btn text-center style2-input text-white fw-600 bg-dark border-0 p-0 ${
                            loading ? 'disabled' : ''
                          }`}
                          disabled={loading}
                        >
                          {loading ? (
                            <Spinner
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              className="mr-2"
                            />
                          ) : (
                            'Reset Password'
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ForgotPassword;
