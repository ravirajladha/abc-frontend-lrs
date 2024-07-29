import React, { useState, useEffect, Suspense, Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Loading from '@/components/common/Loader';
import NavHeader from '@/components/common/NavHeader';
import AppHeader from '@/components/student/layout/AppHeader';
import SidebarRight from '@/components/student/layout/SidebarRight';
import AppFooter from '@/components/common/AppFooter';
import PaymentModal from '@/components/student/PaymentModal'; // Adjust the import path

import {
  getUserDataFromLocalStorage,
  getStudentDataFromLocalStorage,
} from '@/utils/services';

function StudentLayout() {
  const userData = JSON.parse(getUserDataFromLocalStorage());
  const studentData = JSON.parse(getStudentDataFromLocalStorage());
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  // useEffect(() => {
  //   const isPaidStatus = localStorage.getItem('is_paid') === 'true' || studentData.is_paid;
  //   setIsPaid(isPaidStatus);
  //   setShowModal(!isPaidStatus);
  // }, [studentData.is_paid]);

  // const handlePaymentComplete = () => {
  //   setIsPaid(true);
  //   setShowModal(false);
  //   localStorage.setItem('is_paid', 'true'); // Ensure this is updated in local storage
  // };
  return (
    <Fragment>
    {/* <PaymentModal showModal={showModal} handleCloseModal={() => {}} handlePaymentComplete={handlePaymentComplete} />
      <div className="main-wrapper" style={{ opacity: showModal ? 0.5 : 1 }}> */}
    {/* <PaymentModal showModal={showModal} handleCloseModal={() => {}} handlePaymentComplete={handlePaymentComplete} /> */}
      <div className="main-wrapper" >
        <NavHeader isOpen={isNavOpen} toggleNav={toggleNav} />
        <ToastContainer position="top-center" autoClose={3000} closeOnClick />
        <div className="main-content bg-lightgreen" id="mainContent">
          <AppHeader toggleNav={toggleNav} />
          <div className="middle-sidebar-bottom">
            <div className="middle-sidebar-left">
              <Suspense fallback={<Loading />}>
                <Outlet context={studentData} />
              </Suspense>
            </div>
            <SidebarRight studentData={studentData} />
          </div>
        </div>
        <AppFooter />
      </div>
    </Fragment>
  );
}

export default StudentLayout;
