import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';

import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-buttons/js/dataTables.buttons';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';

import { fetchCourseResult, fetchSubjectResult } from '@/api/common';

import {
  ContentCardWrapper,
  ContentFallback,
  ContentHeader,
  ContentLoader,
} from '@/components/common';
import { formatNumber } from '@/utils/helpers';

function Result() {
  const { courseId, subjectId } = useParams();

  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTerm, setSelectedTerm] = useState('');

  const tableRef = useRef(null);

  // const handleChangeTerm = (e) => {
  //   const selectedValue = parseInt(e.target.value, 10);
  //   setSelectedTerm(isNaN(selectedValue) ? '' : selectedValue);
  // };

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

      const response = await fetchCourseResult(courseId);
      setResults(response?.results);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching results:', error);
      toast.error('Error fetching results');
      setError(error);
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // useEffect(() => {
  //   // Initialize DataTable after results are updated
  //   if (results.length > 0) {
  //     const newTable = $(tableRef.current).DataTable({
  //       dom: 'Bfrtip',
  //       buttons: ['excelHTML5', 'csvHTML5', 'pdfHTML5', 'print'],
  //     });
  //     return () => {
  //       // Ensure that DataTable is properly destroyed on component unmount
  //       if ($.fn.DataTable.isDataTable($(tableRef.current))) {
  //         newTable.destroy();
  //       }
  //     };
  //   }
  // }, [results]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <ContentHeader title="Subject Results" />
      <ContentCardWrapper>
        {/* <div className="row justify-content-between mb-4">
          <div className="float-left font-xssss fw-700 text-grey-500 text-uppercase ls-3 mt-2 pt-1">
            Term {selectedTerm} Results
          </div>
          <select
            className="searchCat float-right sort"
            value={selectedTerm}
            onChange={handleChangeTerm}
          >
            <option value="" defaultValue>
              Overall Results
            </option>
            <option value={1}>Term 1</option>
            <option value={2}>Term 2</option>
            <option value={3}>Term 3</option>
          </select>
        </div> */}
        {loading ? (
          <div className="text-center mt-5 col-12">
            <ContentLoader />
          </div>
        ) : results && results?.length > 0 ? (
          <div className="table-responsive">
            <table
              ref={tableRef}
              className="table table-striped table-bordered w-100"
            >
              <thead>
                <tr>
                  <th>Sl no.</th>
                  <th>Name</th>
                  <th>Rank</th>
                  <th>Total Score</th>
                </tr>
              </thead>
              <tbody>
                {results?.map((result, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{result.student_name}</td>
                    <td>{formatNumber(result.rank)}</td>
                    <td>{formatNumber(result?.total_score)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="row ">
            <div className="col-12 ">
              <ContentFallback message="No Results Found, at the moment." />
            </div>
          </div>
        )}
      </ContentCardWrapper>
    </div>
  );
}

export default Result;
