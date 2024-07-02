import React, { useCallback, useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { ContentHeader } from '@/components/common';

import {
  ReportCard,
  RankCard,
  SubjectCard,
  AboutCard,
} from '@/components/student/profile';

import { fetchReportCard } from '@/api/student';
import { getStudentDataFromLocalStorage } from '@/utils/services';

function Profile() {
  const studentData = JSON.parse(getStudentDataFromLocalStorage());
console.log("compleyte student data: " + studentData)
console.log("student data: " + studentData.student_id)
  const studentId = studentData.student_id;
  const classId = studentData.class_id;
  const sectionId = studentData.section_id;

  const [reportCard, setReportCard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchStudentReportCard = useCallback(async () => {
    fetchReportCard(studentId, classId, sectionId)
      .then((data) => {
        if (data) {
          setReportCard(data.report_card);
          console.log(data.report_card);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
        toast.error(error.message);
      });
  }, []);

  useEffect(() => {
    fetchStudentReportCard();
  }, [fetchStudentReportCard]);

  if (error) return <div>Error: {error.message}</div>;
  return (
    <React.Fragment>
      <ContentHeader title="My" subtitle="Profile" />
      <div>
        <Tabs
          defaultActiveKey="report"
          className="mb-3 nav nav-tabs profile xs-p-3 d-flex align-items-center justify-content-between product-info-tab border-bottom-0 bg-white shadow-xss rounded-lg"
        >
          <Tab eventKey="report" title="PERFORMANCE">
            <ReportCard studentData={studentData} reportData={reportCard} loading={loading} />
          </Tab>
          <Tab eventKey="about" title="ABOUT">
            <AboutCard studentData={studentData} />
          </Tab>
          <Tab eventKey="subject" title="SUBJECT">
            <SubjectCard subjects={studentData?.subjects}/>
          </Tab>
          <Tab eventKey="ranks" title="RANKS">
            <RankCard reportData={reportCard} />
          </Tab>
        </Tabs>
      </div>
    </React.Fragment>
  );
}

export default Profile;
