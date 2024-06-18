import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Card, Highlight } from '@/components/Dashboard';

import { fetchDashboard } from '@/api/teacher';
import { ContentLoader } from '@/components/common';

function Dashboard() {
  const [dashboard, setDashboard] = React.useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchDashboardItems = useCallback(async () => {
    fetchDashboard()
      .then((data) => {
        if (data) {
          setDashboard(data.dashboard);
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
    fetchDashboardItems();
  }, [fetchDashboardItems]);

  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <Highlight />
      {loading ? (
        <div className="row my-5">
          <ContentLoader />
        </div>
      ) : (
        <>
          <div className="row">
            <Card
              itemName="Classes"
              itemIcon="codepen"
              itemValue={dashboard?.classes}
              itemLink="/teacher/classes"
            />
            <Card
              itemName="Subjects"
              itemIcon="book"
              itemValue={dashboard?.subjects}
            />
            <Card
              itemName="Students"
              itemIcon="users"
              itemValue={dashboard?.students}
              itemLink="/teacher/qna"
            />
            {/* <Card
              itemName="Average Score"
              itemIcon="percent"
              itemValue={dashboard?.percent}
            /> */}
          </div>
          <>
            {dashboard.class_subjects &&
              dashboard.class_subjects.map((item, index) => (
                <div className="row" key={index}>
                  <Card
                    itemName="Subject"
                    itemIcon="book"
                    itemValue={item.subject_name}
                    itemLink={`/teacher/classes/${item.class_id}/subjects/${item.subject_id}/results`}
                  />
                  <Card
                    itemName="Students"
                    itemIcon="users"
                    itemValue={item.students}
                  />
                </div>
              ))}
          </>
        </>
      )}
    </div>
  );
}

export default Dashboard;
