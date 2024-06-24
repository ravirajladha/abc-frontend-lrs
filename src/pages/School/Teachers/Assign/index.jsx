import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { fetchClasses, fetchSubjects } from '@/api/common';
import { assignTeacher, fetchTeacherClassSubject } from '@/api/school';

import { ContentFormWrapper, ContentHeader } from '@/components/common';
import { SelectInput } from '@/components/common/form';

function Assign() {
  const navigate = useNavigate();
  const { teacherId } = useParams();
  const [classes, setClasses] = useState([]);
  const [subjectsMap, setSubjectsMap] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  const [fields, setFields] = useState([
    {
      class_id: '',
      subjects: [],
    },
  ]);

  const handleAddFields = () => {
    setFields([...fields, { class_id: '', subjects: [] }]);
    setValidationErrors({});
  };

  const handleRemoveFields = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const fetchClassDropdownData = useCallback(() => {
    fetchClasses()
      .then((data) => {
        setClasses(data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  useEffect(() => {
    fetchClassDropdownData();
  }, [fetchClassDropdownData]);

  const handleClassChange = async (index, selectedClassId) => {
    try {
      const subjectsData = await fetchSubjects(selectedClassId);
      setSubjectsMap((prevMap) => ({
        ...prevMap,
        [selectedClassId]: subjectsData.subjects,
      }));
      setFields((prevFields) => {
        const updatedFields = [...prevFields];
        updatedFields[index] = {
          ...updatedFields[index],
          class_id: selectedClassId,
          subjects: [],
        };
        return updatedFields;
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubjectChange = (index, value) => {
    setFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[index] = { ...updatedFields[index], subjects: value };
      return updatedFields;
    });
    setValidationErrors(({ subjects: _, ...prevErrors }) => prevErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = [];
      for (const field of fields) {
        const { class_id, subjects } = field;
        if (class_id && subjects.length > 0) {
          subjects.forEach((subject_id) => {
            formData.push({ class_id, subject_id });
          });
        } else {
          toast.warning('Please select both class and subject for each entry');
        }
      }

      await assignTeacher(teacherId, {
        teacher_data: formData,
      });
      toast.success('Teacher subjects added successfully');
      navigate('/school/trainers');
    } catch (error) {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      }
      toast.error(error.message);
    }
  };

  // const [loading, setLoading] = useState(true);
  // const [teacherClassSubjects, setTeacherClassSubjects] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await fetchTeacherClassSubject(teacherId);
  //       setTeacherClassSubjects(data.teacher);
  //       setLoading(false);
  //     } catch (error) {
  //       setLoading(false);
  //       console.error('Error fetching teacher data:', error);
  //     }
  //   };

  //   fetchData();
  // }, [teacherId]);

  // useEffect(() => {
  //   if (!loading && teacherClassSubjects.length > 0) {
  //     const initialFields = teacherClassSubjects.map((subject) => ({
  //       class_id: subject.class_id.toString(),
  //       subjects: subject.subject_id.toString(),
  //     }));
  //     setFields(initialFields);
  //   }
  // }, [loading, teacherClassSubjects]);

  return (
    <>
      <ContentHeader title="Assign" subtitle="Subjects" />
      <ContentFormWrapper>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-12">
                  <div className="dynamic">
                    {fields.map((field, index) => (
                      <div className="class-subject-fields row" key={index}>
                        <div className="col-lg-5">
                          <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">
                              Class
                            </label>
                            <br />
                            <SelectInput
                              className="form-control"
                              options={classes}
                              name={`class_${index}`}
                              label="name"
                              value={field.class_id}
                              onChange={(e) =>
                                handleClassChange(index, e.target.value)
                              }
                              placeholder="Select Class"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">
                              Subject
                            </label>
                            <br />
                            <SelectInput
                              className="form-control"
                              options={subjectsMap[field.class_id] || []}
                              name={`subject_${index}`}
                              label="name"
                              value={field.subjects}
                              onChange={(e) =>
                                handleSubjectChange(
                                  index,
                                  Array.isArray(e.target.value)
                                    ? e.target.value
                                    : [e.target.value]
                                )
                              }
                              placeholder="Select Subject"
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
                      title="Add teacher class and subject"
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
