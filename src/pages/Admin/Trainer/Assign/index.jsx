import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { fetchSubjects, fetchCourses } from '@/api/common';
import { assignTrainer, fetchTrainerSubjectCourse } from '@/api/internshipAdmin';

import { ContentFormWrapper, ContentHeader } from '@/components/common';
import { SelectInput } from '@/components/common/form';

function Assign() {
  const navigate = useNavigate();
  const { trainerId } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [coursesMap, setCoursesMap] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  const [fields, setFields] = useState([
    {
      subject_id: '',
      courses: [],
    },
  ]);

  const handleAddFields = () => {
    setFields([...fields, { subject_id: '', courses: [] }]);
    setValidationErrors({});
  };

  const handleRemoveFields = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const fetchSubjectDropdownData = useCallback(() => {
    fetchSubjects()
      .then((data) => {
        setSubjects(data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  useEffect(() => {
    fetchSubjectDropdownData();
  }, [fetchSubjectDropdownData]);

  const handleSubjectChange = async (index, selectedSubjectId) => {
    try {
      const coursesData = await fetchCourses(selectedSubjectId);
      setCoursesMap((prevMap) => ({
        ...prevMap,
        [selectedSubjectId]: coursesData.courses,
      }));
      setFields((prevFields) => {
        const updatedFields = [...prevFields];
        updatedFields[index] = {
          ...updatedFields[index],
          subject_id: selectedSubjectId,
          courses: [],
        };
        return updatedFields;
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCourseChange = (index, value) => {
    setFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[index] = { ...updatedFields[index], courses: value };
      return updatedFields;
    });
    setValidationErrors(({ courses: _, ...prevErrors }) => prevErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = [];
      for (const field of fields) {
        const { subject_id, courses } = field;
        if (subject_id && courses.length > 0) {
          courses.forEach((course_id) => {
            formData.push({ subject_id, course_id });
          });
        } else {
          toast.warning('Please select both subject and course for each entry');
        }
      }

      await assignTrainer(trainerId, {
        trainer_data: formData,
      });
      toast.success('Trainer courses added successfully');
      navigate('/admin/trainers');
    } catch (error) {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      }
      toast.error(error.message);
    }
  };

  return (
    <>
      <ContentHeader title="Assign" subtitle="Courses" />
      <ContentFormWrapper>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-12">
                  <div className="dynamic">
                    {fields.map((field, index) => (
                      <div className="subject-course-fields row" key={index}>

                        <div className="col-lg-5">
                          <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">
                              Subject
                            </label>
                            <br />
                            <SelectInput
                              className="form-control"
                              options={subjects}
                              name={`subject_${index}`}
                              label="name"
                              value={field.subject_id}
                              onChange={(e) =>
                                handleSubjectChange(index, e.target.value)
                              }
                              placeholder="Select Subject"
                            />
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">
                              Course
                            </label>
                            <br />
                            <SelectInput
                              className="form-control"
                              options={coursesMap[field.subject_id] || []}
                              name={`course_${index}`}
                              label="name"
                              value={field.courses}
                              onChange={(e) =>
                                handleCourseChange(
                                  index,
                                  Array.isArray(e.target.value)
                                    ? e.target.value
                                    : [e.target.value]
                                )
                              }
                              placeholder="Select Course"
                              multiple
                            />
                          </div>
                        </div>

                        <div className="col-lg-1 my-auto">
                          <button
                            type="button"
                            className="remove-field px-3 py-2 btn bg-danger text-center text-white font-xsss fw-600 p-1 w80 rounded-lg d-inline-block border-0 mt-3"
                            onClick={() => handleRemoveFields(index)}
                          >
                            -
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <button
                      type="button"
                      id="addFields"
                      className="btn bg-success px-3 py-2  text-center text-white font-xsss fw-600 p-1 w80 rounded-lg d-inline-block border-0"
                      onClick={handleAddFields}
                      title="Add trainer subject and course"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12 mb-0 mt-2 pl-0">
            <button
              type="submit"
              className="bg-current border-0 text-center float-right text-white font-xsss fw-600 p-3 w150 rounded-lg d-inline-block"
            >
              <i className="feather-save mr-2"></i> Save
            </button>
          </div>
        </form>
      </ContentFormWrapper>
    </>
  );
}

export default Assign;
