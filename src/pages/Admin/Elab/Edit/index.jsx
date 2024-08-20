import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';

import { ContentFormWrapper, ContentHeader ,ContentLoader} from '@/components/common';
import { SelectInput } from '@/components/common/form';
import { ELAB_LANGUAGES } from '@/utils/constants';

import { fetchSubjects, fetchCourses} from '@/api/dropdown';
import { getElabDetails ,editElab} from '@/api/admin';

function Edit({ title }) {
  const navigate = useNavigate();
  const { elabId } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  //setting the form data empty initially
  const initialFormData = {
    selectedSubject: '',
    selectedCourse: '',
    selectedLanguage: null,
    elabName: '',
    // code: '',
    description: '',
    constraints: '',
    io_format: '',
    sampleIO: '',
    pseudocode: '',
    template1: '',
    template2: '',
    dataHarnessCode: '',
    testcase: '',
    active: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const fetchSubjectDropdownData = useCallback(() => {
    fetchSubjects()
      .then((data) => {
        setSubjects(data.subjects);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  useEffect(() => {
    fetchSubjectDropdownData();
  }, [fetchSubjectDropdownData]);

  const fetchCoursesDropdownData = useCallback((subjectId) => {
    fetchCourses(subjectId)
      .then((data) => {
        setCourses(data.courses);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submissionData = new FormData();
      submissionData.append('_method', 'PUT');
      submissionData.append('selectedSubject', formData.selectedSubject || '');
      submissionData.append('selectedCourse', formData.selectedCourse|| '');
      submissionData.append('selectedLanguage', formData.selectedLanguage || '');
      submissionData.append('elabName', formData.elabName || '');
      // submissionData.append('code', formData.code || '');
      submissionData.append('io_format', formData.io_format || '');
      submissionData.append('description', formData.description || '');
      submissionData.append('constraints', formData.constraints || '');
      submissionData.append('sampleIO', formData.sampleIO || '');
      submissionData.append('pseudocode', formData.pseudocode || '');
      submissionData.append('template1', formData.template1 || '');
      submissionData.append('template2', formData.template2 || '');
      submissionData.append('dataHarnessCode', formData.dataHarnessCode || '');
      submissionData.append('testcase', formData.testcase || '');
      submissionData.append('active', formData.active );

      const response = await editElab(elabId, submissionData);
      toast.success('Elab updated successfully', response);
      setLoading(false);
      
      // navigate('/admin/elabs/' + elabId + '/edit');
      navigate('/admin/elabs');


    } catch (error) {

      if (error.validationErrors) {
        setLoading(false);
        setValidationErrors(error.validationErrors);
      } else {
        setLoading(false);
        toast.error(error.message);
      }
    }
  };


  const fetchElabData = useCallback(async () => {
    try {
      const elabData = await getElabDetails(elabId);
      console.log('elabdata', elabData);
      if (elabData) {
        const updatedForm = {
          subjectName: elabData.subject.name || '',
          courseName: elabData.course.name || '',
          selectedSubject: elabData.subject_id || '',
          selectedCourse: elabData.course_id || '',
          selectedLanguage: elabData.code_language || '',
          elabName: elabData.title || '',
          io_format: elabData.io_format || '',
          description: elabData.description || '',
          constraints: elabData.constraints || '',
          sampleIO: elabData.io_sample || '',
          pseudocode: elabData.pseudo_code || '',
          template1: elabData.template1 || '',
          template2: elabData.template2 || '',
          dataHarnessCode: elabData.data_harness_code || '',
          testcase: elabData.testcase || '',
          active: elabData.active ,
        };
        setFormData(updatedForm);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching elab data:', error);
      setLoading(false);
    }
  }, [elabId]);

  useEffect(() => {
    fetchElabData();
  }, [fetchElabData]);

  const handleSubjectChange = ({ target: { value } }) => {
    console.log('subjectId', value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      selectedSubject: '',
    }));
    setFormData({
      selectedSubject: value,
      selectedCourse: '',
    });

    fetchCoursesDropdownData(value);
  };
  const handleCourseChange = (event) => {
    console.log('course value', event.target.value);
    const selectedCourseId = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      selectedCourse: selectedCourseId,
    }));
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      selectedCourse: '',
    }));

    const selectedCourse = event.target.value;
    setFormData((prevData) => ({ ...prevData, selectedCourse }));
  };

  const handleLanguageChange = (event) => {
    const selectedLanguageId = event.target.value; // Get the selected language ID
    const selectedLanguage = ELAB_LANGUAGES.find(
      (language) => language.id === parseInt(selectedLanguageId)
    );
    setFormData({
      ...formData,
      selectedLanguage: JSON.stringify(selectedLanguage),
    }); // Update the selectedLanguage in the form data and stringify it
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };
  // onChange={handleFormChange}
  const handleFormSpecialChange = (value, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  // console.log("title", title)

  const handleDropdownChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      active: selectedOption.target.value,
    }));
  };
  return (
    <div>

      <ContentHeader title={title} />
      <ContentFormWrapper formTitle="Update eLab">
      {loading ? (
              <div className="my-5">
                <ContentLoader />
              </div>
            ) : (
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="row">
            {/* Select Class */}
            <div className="col-6">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                Subject: <span class="font-italic text-dark">{formData.subjectName.toUpperCase()}</span>
                </label>
               
              </div>
            </div>

            {/* Select Subject */}
            <div className="col-6">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Course: <span class="font-italic text-dark">{formData.courseName.toUpperCase()}</span>
                </label>
            
              </div>
            </div>

            {/* Select Language */}
            <div className="col-6">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Select Language
                </label>

                <select
                  className="form-control"
                  name="selectedLanguage"
                  value={
                    formData.selectedLanguage
                      ? JSON.parse(formData.selectedLanguage).id
                      : ''
                  }
                  onChange={handleLanguageChange}
                >
                  <option value="">Select Language</option>
                  {ELAB_LANGUAGES.map((language) => (
                    <option key={language.id} value={language.id}>
                      {language.name}
                    </option>
                  ))}
                </select>

                {validationErrors.selectedLanguage && (
                  <span className="text-danger">
                    {validationErrors.selectedLanguage}
                  </span>
                )}
              </div>
            </div>

            {/* Elab Name */}
            <div className="col-6">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Elab name</label>
                <input
                  type="text"
                  name="elabName"
                  value={formData.elabName}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Enter Elab Name"
                />
                {validationErrors.elabName && (
                  <span className="text-danger">
                    {validationErrors.elabName}
                  </span>
                )}
              </div>
            </div>

            {/* Description Textarea */}
            <div className="col-12">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Description
                </label>
                <textarea
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  placeholder="Enter description here"
                  rows="3"
                ></textarea>
                {validationErrors.description && (
                  <span className="text-danger">
                    {validationErrors.description}
                  </span>
                )}
              </div>
            </div>

            {/* io_format Textarea */}
            <div className="col-6">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  I/O Format
                </label>
                <textarea
                  className="form-control"
                  name="io_format"
                  value={formData.io_format}
                  onChange={handleFormChange}
                  placeholder="Enter I/O format here"
                  rows="3"
                ></textarea>
                {validationErrors.io_format && (
                  <span className="text-danger">
                    {validationErrors.io_format}
                  </span>
                )}
              </div>
            </div>
            {/* Constraints Textarea */}
            <div className="col-6">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Constraints
                </label>
                <textarea
                  className="form-control"
                  name="constraints"
                  value={formData.constraints}
                  onChange={handleFormChange}
                  placeholder="Enter constraints here"
                  rows="3"
                ></textarea>
                {validationErrors.constraints && (
                  <span className="text-danger">
                    {validationErrors.constraints}
                  </span>
                )}
              </div>
            </div>

            {/* Sample I/O Textarea */}
            <div className="col-6">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Sample I/O</label>
                <textarea
                  className="form-control"
                  name="sampleIO"
                  value={formData.sampleIO}
                  onChange={handleFormChange}
                  placeholder="Enter sample I/O here"
                  rows="3"
                ></textarea>
                {validationErrors.sampleIO && (
                  <span className="text-danger">
                    {validationErrors.sampleIO}
                  </span>
                )}
              </div>
            </div>

            {/* Pseudocode Textarea */}
            <div className="col-6">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Pseudocode</label>
                <AceEditor
                  mode="java"
                  theme="github"
                  name="pseudocode"
                  onChange={(value) =>
                    handleFormSpecialChange(value, 'pseudocode')
                  }
                  value={formData.pseudocode}
                  placeholder="Enter pseudocode here"
                  editorProps={{ $blockScrolling: true }}
                  // Add onChange handler if needed
                  setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 2,
                  }}
                  className="w-100 h200 font-xss"
                />
                {validationErrors.pseudocode && (
                  <span className="text-danger">
                    {validationErrors.pseudocode}
                  </span>
                )}
              </div>
            </div>

            {/* Template 1 Textarea */}
            <div className="col-6">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Template 1</label>
                <AceEditor
                  mode="java"
                  theme="github"
                  name="template1"
                  placeholder="Enter template 1 here"
                  editorProps={{ $blockScrolling: true }}
                  onChange={(value) =>
                    handleFormSpecialChange(value, 'template1')
                  }
                  value={formData.template1}
                  // Add onChange handler if needed
                  setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 2,
                  }}
                  className="w-100 h200 font-xss"
                />
                {validationErrors.template1 && (
                  <span className="text-danger">
                    {validationErrors.template1}
                  </span>
                )}
              </div>
            </div>

            {/* Template 2 Textarea */}
            <div className="col-6">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Template 2</label>
                <AceEditor
                  mode="java"
                  theme="github"
                  name="template2"
                  placeholder="Enter template 2 here"
                  editorProps={{ $blockScrolling: true }}
                  onChange={(value) =>
                    handleFormSpecialChange(value, 'template2')
                  }
                  value={formData.template2}
                  // Add onChange handler if needed
                  setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 2,
                  }}
                  className="w-100 h200 font-xss"
                />
                {validationErrors.template2 && (
                  <span className="text-danger">
                    {validationErrors.template2}
                  </span>
                )}
              </div>
            </div>

            {/* Data Harness Code Textarea */}
            <div className="col-6">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Data Harness Code
                </label>
                <AceEditor
                  placeholder="Enter data harness code here"
                  mode="java"
                  theme="github"
                  name="dataHarnessCode"
                  onChange={(value) =>
                    handleFormSpecialChange(value, 'dataHarnessCode')
                  }
                  value={formData.dataHarnessCode}
                  editorProps={{ $blockScrolling: true }}
                  // Add onChange handler if needed
                  setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 2,
                  }}
                  className="w-100 h200 font-xss"
                />
                {validationErrors.dataHarnessCode && (
                  <span className="text-danger">
                    {validationErrors.dataHarnessCode}
                  </span>
                )}
              </div>
            </div>

            {/* Testcase Textarea */}
            <div className="col-6">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Testcase</label>
                <textarea
             className="form-control "
                  name="testcase"
                  onChange={handleFormChange}
                  value={formData.testcase}
                  placeholder="Enter testcase JSON here"
                  rows="3"
                ></textarea>
                {validationErrors.testcase && (
                  <span className="text-danger">
                    {validationErrors.testcase}
                  </span>
                )}
              </div>
            </div>

            <div className="col-lg-12 mb-2">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                 Status 
                  </label>
                  <select
                    className="form-control"
                    name="active"
                    value={formData.active}
                    onChange={handleDropdownChange}
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
              </div>


            <div className="col-lg-12">
              <button
                type="submit"
                className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0 float-right"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Spinner
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="mr-2"
                  />
                ) : (
                  <>
                    <i className="feather-save mr-2"></i> Save
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
)}
      </ContentFormWrapper>
    </div>
  );
}

Edit.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Edit;
