import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { fetchDashboard } from '@/api/admin';

import Card from '@/components/Dashboard/Card';
import { ContentLoader } from '@/components/common';

function Dashboard() {
  const [dashboard, setDashboard] = useState([]);
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
          <div className="card w-100 bg-lightblue shadow-sm p-lg-5 p-4 border-0 rounded-lg d-block float-left">
            <h1 className="display1-size display2-md-size d-inline-block float-left mb-0 text-grey-900 fw-700">
              <span
                className="font-xssss fw-600 text-grey-500 d-block mb-2"
                style={{ fontSize: '20px' }}
              >
                Welcome
              </span>
              Admin
              <span
                className="font-xsss fw-600 text-grey-700 d-block mt-2"
                style={{ fontSize: '20px' }}
              ></span>
            </h1>
            {/* <div className="preloader"></div> */}
          </div>
        </div>
      </div>
      {loading ? (
        <div className="row my-5">
          <ContentLoader />
        </div>
      ) : (
        <div className="row mb-4">
          {/* <Card
            itemIcon="layers"
            itemValue={dashboard?.schools}
            itemLink="/admin/schools"
            itemName="Schools"
          /> */}
          <Card
            itemIcon="package"
            itemValue={dashboard?.class}
            itemLink="/admin/subjects"
            itemName="Subjects"
          />
          <Card
            itemIcon="command"
            itemValue={dashboard?.subjects}
            itemName="Courses"
        
          />
          <Card
            itemIcon="command"
            itemValue={dashboard?.subscribed_students}
            itemName="Subscribed Students"
             itemLink="/admin/public-students"
          />

          <Card
            itemIcon="command"
            itemValue={dashboard?.unsubscribed_students}
            itemName="Unsubscribed Students"
          />
          <Card
            itemIcon="command"
            itemValue={dashboard?.trainers}
            itemLink="/admin/trainers"
            itemName="Trainers"
          />
          <Card itemIcon="tv" itemValue={dashboard?.videos} itemName="Videos" />
          <Card
            itemIcon="check-square"
            itemValue={dashboard?.tests}
            itemLink="/admin/tests"
            itemName="Tests"
          />
          <Card
            itemIcon="code"
            itemValue={dashboard?.eLabs}
            itemName="eLabs"
            itemLink="/admin/elabs"
          />
          <Card
            itemIcon="codepen"
            itemValue={dashboard?.mini_projects}
            itemLink="/admin/mini-projects"
            itemName="Mini Projects"
          />
          <Card
            itemIcon="codepen"
            itemValue={dashboard?.internships}
            itemLink="/admin/internships"
            itemName="Internships"
          />
          <Card
            itemIcon="book"
            itemValue={dashboard?.eBooks}
            itemLink="/admin/ebooks"
            itemName="eBooks"
          />
          <Card
            itemIcon="codepen"
            itemValue={dashboard?.project_reports}
            itemLink="/admin/project-reports"
            itemName="Project Reports"
          />
          <Card
            itemIcon="codepen"
            itemValue={dashboard?.case_studies}
            itemLink="/admin/case-studies"
            itemName="Case Studies"
          />
          <Card
            itemIcon="codepen"
            itemValue={dashboard?.case_studies}
            itemLink="/admin/mini-projects"
            itemName="Readable Courses"
          />
          <Card
            itemIcon="codepen"
            itemValue={dashboard?.recruiters}
            itemLink="/admin/recruiters"
            itemName="Recruiters"
          />
          <Card
            itemIcon="codepen"
            itemValue={dashboard?.placements}
            itemLink="/admin/jobs"
            itemName="Jobs"
          />
          <Card
            itemIcon="codepen"
            itemValue={dashboard?.placement_tests}
            itemLink="/admin/jobs/tests"
            itemName="Job Tests"
          />
          
        </div>
      )}

      {/* <div className="row">
        <div className="col-lg-3">
          <div className="card mb-4 border-0 pt-4 pb-4 text-center alert-warning align-items-center rounded-10">
            <i className="psor text-white btn-round-md font-xs feather-hard-drive bg-primary-gradiant"></i>
            <h3 className="fw-700 font-xl text-grey-900 mt-2 ls-3 mb-0">
              325.2k
            </h3>
            <span className="font-xssss ls-0 text-grey-900 fw-700 mt-0">
              Order complete
            </span>
            <span className="mt-1 text-grey-500 font-xsssss fw-500">
              20% Increase from Last Week
            </span>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="card mb-4 border-0 pt-4 pb-4 text-center alert-success align-items-center rounded-10">
            <i className="psor text-white btn-round-md font-xs feather-box bg-success"></i>
            <h3 className="fw-700 font-xl text-grey-900 mt-2 ls-3 mb-0">
              43.4k
            </h3>
            <span className="font-xssss ls-0 text-grey-900 fw-700 mt-0">
              Active Courses
            </span>
            <span className="mt-1 text-grey-500 font-xsssss fw-500">
              20% Increase from Last Week
            </span>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="card mb-4 border-0 pt-4 pb-4 text-center alert-info align-items-center rounded-10">
            <i className="psor text-white btn-round-md font-xs feather-award bg-info"></i>
            <h3 className="fw-700 font-xl text-grey-900 mt-2 ls-3 mb-0">54M</h3>
            <span className="font-xssss ls-0 text-grey-900 fw-700 mt-0">
              Active Customers
            </span>
            <span className="mt-1 text-grey-500 font-xsssss fw-500">
              20% Increase from Last Week
            </span>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="card mb-4 border-0 pt-4 pb-4 text-center alert-secondary align-items-center rounded-10">
            <i className="psor text-white btn-round-md font-xs feather-flag bg-secondary"></i>
            <h3 className="fw-700 font-xl text-grey-900 mt-2 ls-3 mb-0">354</h3>
            <span className="font-xssss ls-0 text-grey-900 fw-700 mt-0">
              Calories gain
            </span>
            <span className="mt-1 text-grey-500 font-xsssss fw-500">
              20% Increase from Last Week
            </span>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Dashboard;
