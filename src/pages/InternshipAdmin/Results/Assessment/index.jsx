import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import { formatNumber } from '@/utils/helpers';

import { fetchAssessmentResults } from '@/api/internshipAdmin';
import ContentSelectFilter from '@/components/common/ContentSelectFilter';

import {
  ContentCardWrapper,
  ContentFallback,
  ContentHeader,
  ContentLoader,
} from '@/components/common';
import { fetchSubjects, fetchChapters } from '@/api/dropdown';

const index = () => {
  const { studentId, classId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState('');

  const [results, setResults] = useState([]);

  const fetchSubjectsDropdownData = useCallback(() => {
    fetchSubjects(classId)
      .then((data) => {
        setSubjects(data.subjects);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value || '');
    if (event.target.value) {
      fetchChaptersDropdownData(event.target.value);
    }
  };
  const fetchChaptersDropdownData = useCallback((classId) => {
    fetchChapters(classId)
      .then((data) => {
        setChapters(data.chapters);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  const handleChapterChange = ({ target: { value } }) => {
    setSelectedChapter(value);
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchAssessmentResults(selectedChapter, studentId);
      const data = response?.results || [];
      setResults(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching results:', error);
      toast.error('Error fetching results');
      setError(error);
      setLoading(false);
    }
  }, [selectedChapter]);

  useEffect(() => {
    fetchData();
    fetchSubjectsDropdownData();
  }, [selectedChapter]);
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <ContentHeader title="All" subtitle="Results" />
      <ContentCardWrapper>
        <div className="row justify-content-between mb-4">
          <div className="float-left font-xssss text-grey-700 ">
            Select subject and chapter to see results for that chapter*
          </div>
          <div className="d-flex">
            <ContentSelectFilter
              options={subjects}
              name="selectedSubject"
              label="name"
              value={selectedSubject || ''}
              onChange={handleSubjectChange}
              placeholder="Select a Subject"
              defaultText="All Subjects"
              className="float-right filter mr-2"
            />
            <ContentSelectFilter
              options={chapters}
              name="selectedChapter"
              label="title"
              value={selectedChapter}
              onChange={handleChapterChange}
              placeholder="Select a Chapter"
              defaultText="All Chapters"
              className="float-right filter mr-2"
            />
          </div>
        </div>
        {loading ? (
          <div className="text-center mt-5 col-12">
            <ContentLoader />
          </div>
        ) : results && results.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped table-bordered w-100">
              <thead>
                <tr>
                  <th>Sl no.</th>
                  <th>Video Name</th>
                  <th>Average Score</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{result.title}</td>
                    <td>{formatNumber(result.avg_score)}</td>
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
};

export default index;
