import React, { useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'react-bootstrap';
import { FaInfoCircle } from 'react-icons/fa';
import { authService } from '@/utils/services';
import { setAuthData } from '@/store/authSlice';

import { USERS } from '@/utils/constants';

import Logo from '@/assets/images/logo-transparent.png';

function Index() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    phone_number: '',
    acceptTerms: false,
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.acceptTerms) {
      setValidationErrors({
        acceptTerms: ['Please accept the terms and conditions to proceed.'],
      });
      setLoading(false);
    } else {
      try {
        const response = await authService.register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirm_password: formData.confirm_password,
          phone_number: formData.phone_number,
        });

        if (response) {
          const {
            user,
            user_type: userType,
            access_token: userToken,
          } = response;
          dispatch(
            setAuthData({
              isAuthenticated: true,
              user,
              userType,
              userToken,
            })
          );

          toast.success('Registration  Successful');
          setValidationErrors({});
          setLoading(false);

          setTimeout(() => {
            if (USERS[user.type] && USERS[user.type].value === user.type) {
              const dashboardPath = USERS[user.type].path || '/';
              navigate(dashboardPath);
            } else {
              toast.error('Invalid user type or no matching user found.');
            }
          }, 600);
        } else {
          toast.error('Invalid credentials');
        }
      } catch (err) {
        if (err.response.status === 400 && err.response.data.data) {
          setValidationErrors(err.response.data.data);
        }
        toast.error(err.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'phone_number' && !/^\d*$/.test(value)) {
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  return (
    <Fragment>
      <div className="main-wrap card overflow-hidden vh-100">
        <ToastContainer autoClose={3000} closeOnClick />
        <div className="row">
        <div
            className="col-xl-6 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.5)),url(/assets/images/welcome.jpg)`,
              backgroundColor: '#f2f2f2',
              transition: '0.5s ease-in-out',
              position: 'relative',
            }}
          >
            <img
              src={Logo}
              alt="logo"
              style={{
                width: 150,
                position: 'absolute',
                top: '10%',
                left: '50%',
                transform: 'translateX(-50%)',
                padding: '10px',
                borderRadius: '5px',
              }}
            />
          </div>

          <div className="col-xl-6 vh-100 align-items-center d-flex bg-white rounded-lg overflow-hidden">
            <div className="card shadow-none border-0 ml-auto mr-auto login-card">
              <div className="card-body rounded-0 text-left">
                {/* <img
                  src={Logo}
                  alt="logo"
                  className="inline-center flex center my-3"
                  width={100}
                /> */}
                <br />
                <h2 className="fw-700 display1-size display2-md-size mb-4">
                  Create <br />
                  your account
                </h2>
                <form onSubmit={handleRegister} autoComplete="off">
                  <div className="form-group icon-input mb-3">
                    <i className="font-sm ti-user text-grey-500 pr-0"></i>
                    <input
                      type="text"
                      name="name"
                      className="style2-input pl-5 form-control text-grey-900 font-xsss fw-600"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {validationErrors.name && (
                      <span className="text-danger">
                        {validationErrors.name}
                      </span>
                    )}
                  </div>
                  {
                    <div className="form-group icon-input mb-3">
                      <i className="font-sm ti-mobile text-grey-500 pr-0"></i>
                      <input
                        type="text"
                        name="phone_number"
                        className="style2-input pl-5 form-control text-grey-900 font-xsss fw-600"
                        placeholder="Your Phone Number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        maxLength="10"
                        onKeyPress={(e) => {
                          if (!/^\d*$/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                      />
                      {validationErrors.phone_number && (
                        <span className="text-danger">
                          {validationErrors.phone_number}
                        </span>
                      )}
                    </div>
                  }
                  <div className="form-group icon-input mb-3">
                    <i className="font-sm ti-email text-grey-500 pr-0"></i>
                    <input
                      type="text"
                      className="style2-input pl-5 form-control text-grey-900 font-xsss fw-600"
                      placeholder="Your Email Address"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {validationErrors.email && (
                      <span className="text-danger">
                        {validationErrors.email}
                      </span>
                    )}
                  </div>
                  <div className="form-group icon-input mb-3">
                    <input
                      type="Password"
                      className="style2-input pl-5 form-control text-grey-900 font-xss ls-3"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <i className="font-sm ti-lock text-grey-500 pr-0"></i>
                    {validationErrors.password && (
                      <span className="text-danger">
                        {validationErrors.password}
                      </span>
                    )}
                  </div>
                  <div className="form-group icon-input mb-1">
                    <input
                      type="Password"
                      className="style2-input pl-5 form-control text-grey-900 font-xss ls-3"
                      placeholder="Confirm Password"
                      name="confirm_password"
                      value={formData.confirm_password}
                      onChange={handleChange}
                    />
                    <i className="font-sm ti-lock text-grey-500 pr-0"></i>
                    {validationErrors.confirm_password && (
                      <span className="text-danger">
                        {validationErrors.confirm_password}
                      </span>
                    )}
                  </div>
                  <div className="form-check text-left mb-3  mx-1 mt-2">
                    <input
                      type="checkbox"
                      className="form-check-input mt-2 "
                      id="confirmCheckbox"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label font-xssss text-grey-500"
                      htmlFor="confirmCheckbox"
                    >
                      Accept Term and Conditions
                    </label>
                    <label className="form-check-label font-xssss text-grey-500" htmlFor="confirmCheckbox"></label>
                    <br />
                    {validationErrors.acceptTerms && (
                      <span className="text-danger">
                        {validationErrors.acceptTerms}
                      </span>
                    )}
                  </div>

                  <div className="col-sm-12 p-0 text-left">
                    <div className="form-group mb-1">
                      <button
                        type="submit"
                        className={`form-control btn text-center style2-input text-white fw-600 bg-dark border-0 p-0`}
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
                          'Register'
                        )}
                      </button>
                    </div>
                    <h6 className="text-grey-500 font-xssss fw-500 mt-0 mb-0 lh-32">
                      Already have an account{' '}
                      <Link to="/login" className="fw-700 ml-1">
                        Login
                      </Link>
                    </h6>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Index;
