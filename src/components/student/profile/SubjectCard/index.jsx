import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  CoursesCard,

} from '@/components/student/dashboard';
function SubjectCard({ subjects }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  return (
    <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
      <div className="card-header p-4 w-100 border-0 d-flex rounded-lg  bg-current">
        <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
          My Courses
        </h4>
      </div>
      <CoursesCard/>
    </div>
  );
}

SubjectCard.propTypes = {
  subjects: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default SubjectCard;
