import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';

import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-buttons/js/dataTables.buttons';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';

import { fetchAssessmentResult } from '@/api/admin';

import {
  ContentCardWrapper,
  ContentFallback,
  ContentHeader,
  ContentLoader,
} from '@/components/common';

import { formatNumber } from '@/utils/helpers';

function Result() {
  const { assessmentId } = useParams();

  const [results, setResults] = useState([]);
  const tableRef = useRef();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      // Destroy DataTable before updating results
      if ($.fn.DataTable.isDataTable($(tableRef.current))) {
        const table = $(tableRef.current).DataTable();
        table.destroy();
      }
      const response = await fetchAssessmentResult(assessmentId);
      const data = response?.results || [];
      setResults(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching results:', error);
      toast.error('Error fetching results');
      setError(error);
      setLoading(false);
    }
  }, [assessmentId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    // Initialize DataTable after results are updated
    if (results.length > 0) {
      const newTable = $(tableRef.current).DataTable();
      return () => {
        // Ensure that DataTable is properly destroyed on component unmount
        if ($.fn.DataTable.isDataTable($(tableRef.current))) {
          newTable.destroy();
        }
      };
    }
  }, [results]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <ContentHeader title="Assessment Results" />
      {loading ? (
        <div className="text-center mt-5 col-12">
          <ContentLoader />
        </div>
      ) : results && results.length > 0 ? (
        <ContentCardWrapper>
          <div className="table-responsive">
            <table
              ref={tableRef}
              className="table table-striped table-bordered w-100"
            >
              <thead>
                <tr>
                  <th>Sl no.</th>
                  <th>Name</th>
                  <th>Attempts</th>
                  <th>Score</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{result.student_name}</td>
                    <td>{result.result_count}</td>
                    <td>{formatNumber(result.average_score)}</td>
                    <td>{formatNumber(result.average_percentage)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ContentCardWrapper>
      ) : (
        <div className="row ">
          <div className="col-12 ">
            <ContentFallback message="No Results Found, at the moment." />
          </div>
        </div>
      )}
    </div>
  );
}

export default Result;
