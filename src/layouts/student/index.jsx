import React, { useState, Suspense, Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Loading from '@/components/common/Loader';

import NavHeader from '@/components/common/NavHeader';
import AppHeader from '@/components/student/layout/AppHeader';
import SidebarRight from '@/components/student/layout/SidebarRight';
import AppFooter from '@/components/common/AppFooter';

import {
  getUserDataFromLocalStorage,
  getStudentDataFromLocalStorage,
} from '@/utils/services';

function StudentLayout() {
  const userData = JSON.parse(getUserDataFromLocalStorage());
  console.log(userData,"userdata")
  const studentData = JSON.parse(getStudentDataFromLocalStorage());
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <Fragment>
      <div className="main-wrapper">
        <NavHeader isOpen={isNavOpen} toggleNav={toggleNav} />
        <ToastContainer position="top-center" autoClose={3000} closeOnClick />

        <div className="main-content" id="mainContent">
          <AppHeader toggleNav={toggleNav} />
          <div className="middle-sidebar-bottom">
            <div className="middle-sidebar-left">
              <Suspense fallback={<Loading />}>
                {<Outlet context={studentData} />}
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
