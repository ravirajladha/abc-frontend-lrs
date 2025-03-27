import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tab, Tabs } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { ContentHeader } from '@/components/common';

import {
  ReportCard,
  RankCard,
  SubjectCard,
  AboutCard,
  Wallet,
  Alumni,
} from '@/components/student/profile';

import { fetchReportCard, fetchWalletDetails } from '@/api/student';
import { fetchStudentFromStudents } from '@/api/internshipAdmin';
import { getStudentDataFromLocalStorage } from '@/utils/services';

function Profile({ isAdmin, isStudent }) {
  const { studentId: studentIdFromParams } = useParams();
  const navigate = useNavigate();
  const [reportCard, setReportCard] = useState([]);
  const [walletData, setWalletData] = useState(null);
  const [walletLogs, setWalletLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isProfileEditable, setIsProfileEditable] = useState(true);
  const [studentData, setStudentData] = useState(() => {
    // If isAdmin is true, then we should always be using the studentId from the URL parameters
    // otherwise, we try to get the student data from local storage.
    if (isAdmin === 'true') {
      return null;
    } else {
      try {
        // If isStudent is true and no studentId is provided in the URL, try to get data from local storage
        if (isStudent === 'true' && !studentIdFromParams) {
          const data = JSON.parse(getStudentDataFromLocalStorage());
          setLoading(true);

          return data || {};
        }
      } catch (error) {
        console.error(
          'Failed to parse student data from local storage:',
          error
        );
        return {};
      }
      return null;
    }
  });

  // Fetches student basic data for admin
  const fetchStudentData = useCallback(async () => {
    if (!studentIdFromParams) {
      setError(new Error('No student ID provided in URL parameters.'));
      return;
    }
    console.log('student id', studentIdFromParams);

    try {
      const data = await fetchStudentFromStudents(studentIdFromParams);
      if (data && data.student) {
        console.log('Student data fetched', data);
        setStudentData(data.student);
        setLoading(false);
      } else {
        throw new Error('Student data is empty.');
      }
    } catch (error) {
      setError(error);
      toast.error('Failed to fetch student data: ' + error.message);
    } finally {
      setLoading(false);
    }
  }, [studentIdFromParams]);

  const fetchStudentReportCard = useCallback(async () => {
    const studentId = studentData.student_auth_id;

    try {
      const data = await fetchReportCard(studentId);
      if (data) {
        setReportCard(data.report_card);
        setLoading(false);
      }
    } catch (error) {
      console.error('Failed to fetch report card:', error);
      setError(true);
      toast.error('Failed to load report card: ' + error.message);
    } finally {
      setLoading(false);
    }
  }, [studentData]);
  const fetchWalletDetailsCard = useCallback(async () => {
    // console.log('Fetching wallet student details', studentData);
    const studentAuthId = studentData.student_auth_id;
    // const studentAuthId = studentData?.student_auth_id;
    if (!studentAuthId) {
      console.error('Student auth ID is not available');
      return;
    }

    try {
      const data = await fetchWalletDetails(studentAuthId);
      if (data) {
        setWalletData(data.wallet_details);
        setWalletLogs(data.wallet_logs);
        setLoading(false);
      }
    } catch (error) {
      console.error('Failed to fetch wallet details:', error);
      setError(true);
      toast.error('Failed to load wallet details: ' + error.message);
    } finally {
      setLoading(false);
    }
  }, [studentData]);

  // Effect to fetch student data if admin
  useEffect(() => {
    if (isAdmin === 'true' && studentIdFromParams) {
      setIsProfileEditable(false);
      fetchStudentData();
    }
  }, [isAdmin, studentIdFromParams, fetchStudentData]);

  // Effect to set student data from local storage if student
  useEffect(() => {
    if (isStudent === 'true' && !studentIdFromParams) {
      try {
        const data = JSON.parse(getStudentDataFromLocalStorage());
        setStudentData(data || {});
        setLoading(false);
      } catch (error) {
        setError(new Error('Failed to parse student data from local storage.'));
      }
    }
  }, [isStudent, studentIdFromParams]);

  // Effect to fetch report card data for all user types once studentData is set
  useEffect(() => {
    if (studentData && studentData.student_id) {
      const studentId = studentData.student_id;
      const studentAuthId = studentData.student_auth_id;

      if (!studentAuthId) {
        console.error('Student auth ID is not available');
        return;
      }

      fetchStudentReportCard(studentId);
      fetchWalletDetailsCard(studentAuthId);
    }
  }, [studentData, fetchStudentReportCard, fetchWalletDetailsCard]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <React.Fragment>
      <ContentHeader title="My" subtitle="Profile" />
      <div>
        <Tabs
          defaultActiveKey="report"
          className="mb-1 nav nav-tabs profile d-flex align-items-center justify-content-between product-info-tab border-bottom-0 bg-white shadow-sm rounded-lg"
        >
          <Tab eventKey="report" title="PERFORMANCE">
            <ReportCard
              studentData={studentData}
              reportData={reportCard}
              loading={loading}
            />
          </Tab>
          <Tab eventKey="about" title="ABOUT">
            <AboutCard
              studentData={studentData}
              isProfileEditable={isProfileEditable}
            />
          </Tab>

          {/* here the courses card is expecting the student_auth_id which is coming from the localstorage for the student, for the admin we needs to pass thorugh the parameter. currenlty commented out for the admin */}
          {isAdmin == true && (
            <Tab eventKey="subject" title="Courses">
              <SubjectCard subjects={studentData?.subjects} />
            </Tab>
          )}
          <Tab eventKey="ranks" title="RANKS">
            <RankCard reportData={reportCard} />
          </Tab>
          <Tab eventKey="wallet" title="WALLET">
            <Wallet
              studentData={studentData}
              walletLogs={walletLogs}
              walletData={walletData}
              loading={loading}
            />
          </Tab>
          <Tab eventKey="alumni" title="Alumni">
            <Alumni />
          </Tab>
        </Tabs>
      </div>
    </React.Fragment>
  );
}

export default Profile;
