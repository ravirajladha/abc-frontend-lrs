import PropTypes from 'prop-types';

import { Profile, Subjects, Forum } from '@/components/student/layout/sidebar';
import { useCallback, useEffect, useState } from 'react';
import { fetchForum, fetchMyCourses } from '@/api/student';
import { getStudentDataFromLocalStorage } from '@/utils/services';
function SidebarRight({ studentData }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [subjectsData, setSubjectsData] = useState([]);
  const fetchSubjectsCallback = useCallback(async () => {
    try {
      const data = await fetchMyCourses();
      setSubjectsData(data.courses);
    } catch (error) {
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const studentId = studentData.student_id;

  const [forumData, setForumData] = useState([]);
  const [forumloading, setForumloading] = useState(true);

  const fetchForumData = useCallback(async () => {
    try {
      const response = await fetchForum(studentId);
      setForumData(response.forum);
    } catch (error) {
      setError(error);
    } finally {
      setForumloading(false);
    }
  }, [studentId]);

  useEffect(() => {
    const middleSidebar = document.querySelector('.middle-sidebar-right');

    if (middleSidebar) {
      if (isSidebarOpen) {
        fetchSubjectsCallback(); // fetch subjects when sidebar is opened
        fetchForumData(); // fetch forums when sidebar is opened
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
          <Forum forumData={forumData} forumloading={forumloading}/>
          <Subjects subjects={subjectsData} loading={loading} />
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
