import PropTypes from 'prop-types';

import { Profile, Subjects, Forum } from '@/components/student/layout/sidebar';
import { useEffect, useState } from 'react';
function SidebarRight({ studentData }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const middleSidebar = document.querySelector('.middle-sidebar-right');

    if (middleSidebar) {
      if (isSidebarOpen) {
        middleSidebar.classList.add('active-sidebar');
      } else {
        middleSidebar.classList.remove('active-sidebar');
      }
    }
  }, [isSidebarOpen]);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <div className="middle-sidebar-right">
        <div className="middle-sidebar-right-content">
          <Profile studentData={studentData} />
          <Forum />
          <Subjects subjects={studentData.subjects} />
        </div>
      </div>
      <button
        onClick={handleSidebarToggle}
        className="btn btn-circle text-white btn-neutral sidebar-right"
      >
        <i className={`ti-angle-${isSidebarOpen ? 'right' : 'left'}`}></i>
      </button>
    </>
  );
}

SidebarRight.propTypes = {
  studentData: PropTypes.object,
};

export default SidebarRight;
