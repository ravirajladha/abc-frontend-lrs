import { useState, useEffect, useCallback } from 'react';
import {
  Link,
  useOutletContext,
  useNavigate,
  useParams,
} from 'react-router-dom';

import { ContentHeader, ContentLoader } from '@/components/common';

import { ContentFallback, ContentError } from '@/components/common';
import { getStudentDataFromLocalStorage } from '@/utils/services';
import { toast } from 'react-toastify';

import { Accordion, Modal } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { formatDate } from '@/utils/helpers';
import { fetchCoursePreviewData } from '@/api/student';
import {
  ChapterAccordion,
  ReviewCard,
  TrainerCard,
} from '@/components/student/previewCourse';
import { fetchFeeDetails } from '@/api/admin';

function Subjects() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const { subjectId } = useParams();
  // const studentData = useOutletContext();
  const navigate = useNavigate();
  const studentData = JSON.parse(getStudentDataFromLocalStorage());

  const studentId = studentData.student_id;
  const classId = studentData.class_id;
  console.log(studentData);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [feesData, setFeesData] = useState(null);
  const [teacher, setTeacher] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPaid, setIsPaid] = useState(false);

  const fetchSubjectsCallback = useCallback(async () => {
    try {
      const data = await fetchCoursePreviewData(subjectId);
      console.log('Fetching', data);
      setSubjects(data.subject);
      setChapters(data.chapters);
      setTeacher(data.teacher);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [classId]);

  const fetchData = async () => {
    try {
      const response = await fetchFeeDetails();
      setFeesData(response.fee);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchSubjectsCallback();
    fetchData();
    const studentData = JSON.parse(getStudentDataFromLocalStorage());
    const isPaidStatus = studentData.is_paid;
    setIsPaid(isPaidStatus);
  }, []);

  return (
    <div>
      <ContentHeader title="Course" subtitle="Overview" />
      <div className="row">
        {loading ? (
          <div className="text-center mt-5 col-12">
            <ContentLoader />
          </div>
        ) : error ? (
          <ContentError message={error.message} />
        ) : subjects ? (
          <>
            <div className="col-xl-8 col-xxl-9">
              <div className="card border-0 mb-0 rounded-lg overflow-hidden">
                <ReactPlayer
                  controls="true"
                  width="100%"
                  height="auto"
                  className="react-player"
                  playing
                  // light={`assets/images/${value.videoimage}`}
                  url={`assets/images/video4.mp4`}
                />
              </div>
              <div className="card d-block border-0 rounded-lg overflow-hidden dark-bg-transparent bg-transparent mt-4 pb-3">
                <div className="row">
                  <div className="col-10">
                    <h2 className="fw-700 font-md d-block lh-4 mb-2">
                      {subjects.name}
                    </h2>
                  </div>
                  <div className="col-2">
                    <a
                      href="/default-course-one"
                      className="btn-round-md ml-3 d-inline-block float-right rounded-lg bg-danger"
                    >
                      <i className="feather-bookmark font-sm text-white"></i>
                    </a>
                  </div>
                </div>
                <span className="font-xssss fw-600 text-grey-500 d-inline-block ml-1">
                  {subjects?.class_name}
                </span>
                <span className="dot ml-2 mr-2 d-inline-block btn-round-xss bg-grey"></span>
                <span className="font-xssss fw-700 text-grey-900 d-inline-block ml-0 text-dark">
                  Created by: {teacher?.name}
                </span>
                <span className="dot ml-2 mr-2 d-inline-block btn-round-xss bg-grey"></span>
                <span className="font-xssss fw-700 text-grey-900 d-inline-block ml-0 text-dark">
                  Created on: {formatDate(subjects.created_at)}
                </span>
              </div>
              <div className="card d-block border-0 rounded-lg overflow-hidden p-4 shadow-xss mt-4 alert-success">
                <h2 className="fw-700 font-sm mb-3 mt-1 pl-1 text-success mb-4">
                  Course Benifits
                </h2>
                {/* <h4 className="font-xssss fw-600 text-grey-600 mb-3 pl-30 position-relative lh-24">
                  <i className="ti-check font-xssss btn-round-xs bg-success text-white position-absolute left-0 top-5"></i>
                </h4> */}
                <h4
                  className="font-xssss fw-600 text-grey-600 mb-3 pl-2 position-relative lh-24"
                  dangerouslySetInnerHTML={{ __html: subjects.benefits }}
                ></h4>
              </div>

              <div className="card d-block border-0 rounded-lg overflow-hidden p-4 shadow-xss mt-4">
                <h2 className="fw-700 font-sm mb-3 mt-1 pl-1 mb-3">
                  Description
                </h2>
                <p
                  className="font-xssss fw-500 lh-28 text-grey-600 mb-0 pl-2"
                  dangerouslySetInnerHTML={{ __html: subjects.description }}
                ></p>
              </div>

              <TrainerCard teacher={teacher} />
            </div>
            <div className="col-xl-4 col-xxl-3">
              <div className="card p-4 mb-4 bg-primary border-0 shadow-xss rounded-lg">
                {!isPaid ? (
                  <div className="card-body">
                    <h2 className="text-white font-xsssss fw-700 text-uppercase ls-3 ">
                      Subscribe
                    </h2>
                    <h1 className="display2-size text-white fw-700">
                      <s className="text-muted me-2">
                        Rs. {feesData?.slash_amount}
                      </s>{' '}
                      Rs.
                      {feesData?.amount}
                    </h1>
                    <Link
                      to={`/student/payment/${subjectId}`}
                      className="btn btn-block border-0 w-100 bg-white p-3 text-primary fw-600 rounded-lg d-inline-block font-xssss btn-light"
                    >
                      Buy Now
                    </Link>
                  </div>
                ) : (
                  <div className="card-body">
                    <h2 className="text-white font-xsssss fw-700 text-uppercase ls-3 ">
                      Subscribed
                    </h2>
                    <Link
                      to={`/student/courses/${subjectId}/learn`}
                      className="btn btn-block border-0 w-100 bg-white p-3 text-primary fw-600 rounded-lg d-inline-block font-xssss btn-light"
                    >
                      Continue
                    </Link>
                  </div>
                )}
              </div>
              <div className="card d-block border-0 rounded-lg overflow-hidden mt-3">
                <h2 className="fw-700 font-sm mb-3 mt-1 pl-1 mb-3">
                  Curriculum
                </h2>
                <ChapterAccordion isLoading={loading} chapterData={chapters} />
              </div>
              <ReviewCard />
            </div>
          </>
        ) : (
          <ContentFallback message="  There are no subjects available at the moment." />
        )}
      </div>
    </div>
  );
}

export default Subjects;
