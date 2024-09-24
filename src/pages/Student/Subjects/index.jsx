// CoursesAccordion.js
import { useState } from 'react';
import { ButtonGroup, Button, Card } from 'react-bootstrap';
import {AllCourses} from '@/components/student/allCourses'; // All Courses component
import { CoursesCard } from '@/components/student/dashboard'; // My Courses component

function CoursesAccordion() {
  const [activeSection, setActiveSection] = useState('allCourses');

  const handleToggle = (section) => {
    setActiveSection(section);
  };

  return (
    <div>
      {/* Toggle Buttons */}
      <ButtonGroup className="mb-3">
        <Button
          variant={activeSection === 'allCourses' ? 'warning' : 'outline-secondary'}
          onClick={() => handleToggle('allCourses')}
        >
          All Courses
        </Button>
        <Button
          variant={activeSection === 'myCourses' ? 'warning' : 'outline-secondary'}
          onClick={() => handleToggle('myCourses')}
        >
          My Courses
        </Button>
      </ButtonGroup>

      {/* Accordion Content */}
      <Card>
        <Card.Body>
          {activeSection === 'allCourses' && <AllCourses />}
          {activeSection === 'myCourses' && <CoursesCard />}
        </Card.Body>
      </Card>
    </div>
  );
}

export default CoursesAccordion;
