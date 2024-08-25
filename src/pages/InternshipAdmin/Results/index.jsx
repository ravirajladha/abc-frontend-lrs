import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';

import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-buttons/js/dataTables.buttons';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';

import { fetchResults } from '@/api/internshipAdmin';
import ContentSelectFilter from '@/components/common/ContentSelectFilter';

import {
  ContentCardWrapper,
  ContentFallback,
  ContentHeader,
  ContentLoader,
} from '@/components/common';
import { fetchSubjects, fetchSections } from '@/api/common';

function Result() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tableRef = useRef();

  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);

  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState('');

  const [results, setResults] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState(1);

  const fetchSubjectDropdownData = useCallback(() => {
    fetchSubjects()
      .then((data) => {
        setSubjects(data);
        if (data.length > 0) {
          setSelectedSubject(data[0].id);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  const fetchSectionsDropdownData = useCallback(() => {
    fetchSections()
      .then((data) => {
        setSections(data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  useEffect(() => {
    fetchSubjectDropdownData();
  }, [fetchSubjectDropdownData]);

  useEffect(() => {
    fetchSectionsDropdownData();
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      // Destroy DataTable before updating results
      if ($.fn.DataTable.isDataTable($(tableRef.current))) {
        const table = $(tableRef.current).DataTable();
        table.destroy();
      }

      const response = await fetchResults(
        selectedSubject,
        selectedSection,
        selectedTerm
      );
      const data = response?.results || [];
      setResults(data);
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.error('Error fetching results:', error);
      toast.error('Error fetching results');
      setError(error);
      setLoading(false);
    }
  }, [selectedSubject, selectedSection, selectedTerm]);

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

  const handleSubjectChange = ({ target: { value } }) => {
    setSelectedSubject(value);
  };
  const handleSectionChange = ({ target: { value } }) => {
    setSelectedSection(value);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <ContentHeader title="All" subtitle="Results" />
      <ContentCardWrapper>
        <div className="row justify-content-between mb-4">
          <div className="float-left font-xssss fw-700 text-grey-500 text-uppercase ls-3 mt-2 pt-1">
            Term {selectedTerm} Results
          </div>
          <div className="d-flex">
            <select
              className="searchCat float-right mr-4 sort"
              value={selectedSubject}
              onChange={handleSubjectChange}
            >
              <option value="" disabled>
                Select a Subject
              </option>
              {subjects &&
                subjects.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
            <select
              className="searchCat float-right mr-4 sort"
              value={selectedSection}
              onChange={handleSectionChange}
            >
              <option value="" disabled>
                All Sections
              </option>
              {sections &&
                sections.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
            <select
              className="searchCat float-right sort"
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(parseInt(e.target.value))}
            >
              <option value={1}>Term 1</option>
              <option value={2}>Term 2</option>
              <option value={3}>Term 3</option>
            </select>
          </div>
        </div>
        {loading ? (
          <div className="text-center mt-5 col-12">
            <ContentLoader />
          </div>
        ) : results && results.length > 0 ? (
          <div className="table-responsive">
            <table
              ref={tableRef}
              className="table table-striped table-bordered w-100"
            >
              <thead>
                <tr>
                  <th>Sl no.</th>
                  <th>Name</th>
                  {results.length > 0 &&
                    Object.keys(results[0].results).map((subject) => (
                      <th key={subject}>{subject}</th>
                    ))}
                  <th>Rank</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{result.student_name}</td>
                    {Object.values(result.results).map((subjectResult) => (
                      <td key={subjectResult.test_id}>{subjectResult.score}</td>
                    ))}
                    <td>{result.rank}</td>
                    <td>{result.total_score}</td>
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
