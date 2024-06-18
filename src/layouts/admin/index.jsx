import { useState, Suspense, Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Loading from '@/components/common/Loader';

import NavHeader from '@/components/admin/layout/NavHeader';
import AppHeader from '@/components/common/AppHeader';
import AppFooter from '@/components/common/AppFooter';

function AuthLayout() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <Fragment>
      <div className="main-wrapper">
        <ToastContainer position="top-center" autoClose={3000} closeOnClick />
        <NavHeader isOpen={isNavOpen} toggleNav={toggleNav} />

        <div
          className="main-content"
          id="mainContent"
          style={{ background: '#e8f1fa88' }}
        >
          <AppHeader toggleNav={toggleNav} />
          <div className="middle-sidebar-bottom ">
            <div className="middle-sidebar-full">
              <Suspense fallback={<Loading />}>{<Outlet />}</Suspense>
            </div>
          </div>
        </div>
        <AppFooter />
      </div>
    </Fragment>
  );
}

export default AuthLayout;
