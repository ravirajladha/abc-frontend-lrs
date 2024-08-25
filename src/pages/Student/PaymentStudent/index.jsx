import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { authService } from '@/utils/services';
import { getStudentDataFromLocalStorage } from '@/utils/services';
import LogoutButton from '@/components/common/LogoutButton';
import { toast } from 'react-toastify';
import { fetchFeeDetails, validateReferralCode } from '@/api/admin';
import { useNavigate, useParams } from 'react-router-dom';
const PaymentModal = ({
  showModal,
  handleCloseModal,
  handlePaymentComplete,
}) => {
  const [loading, setLoading] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [referralName, setReferralName] = useState('');
  const [feesData, setFeesData] = useState(null);
  const [isReferralValid, setIsReferralValid] = useState(false);
  const studentData = JSON.parse(getStudentDataFromLocalStorage());
  const studentId = studentData.student_id;
  const [validationErrors, setValidationErrors] = useState({});
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const navigate = useNavigate();
  const { subjectId } = useParams();

  const studentDataLocal = JSON.parse(getStudentDataFromLocalStorage());
  // const [showModal, setShowModal] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  console.log('payment details', studentDataLocal.is_paid);
  console.log('payment', isPaid);
  useEffect(() => {
    const isPaidStatus =
      localStorage.getItem('is_paid') === 'true' || studentData.is_paid;
    setIsPaid(isPaidStatus);
  }, [studentData.is_paid]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchFeeDetails();
        setFeesData(response.fee);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, []);

  const handleValidateReferral = async () => {
    try {
      const response = await validateReferralCode({
        referral_code: referralCode,
      });
      setValidationErrors({ referral_code: '' });
      setReferralName(
        `Referral code validated. Referrer: ${response.referrer_name}`
      );
      toast.success(
        `Referral code validated. Referrer: ${response.referrer_name}`
      );
      setIsReferralValid(true);
    } catch (error) {
      setReferralName('Invalid referral code.');
      toast.error('Invalid referral code.');
      setIsReferralValid(false);
    }
  };
  useEffect(() => {
    if (isPaymentDone) {
      navigate(-1);
    }
  }, [isPaymentDone, navigate]);
  const handlePayment = async () => {
    setLoading(true);
    try {
      // Call the API to update payment status
      const response = await authService.updatePaymentStatus(studentId, {
        referral_code: referralCode, // Only include if valid
        referral_amount: feesData.referral_amount,
        referrer_amount: feesData.referrer_amount,
        course_id: subjectId,
      });
      setLoading(false);

      // Show success toast
      if (response.referrer_name) {
        toast.success(
          `Successfully subscribed. Amount referred to ${response.referrer_name}`
        );
      } else {
        toast.success('Successfully subscribed');
      }

      // Call the parent function to handle payment completion
      setIsPaymentDone(true);
      handlePaymentComplete();
      setValidationErrors({});
    } catch (error) {
      if (error.response.status === 400 && error.response.data.data) {
        setValidationErrors(error.response.data.data);
      }
      setLoading(false);
      console.error('Payment failed:', error);
      toast.error('Payment failed. Please try again.');
    }
  };

  return (
    <>
      {feesData ? (
        <>
          {!isPaid ? (
            <div className="middle-wrap">
              <div className="card w-100 border-0 bg-white shadow-md p-0 mb-4">
                <div className="card-body p-4 w-100 border-0 rounded-lg">
                  <h4 className="font-xss fw-700 pt-2 text-black mb-0 w-50">
                    Complete Payment  
                  </h4>
                  <div className="card border-0 shadow-none mb-4 mt-3">
                    <div className="card-body d-block text-left p-0">
                      <div className="item w-100 bg-white rounded-xxl overflow-hidden text-left shadow-md pl-3 pt-2 align-items-end flex-column d-flex">
                        <div className="card border-0 shadow-none p-0 bg-transparent-card text-left w-100">
                          <Form.Group
                            controlId="formReferralCode"
                            className="mb-3"
                          >
                            <h4 className="font-xss fw-500 pt-2 text-black">
                              Referral Code:
                            </h4>
                            <div className="row">
                              <div className="col-8">
                                <Form.Control
                                  type="text"
                                  placeholder="Enter referral code"
                                  value={referralCode}
                                  onChange={(e) => {
                                    setReferralCode(e.target.value);
                                    setIsReferralValid(false); // Reset validation if the code changes
                                  }}
                                  disabled={isReferralValid} // Disable input if validated
                                />
                                {validationErrors.referral_code && (
                                  <span className="text-danger">
                                    {validationErrors.referral_code}
                                  </span>
                                )}
                                {referralName && (
                                  <span
                                    className={`text-${
                                      isReferralValid ? 'success' : 'danger'
                                    }`}
                                  >
                                    {referralName}
                                  </span>
                                )}
                              </div>
                              <div className="col-4 text-right pr-4">
                                {!isReferralValid && (
                                  <Button
                                    onClick={handleValidateReferral}
                                    className="w-100 btn bg-primary text-white p-3 border-0 font-xssss fw-600"
                                  >
                                    Validate
                                  </Button>
                                )}
                              </div>
                            </div>
                          </Form.Group>
                        </div>
                        <div className="card border-0 shadow-none p-0 bg-transparent-card text-center w-100 mt-4">
                          <h4 className="text-grey-900 font-sm fw-700 mont-font mb-3 text-dark-color">
                            <s className="text-muted me-2">
                              Rs. {feesData.slash_amount}
                            </s>{' '}
                            Rs.
                            {feesData.amount}
                          </h4>
                            <button
                              onClick={handlePayment}
                              disabled={loading}
                              className="btn w150 bg-success text-white p-3 font-xssss fw-600 mx-auto mb-4"
                              style={{ whiteSpace: 'nowrap' }}
                            >
                              {loading ? 'Processing...' : 'PAY NOW'}
                              <i className="feather-check-square font-xsss pl-2"></i>
                            </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <h5 className="font-xs mb-2 text-center rounded-lg w-50 bg-success py-3 text-dark fw-400 border border-size-md bg-success">
              Payment Successful
            </h5>
          )}
        </>
      ) : (
        <p>Loading fee details...</p>
      )}
    </>
  );
};

export default PaymentModal;
