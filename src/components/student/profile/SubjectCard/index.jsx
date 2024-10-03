import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  CoursesCard,

} from '@/components/student/dashboard';
function SubjectCard({ subjects }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  return (
    <div className="card w-100 border-0 bg-white shadow-xs p-0 pl-4 pb-2">
      <CoursesCard title={"My Courses"}/>
    </div>
  );
}

SubjectCard.propTypes = {
  subjects: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default SubjectCard;
