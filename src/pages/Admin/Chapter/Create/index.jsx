import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createChapter } from '@/api/admin';
import { ContentCardWrapper, ContentHeader } from '@/components/common';

function Create({ title }) {
  const navigate = useNavigate();
  const { subjectId,courseId } = useParams();

  const [chapters, setChapters] = useState([
    {
      chapter_name: '',
    },
  ]);

  const [validationErrors, setValidationErrors] = useState({});

  const handleFormChange = (index, event) => {
    const { name, value } = event.target;
    setChapters((prevChapters) => {
      const newChapters = [...prevChapters];
      newChapters[index] = {
        ...newChapters[index],
        [name]: value,
      };
      return newChapters;
    });
  };

  const addChapter = () => {
    setChapters((prevChapters) => [
      ...prevChapters,
      {
        chapter_name: '',
      },
    ]);
  };

  const removeChapter = (index) => {
    setChapters((prevChapters) => {
      const newChapters = [...prevChapters];
      newChapters.splice(index, 1);
      return newChapters;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let response;
      for (const chapter of chapters) {
        const submissionData = new FormData();
        submissionData.append('chapter_name', chapter.chapter_name);
        submissionData.append('course_id', courseId);
        submissionData.append('subject_id', subjectId);

        response = await createChapter(submissionData);
      }
      if (response) {
        toast.success('Chapter added successfully', response);
        navigate(`/admin/subjects/${subjectId}/courses/${courseId}/chapters`);
      }
    } catch (error) {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
        toast.error('Verify the chapter names or remove empty inputs');
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="px-2">
      <ContentHeader title={title} />
      <ContentCardWrapper>
        <form onSubmit={handleSubmit} autoComplete="off">
          {chapters.map((chapter, index) => (
            <div
              className="row align-items-center justify-content-center"
              key={index}
            >
              <div className="col-lg-11">
                <div className="form-group mb-0">
                  <label className="mont-font fw-600 font-xsss">
                    Chapter Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="chapter_name"
                    value={chapter.chapter_name}
                    onChange={(event) => handleFormChange(index, event)}
                    placeholder="Enter Chapter Name"
                  />
                </div>
              </div>
              <div className="col-lg-1">
                <div className="form-group mt-4 mb-0">
                  {index !== 0 && (
                    <button
                      type="button"
                      className="btn btn-icon bg-danger py-2 mt-2 px-3 text-white"
                      onClick={() => removeChapter(index)}
                    >
                      -
                    </button>
                  )}
                </div>
              </div>
              <div className="col-xl-12 mb-2 mt-1">
                {validationErrors.chapter_name && (
                  <span className="text-danger">
                    {validationErrors.chapter_name}
                  </span>
                )}
              </div>
            </div>
          ))}
          <div className="row">
            <div className="col-lg-11 mb-0 mt-2">
              <button
                type="button"
                className="btn bg-success text-white"
                onClick={addChapter}
              >
                <span className="mr-1 fw-600 font-xs ">+</span> Chapter
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 mb-0 mt-2 pl-0">
              <button
                type="submit"
                className="bg-current btn float-right text-white px-3 py-2"
              >
                <i className="feather-save mr-2"></i> Save
              </button>
            </div>
          </div>
        </form>
      </ContentCardWrapper>
    </div>
  );
}

Create.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Create;
