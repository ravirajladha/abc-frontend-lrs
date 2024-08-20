import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ContentLoader } from '@/components/common';
import { StudentReportCard } from '@/components/parent';

import { fetchReportCard, fetchStudentInfo } from '@/api/parent';

function Student() {
  const { studentId } = useParams();

  const [studentData, setStudentData] = useState([]);
  const [reportCard, setReportCard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchStudentDetails = useCallback(async () => {
    try {
      const res = await fetchStudentInfo(studentId);
      if (res) {
        const { student_id, class_id, section_id } = res.student;
        setStudentData(res.student);
        fetchStudentReportCard(student_id, class_id, section_id);
      }
    } catch (error) {
      handleFetchError(error);
    }
  }, [studentId]);

  const fetchStudentReportCard = useCallback(
    async (studentId, subjectId, sectionId) => {
      try {
        const data = await fetchReportCard(studentId, subjectId, sectionId);
        if (data) {
          setReportCard(data.report_card);
          console.log(data.report_card);
        }
        setLoading(false);
      } catch (error) {
        handleFetchError(error);
      }
    },
    []
  );

  const handleFetchError = (error) => {
    setLoading(false);
    setError(error);
    toast.error(error.message);
  };

  useEffect(() => {
    fetchStudentDetails();
  }, [fetchStudentDetails]);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {loading ? (
        <ContentLoader />
      ) : (
        <StudentReportCard studentData={studentData} reportData={reportCard} />
      )}
    </div>
  );
}

export default Student;
