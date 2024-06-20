import React, { useCallback, useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import {
  ContentLoader,
  ContentItemCard,
  ContentHeader,
  ContentFallback,
} from '@/components/common';

import { fetchReadableCourses } from '@/api/student';
import { getStudentDataFromLocalStorage } from '@/utils/services';

function Index() {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const studentData = JSON.parse(getStudentDataFromLocalStorage());
  // const classId = studentData.class_id;

  const [readableCourses, setreadableCourses] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    fetchReadableCourses()
      .then((data) => {
        if (data) {
          setreadableCourses(data.readableCourses);
          console.log(data,"readable courses");
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <ContentHeader title="Readable" subtitle="Courses" />
      {loading ? (
        <ContentLoader />
      ) : (
        readableCourses &&
        (readableCourses.length > 0 ? (
          <div className="row">
            {readableCourses.map((readableCourse, index) => (
              <div className="col-xl-3 col-lg-4 col-md-6" key={index}>
                <div className="card mb-4 d-block w-100 shadow-md rounded-lg py-2 border-0 text-center">
                  {readableCourse?.ebook_image && (
                    <Link
                      to="/"
                      className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto overflow-hidden"
                    >
                      {readableCourse.ebook_image && (
                        <img
                          src={baseUrl + readableCourse.ebook_image}
                          alt="icon"
                          className="p-1 w-100 object-fit-cover"
                        />
                      )}
                    </Link>
                  )}
                  <h4 className="fw-700 font-xs my-4">
                    {readableCourse.ebook_title}
                  </h4>
                  <div className="clearfix"></div>
                  <div className="mb-2">
                    <Link
                      to={`/ebooks/${readableCourse.ebook_id}/preview`}
                      className={`mt-3 d-inline-block fw-700 text-white rounded-lg text-center font-xsssss shadow-xs py-2 px-3 text-uppercase ls-3 lh-4 bg-success`}
                    >
                      View
                    </Link>
                  </div>
                  <div className="mb-2">
                  <Link
                      to={`/project-reports/${readableCourse.project_report_id}/preview`}
                      className={`mt-3 d-inline-block fw-700 text-white rounded-lg text-center font-xsssss shadow-xs py-2 px-3 text-uppercase ls-3 lh-4 ${readableCourse.project_report_id ? 'bg-current' : 'bg-dark'} mx-1`}
                      style={{
                        pointerEvents: readableCourse.project_report_id ? 'auto' : 'none',
                        cursor: readableCourse.project_report_id ? 'pointer' : 'not-allowed',
                      }}
                    >
                      <span className={`${readableCourse.project_report_id ? '' : 'strikethrough'}`}>
                        Project Report
                      </span>
                    </Link>
                    <Link
                      to={`/case-studies/${readableCourse?.case_study_id}/preview`}
                      className={`mt-3 d-inline-block fw-700 text-white rounded-lg text-center font-xsssss shadow-xs py-2 px-3 text-uppercase ls-3 lh-4 ${readableCourse.case_study_id ? 'bg-current' : 'bg-dark'} mx-1`}
                      style={{
                        pointerEvents: readableCourse.case_study_id ? 'auto' : 'none',
                        cursor: readableCourse.case_study_id ? 'pointer' : 'not-allowed',
                      }}
                    >
                      <span className={`${readableCourse.case_study_id ? '' : 'strikethrough'}`}>
                        Case Study
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ContentFallback />
        ))
      )}
    </React.Fragment>
  );
}

export default Index;
