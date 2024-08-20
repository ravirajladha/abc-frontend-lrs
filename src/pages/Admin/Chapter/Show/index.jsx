import { useEffect, useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { fetchChapterData } from '@/api/common';
import { deleteVideo } from '@/api/admin';

import {
  ContentHeader,
  ContentCardWrapper,
  ContentLoader,
} from '@/components/common';

function Show() {
  // const baseUrl = import.meta.env.VITE_BASE_URL;
  const { subjectId, courseId, chapterId } = useParams();
  const [chapterData, setChapterData] = useState();
  const [contents, setContents] = useState();
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetchChapterData(chapterId);
      setChapterData(response.chapter);
      setContents(response.contents);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching chapter data:', error);
      setLoading(false);
    }
  }, [chapterId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (videoId) => {
    Swal.fire({
      title: 'Confirm!',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      text: 'Do you want to delete this content?',
      icon: 'warning',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteVideo(videoId);
          await fetchData(subjectId, courseId);
          toast.success(response.message);
        } catch (error) {
          toast.error(error.message);
          console.error('Error deleting content:', error);
        }
      }
    });
  };

  return (
    <div className="px-2">
      <ContentHeader
        title="Chapter :"
        subtitle={chapterData?.chapter_name}
        buttons={[
          {
            iconClassName: 'feather-edit mr-2',
            link: 'edit',
            text: `Edit Chapter`,
          },
          {
            link: `/admin/subjects/${subjectId}/courses/${courseId}/chapters/${chapterId}/create`,
            text: 'New Content',
          },
        ]}
        buttonText="Add Contents"
        backLink={`/admin/subjects/${subjectId}/courses/${courseId}/chapters`}
      />
      {loading ? (
        <div className="text-center mt-5 col-12">
          <ContentLoader />
        </div>
      ) : (
        <>
          <div
            className="card border-0 mb-0 rounded-lg overflow-hidden"
            style={{
              backgroundImage: `url(/assets/images/placeholder-background.jpg)`,
              backgroundSize: 'cover',
            }}
          >
            <div className="card-body p-5 bg-black-08">
              <div className="row">
                <div className="col-lg-9 pl-xl-5">
                  <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-warning d-inline-block text-warning mr-1">
                    {chapterData?.course_name}
                  </span>
                  <h2 className="fw-700 font-lg d-block lh-4 mb-1 text-white mt-2">
                    {chapterData?.chapter_name}
                  </h2>
                  <p className="font-xsss fw-500 text-grey-100 lh-30 pr-5 mt-3 mr-5">
                    {chapterData?.chapter_description}
                  </p>
                  <span className="font-xss fw-600 text-primary d-inline-block ">
                    {chapterData?.subject_name}
                  </span>
                  <span className="dot ml-2 mr-2 d-inline-block btn-round-xss bg-grey"></span>
                  <span className="font-xss fw-700 text-grey-600 d-inline-block ml-0 ">
                    {chapterData?.course_name}
                  </span>
                  <span className="dot ml-2 mr-2 d-inline-block btn-round-xss bg-grey"></span>
                  <span className="font-xss fw-700 text-grey-600 d-inline-block ml-0 ">
                    {chapterData?.no_videos} Videos
                  </span>
                  <div className="clearfix"></div>
                </div>
                {/* <div className="col-lg-3 pl-xl-5">
                  <figure className="avatar position-relative z-index-1 overflow-hidden">
                    {chapterData.chapter_image && (
                      <img
                        src={baseUrl + chapterData.chapter_image}
                        alt="icon"
                        className="float-right p-1 user-select-none img-fluid img-thumbnail bg-white rounded-circle w150 h150"
                      />
                    )}
                  </figure>
                </div> */}
              </div>
            </div>
          </div>
          <ContentCardWrapper>
            {contents && contents.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-admin mb-0 ">
                  <thead className="bg-greylight rounded-10">
                    <tr>
                      <th className="border-0">#</th>
                      <th className="border-0">Title</th>
                      <th className="border-0 text-center">Assessment</th>
                      <th className="border-0 text-center">eLab</th>
                      <th className="border-0 text-center">eBook</th>
                      <th className="border-0 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contents?.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.title}</td>
                        <td className="text-center">
                          {item.assessment_id ? (
                            <span className="badge badge-pill badge-info px-3 py-2">
                              YES
                            </span>
                          ) : (
                            <span className="badge badge-pill badge-danger px-3 py-2">
                              NO
                            </span>
                          )}
                        </td>
                        <td className="text-center">
                          {item.elab_id ? (
                            <span className="badge badge-pill badge-warning px-3 py-2">
                              YES
                            </span>
                          ) : (
                            <span className="badge badge-pill badge-danger px-3 py-2">
                              NO
                            </span>
                          )}
                        </td>
                        <td className="text-center">
                          {item.ebook_sections ? (
                            <span className="badge badge-pill badge-primary px-3 py-2">
                              YES
                            </span>
                          ) : (
                            <span className="badge badge-pill badge-danger px-3 py-2">
                              NO
                            </span>
                          )}
                        </td>
                        <td className="text-right">
                          <Link
                            to={`content/${item.id}`}
                            className="btn btn-outline-primary mr-2 btn-icon btn-sm"
                          >
                            <i className="feather-eye"></i>
                          </Link>
                          <Link
                            to={`content/${item.id}/edit`}
                            className="btn btn-outline-warning btn-icon mr-2 btn-sm"
                          >
                            <i className="feather-edit"></i>
                          </Link>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="btn btn-outline-danger btn-icon btn-sm"
                          >
                            <i className="feather-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center mt-5 col-12">
                <div className="alert" role="alert">
                  There are no contents available at the moment.
                  <br />
                  <Link className="fw-600" to="create">
                    Go ahead and add contents.
                  </Link>
                </div>
              </div>
            )}
          </ContentCardWrapper>
        </>
      )}
    </div>
  );
}

export default Show;
