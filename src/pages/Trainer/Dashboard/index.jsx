import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Card, Highlight } from '@/components/Dashboard';

import { fetchDashboard } from '@/api/trainer';
import { ContentLoader } from '@/components/common';
import { Link } from 'react-router-dom';
import Star from '/assets/images/star.png';
import StarDisabled from '/assets/images/star-disable.png';

function Dashboard() {
  const [dashboard, setDashboard] = React.useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;

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
              itemValue={dashboard?.subjects}
              itemLink="/trainer/subjects"
            />
            <Card
              itemName="Courses"
              itemIcon="book"
              itemValue={dashboard?.courses}
            />
            <Card
              itemName="Students"
              itemIcon="users"
              itemValue={dashboard?.students}
              itemLink="/trainer/qna"
            />
            {/* <Card
              itemName="Average Score"
              itemIcon="percent"
              itemValue={dashboard?.percent}
            /> */}
          </div>
          <>
            {/* {dashboard.class_subjects &&
              dashboard.class_subjects.map((item, index) => (
                <div className="row" key={index}>
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
                            <Link
                              to={`/trainer/subjects/${item.class_id}/courses/${item.subject_id}/results`}
                            >
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
              ))} */}
            <div className="card-body p-1 mt-3">
              <div className="table-responsive">
                <table className="table table-admin mb-0">
                  <thead className="bg-greylight rounded-10 ovh">
                    <tr>
                      <th className="border-0 text-dark"></th>
                      <th className="border-0"></th>
                      <th className="border-0" scope="col">
                        Subject
                      </th>
                      <th className="border-0" scope="col">
                        Course Name
                      </th>
                      <th className="border-0" scope="col">
                        Rating
                      </th>
                      <th className="border-0" scope="col">
                        Enrolled
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboard.subject_courses &&
                      dashboard.subject_courses.map((value, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td className="product-thumbnail text-start ps-0">
                            <a
                              href="/admin-productadd"
                              className="video-bttn small-icon"
                            >
                              <img
                                src={`${baseUrl + value.subject_image}`}
                                alt="product"
                                className="w125 d-inline-block p-0 bg-greylight rounded-lg overflow-hidden"
                              />
                            </a>
                          </td>

                          <td width="30%" className='text-dark'>
                            <b>{value.subject_name}</b>
                          </td>
                          <td>
                            <b>{value.course_name}</b>
                          </td>
                          <td>
                            <div className="star d-flex w-100 text-left">
                              <img src={Star} alt="star" className="w10" />
                              <img src={Star} alt="star" className="w10" />
                              <img src={Star} alt="star" className="w10" />
                              <img src={Star} alt="star" className="w10" />
                              <img
                                src={StarDisabled}
                                alt="star"
                                className="w10"
                              />
                            </div>
                          </td>
                          <td>{value.students}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        </>
      )}
    </div>
  );
}

export default Dashboard;
