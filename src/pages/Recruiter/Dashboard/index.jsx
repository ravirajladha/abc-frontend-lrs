import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Card, Highlight } from '@/components/Dashboard';

import { fetchDashboard } from '@/api/recruiter';
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
   <div className="row">
      <div className="col-lg-12">
        <div
          className="card w-100 bg-lightblue shadow-xs p-lg-5 p-4 border-0 rounded-lg d-block float-left"
          // style={backgroundImageStyle}
        >
          <h1 className="display1-size display2-md-size d-inline-block float-left mb-0 text-grey-900 fw-700">
            <span
              className="font-xssss fw-600 text-grey-600 d-block mb-2"
              style={{ fontSize: '20px' }}
            >
              Welcome,
            </span>
            Hi,{' '}
            Recruiter
            <span
              className="font-xsss fw-600 text-grey-700 d-block mt-2"
              style={{ fontSize: '20px' }}
            ></span>
          </h1>
        </div>
      </div>
    </div>
      {loading ? (
        <div className="row my-5">
          <ContentLoader />
        </div>
      ) : (
        <>
          <div className="row">
            <Card
              itemName="Tests"
              itemIcon="codepen"
              itemValue={dashboard?.tests_count}
              itemLink="/recruiter/tests"
            />
            <Card
              itemName="Jobs"
              itemIcon="book"
              itemValue={dashboard?.jobs_count}
              itemLink="/recruiter/jobs"

            />
            <Card
              itemName="Students Applied"
              itemIcon="users"
              itemValue={dashboard?.job_applications_count}
              // itemLink="/trainer/qna"
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
                    itemName="Course"
                    itemIcon="book"
                    itemValue={item.subject_name}
                    itemLink={`/trainer/subjects/${item.class_id}/courses/${item.subject_id}/results`}
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
