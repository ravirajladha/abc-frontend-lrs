import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Card, Highlight } from '@/components/Dashboard';

import { fetchDashboard } from '@/api/teacher';
import { ContentLoader } from '@/components/common';
import { Link } from 'react-router-dom';

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
              itemName="Subjects"
              itemIcon="codepen"
              itemValue={dashboard?.classes}
              itemLink="/teacher/subjects"
            />
            <Card
              itemName="Courses"
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
                  {/* <Card
                    itemName="Course"
                    itemIcon="book"
                    itemValue={item.subject_name}
                    itemLink={`/teacher/subjects/${item.class_id}/courses/${item.subject_id}/results`}
                  /> */}
                  <div className={'col-xl-6 col-lg-6'}>
                    <div className="card w-100 p-1 border-0 mt-4 rounded-lg bg-white shadow-xs overflow-hidden">
                      <div className="card-body p-4">
                        <div className="row">
                          <div className="col-8">
                            <h2 className="text-grey-900 fw-700 font-md mt-2 mb-2 ls-3 lh-1">
                              {item.subject_name}
                            </h2>
                            <h4 className="fw-700 text-grey-500 font-xsss ls-3 text-uppercase mb-0 mt-0">
                            Course
                            </h4>
                          </div>
                          <div className="col-4 d-flex justify-content-end">
                            <Link to={`/teacher/subjects/${item.class_id}/courses/${item.subject_id}/results`}>
                              <i
                                className={`psor text-white btn-round-md font-xs feather-book bg-primary-gradiant`}
                              ></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
