import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { authService } from '@/utils/services';
import { getStudentDataFromLocalStorage } from '@/utils/services';
import LogoutButton from '@/components/common/LogoutButton';
import { toast } from 'react-toastify';
import { fetchFeeDetails }  from '@/api/admin'
const PaymentModal = ({ showModal, handleCloseModal, handlePaymentComplete }) => {
  const [loading, setLoading] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [feesData, setFeesData] = useState(null);

  const studentData = JSON.parse(getStudentDataFromLocalStorage());
  const studentId = studentData.student_id;

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

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Call the API to update payment status
      const response = await authService.updatePaymentStatus(studentId, {
        referral_code: referralCode,
        referral_amount: feesData.referral_amount,
        referrer_amount: feesData.referrer_amount,
      });
      setLoading(false);

      // Show success toast
      if (response.referrer_name) {
        toast.success(`Successfully subscribed. Amount referred to ${response.referrer_name}`);
      } else {
        toast.success("Successfully subscribed");
      }

      // Call the parent function to handle payment completion
      handlePaymentComplete();

    } catch (error) {
      setLoading(false);
      console.error('Payment failed:', error);
      toast.error('Payment failed. Please try again.');
    }
  };

  return (
    <Modal show={showModal} onHide={() => {}} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>Complete Your Payment</Modal.Title>
        <LogoutButton className="ml-auto" />
      </Modal.Header>
      <Modal.Body>
        {feesData ? (
          <>
            <p>Please complete the payment to continue using the application.</p>
            <div className="mb-3">
              <Form.Label>Amount:</Form.Label>
              <p className="text-danger"><s>{feesData.slash_amount}</s> {feesData.amount}</p>
            </div>
            <div className="mb-3">
              <Form.Label>Benefits:</Form.Label>
              <p>{feesData.benefits}</p>
            </div>
            <div className="mb-3">
              <Form.Label>Description:</Form.Label>
              <p>{feesData.description}</p>
            </div>
            <Form.Group controlId="formReferralCode" className="mb-3">
              <Form.Label>Referral Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter referral code"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handlePayment} disabled={loading} className="w-100">
              {loading ? 'Processing...' : 'Pay Now'}
            </Button>
          </>
        ) : (
          <p>Loading fee details...</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default PaymentModal;
