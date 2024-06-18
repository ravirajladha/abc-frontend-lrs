import React, { useCallback, useEffect, useState } from 'react';
import { getUserDataFromLocalStorage } from '@/utils/services';
import { Link } from 'react-router-dom';

import {
  QuickAnalyticsCard,
  VideoAnalyticsCard,
} from '@/components/student/dashboard';

import { SelectInput } from '@/components/common/form';

import { fetchChildren } from '@/api/parent';

import { ContentFallback, ContentLoader } from '@/components/common';

import { fetchDashboard } from '@/api/parent';

function Dashboard() {
  const userData = JSON.parse(getUserDataFromLocalStorage());
  const parentId = userData.id;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [dashboard, setDashboard] = useState(null); // Initialize dashboard state with null
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [childrenDropdown, setChildrenDropdown] = useState(null); // Initialize childrenDropdown state with null

  const [inputFields, setInputFields] = useState({
    heading_type: '',
  });

  const handleInputChange = (e, fieldName) => {
    setInputFields({
      ...inputFields,
      [fieldName]: e.target.value,
    });
  };

  const fetchChildrenDropdown = useCallback(async () => {
    try {
      const data = await fetchChildren(parentId);
      setChildrenDropdown(data.children);
      if (data.children && data.children.length > 0) {
        setSelectedStudent(data.children[0].id);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [parentId]);

  useEffect(() => {
    fetchChildrenDropdown();
  }, [fetchChildrenDropdown]);

  const fetchParentDashboard = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchDashboard(selectedStudent);
      setDashboard(data.dashboard);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [selectedStudent]);

  useEffect(() => {
    if (selectedStudent !== null) {
      fetchParentDashboard();
    }
  }, [fetchParentDashboard, selectedStudent]);

  const handleDropdownChange = ({ target: { value } }) => {
    setSelectedStudent(value !== null ? value : null);
  };

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
                Welcome,
              </span>
              Hi, {userData['username']}
              <span
                className="font-xsss fw-600 text-grey-700 d-block mt-2"
                style={{ fontSize: '20px' }}
              ></span>
            </h1>
          </div>
        </div>
      </div>

      {/* {error && (
        <ContentFallback message={error.message} alertDanger hasSmallMargin />
      )} */}

      {childrenDropdown && (
        <div className="row mt-4 d-flex justify-content-between">
          <div className="col-3">
            <select
              className="form-control"
              name="student"
              id="student"
              value={selectedStudent}
              onChange={handleDropdownChange}
            >
              <option value="">Select your child</option>
              {childrenDropdown.map((child) => (
                <option key={child.id} value={child.id}>
                  {child.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-3">
            {selectedStudent && (
              <div className="d-flex justify-end">
                <Link
                  to={'student/' + selectedStudent}
                  className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0 ls-3"
                >
                  View Profile
                </Link>
              </div>
            )}
          </div>
          <div className="col-12">
            {!selectedStudent && (
              <ContentFallback
                message="Please select a student to view details"
                alertSimple
                hasSmallMargin
              />
            )}
          </div>
        </div>
      )}

      {loading ? (
        <div className="row my-5">
          <ContentLoader />
        </div>
      ) : (
        dashboard &&
        selectedStudent && (
          <>
            <QuickAnalyticsCard
              last_login_at={dashboard.last_login_at}
              total_watch_time={dashboard.total_watch_time}
              avg_assessment_score={dashboard.avg_assessment_score}
              first_term_results={dashboard.first_term_results}
              first_term_total_marks={dashboard.first_term_total_marks}
              second_term_results={dashboard.second_term_results}
              second_term_total_marks={dashboard.second_term_total_marks}
              third_term_results={dashboard.third_term_results}
              third_term_total_marks={dashboard.third_term_total_marks}
            />
            <VideoAnalyticsCard stats={dashboard.video_stats} />
          </>
        )
      )}
    </div>
  );
}

export default Dashboard;
