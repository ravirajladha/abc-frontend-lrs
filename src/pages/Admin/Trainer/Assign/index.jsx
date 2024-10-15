import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { fetchSubjects, fetchCourses } from '@/api/common';
import {
  assignTrainer,
  fetchTrainerSubjectCourse,
} from '@/api/internshipAdmin';

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
      course_id: '',
    },
  ]);

  const handleAddFields = () => {
    setFields([...fields, { subject_id: '', course_id: '' }]);
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

  useEffect(() => {
    if (trainerId) {
      fetchTrainerSubjectCourse(trainerId)
        .then(async (data) => {
          if (data.length > 0) {
            let prefilledFields = [];

            // Loop through each subject and its courses
            for (const item of data) {
              const coursesData = await fetchCourses(item.subject_id);
              setCoursesMap((prevMap) => ({
                ...prevMap,
                [item.subject_id]: coursesData.courses,
              }));
              // For each subject, map courses to their respective input fields
              const subjectCourses = item.courses.map((course) => ({
                subject_id: item.subject_id,
                course_id: course, // Ensure course_id is correctly mapped
              }));
              
              prefilledFields = [...prefilledFields, ...subjectCourses];
            }

            setFields(prefilledFields); // Set the fields correctly with subject and course
          } else {
            setFields([{ subject_id: '', course_id: '' }]);
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }, [trainerId]);

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
          course_id: '',
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
      updatedFields[index] = { ...updatedFields[index], course_id: value }; // directly set course_id
      return updatedFields;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = [];
      for (const field of fields) {
        const { subject_id, course_id } = field;
        console.log(field);
        
        if (subject_id && course_id) {
          formData.push({ subject_id, course_id });
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
                            <SelectInput
                              className="form-control"
                              options={coursesMap[field.subject_id] || []} // Ensure courses are fetched for the correct subject
                              name={`course_${index}`}
                              label="name"
                              value={field.course_id} // The correct value should be bound here
                              onChange={(e) =>
                                handleCourseChange(index, e.target.value)
                              } // Update course_id
                              placeholder="Select Course"
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
