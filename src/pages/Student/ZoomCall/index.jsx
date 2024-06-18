import React, { useCallback, useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import {
  ContentLoader,
  ContentHeader,
  ContentFallback,
} from '@/components/common';

import { getStudentDataFromLocalStorage } from '@/utils/services';

function Index() {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const studentData = JSON.parse(getStudentDataFromLocalStorage());

  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
  
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <ContentHeader title="Zoom " subtitle="Call" />
      {loading ? (
        <ContentLoader />
      ) : (
        readableCourses &&
        (readableCourses.length > 0 ? (
          <div className="row">
            
          </div>
        ) : (
          <ContentFallback />
        ))
      )}
    </React.Fragment>
  );
}

export default Index;
