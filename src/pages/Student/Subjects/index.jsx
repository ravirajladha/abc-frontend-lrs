// CoursesAccordion.js
import { useState } from 'react';
import { ButtonGroup, Button, Card, Tabs, Tab } from 'react-bootstrap';
import { AllCourses } from '@/components/student/allCourses'; // All Courses component
import { CoursesCard } from '@/components/student/dashboard'; // My Courses component
import { ContentHeader } from '@/components/common';

function CoursesAccordion({ title }) {
  const [activeSection, setActiveSection] = useState('allCourses');

  const handleToggle = (section) => {
    setActiveSection(section);
  };

  return (
    <div>
      <ContentHeader title={title} />
      <Tabs
        defaultActiveKey="allCourses"
        className="border-0 font-xss fw-600 text-dark internship-tabs"
      >
        <Tab eventKey="allCourses" title="All Courses"><AllCourses /></Tab>
        <Tab eventKey="myCourses" title="My Courses"><CoursesCard/></Tab>
      </Tabs>
    </div>
  );
}

export default CoursesAccordion;
