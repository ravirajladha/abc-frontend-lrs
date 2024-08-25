import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { ContentFallback, ContentLoader } from '@/components/common';
import { Highlight, Card } from '@/components/Dashboard';

import { fetchDashboard } from '@/api/internshipAdmin';

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

  return (
    <div>
      <Highlight />
      {loading ? (
        <div className="row my-5">
          <ContentLoader />
        </div>
      ) : (
        <div className="row mb-4">
          {dashboard && (
            <>
              <Card
                itemIcon="package"
                itemValue={dashboard?.class}
                itemName="Classes"
              />
              <Card
                itemIcon="users"
                itemValue={dashboard?.students}
                itemName="Students"
              />
              <Card
                itemIcon="users"
                itemValue={dashboard?.trainers}
                itemName="Trainers"
              />
              <Card
                itemIcon="file-text"
                itemValue={dashboard?.admissions}
                itemName="ADMISSIONS"
              />
            </>
          )}
          {error && (
            <ContentFallback
              message={error.message}
              alertDanger
              hasSmallMargin
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
