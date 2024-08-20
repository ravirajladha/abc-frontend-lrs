import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';

import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-buttons/js/dataTables.buttons';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';

import { fetchTestResult } from '@/api/admin';

import {
  ContentCardWrapper,
  ContentFallback,
  ContentHeader,
  ContentLoader,
} from '@/components/common';

function Result() {
  const { testId } = useParams();

  const [results, setResults] = useState([]);
  const tableRef = useRef();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      // Destroy DataTable before updating results
      if ($.fn.DataTable.isDataTable($(tableRef.current))) {
        const table = $(tableRef.current).DataTable({
          dom: 'Bfrtip',
          buttons: ['excelHTML5', 'csvHTML5', 'pdfHTML5', 'print'],
        });
        table.destroy();
      }

      const response = await fetchTestResult(testId);
      const data = response?.results || [];
      console.log('data inside adminresult', data);
      setResults(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching results:', error);
      toast.error('Error fetching results');
      setError(error);
      setLoading(false);
    }
  }, [testId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    // Initialize DataTable after results are updated
    if (results.length > 0) {
      const newTable = $(tableRef.current).DataTable({
        dom: 'Bfrtip',
        buttons: ['excelHTML5', 'csvHTML5', 'pdfHTML5', 'print'],
      });
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
      <ContentHeader title="Test Results" />
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
                  <th>Score</th>
                  <th>Percentage</th>
                  <th> Answer Sheet</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{result.student_name}</td>
                    <td>{result.score}</td>
                    <td>{result.percentage}</td>
                    <td>
                      {' '}
                      <Link
                        to={result.subject_id + '/' + result.student_id}
                        className={`px-2 py-1 mt-2 mx-1 d-inline-block text-white fw-700 lh-32 rounded-lg w100 text-center font-xsssss ls-3 bg-current`}
                      >
                        RESULTS
                      </Link>
                    </td>
                    {/* <td> */}
                    {/* <Link
                        to={`/admin/tests/${testId}/results/${result.student_id}/show`}
                        className="btn btn-outline-warning btn-icon mr-2 btn-sm"
                      >
                        <i className="feather-eye"></i>
                      </Link> */}
                    {/* </td>  */}
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
