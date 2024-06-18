import { useState, useEffect } from "react";
import { getElabDetails } from '../../../api/admin';
import { getElabSubmittedCode } from '../../../api/admin';
import { getUserDataFromLocalStorage } from '@/utils/services';

const useLabDetails = (labId, selectedLevel, setCode,setIsLoading,studentView, isShowCodebase,
  elab_submission_id=null) => {
  // console.log("111lab_id", labId);
  // const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  const user_detail = JSON.parse(getUserDataFromLocalStorage());
  const [labs, setLabs] = useState({});
  const [testCases, setTestCases] = useState([]);
  const [languageId, setLanguageId] = useState([]);
  const [harnessCode, setHarnessCode] = useState("");
  const [error, setError] = useState(null);
// console.log("student vidw", studentView)
// console.log("isShowCodebase", elab_submission_id)

useEffect(() => {
  const fetchLabDetails = async () => {
    try {
      const response = await getElabDetails(labId,user_detail.id);
      console.log('Full response:', response);
      
      const data = response;
      // console.log('Full response1111:', data.memory);

      if (isShowCodebase) {
        // Additional API calls to fetch data when isShowCodebase is true
        const codebaseResponse = await getElabSubmittedCode(elab_submission_id);
        console.log('Codebase response:', codebaseResponse.elab.code);

        const formattedTemplate = selectedLevel === "Level 1" ? codebaseResponse.elab.code : codebaseResponse.elab.code;
        const formattedCode = formattedTemplate ? formattedTemplate.replace(/\\n/g, "\n") : "// Error: Template not found.";
        setCode(formattedCode);

        // Process codebase response here
      }
  
      // if(data.submission.code){
      //   const formattedCode = data.submission.code.replace(/\\n/g, "\n");
      //   setCode(formattedCode);
      // }else{
      // }
     
      // console.log('data template1:',data , data.template1 , data.template2);
      if ( data && (data.template1 || data.template2)) {
        if(!isShowCodebase){
      //show the sumitted code when just to show the code
      const formattedTemplate = selectedLevel === "Level 1" ? data.template1 : data.template2;
      const formattedCode = formattedTemplate ? formattedTemplate.replace(/\\n/g, "\n") : "// Error: Template not found.";
      setCode(formattedCode);

        }
      } else {
        setCode("// Error: Template not found.", error);
        console.log("Error: Template not found in the response.", response);
      }
    
      if (data && data.testcase) {
        let testcaseParsed;
        let langauge_id;

        try {
          if (typeof data.testcase === "string") {
            testcaseParsed = JSON.parse(data.testcase);
            setTestCases(testcaseParsed);
          } else {
            testcaseParsed = data.testcase;
          }

          if (typeof data.code_language === "string") {
            langauge_id = JSON.parse(data.code_language);
            // console.log("code_language", langauge_id);

            setLanguageId(langauge_id);
            // console.log("code_language", langauge_id);
          } else {
            langauge_id = data.code_language;
          }

          if (Array.isArray(testcaseParsed)) {
            setLabs({ ...data, testcase: testcaseParsed });
          } else {
            console.error("Parsed testcase is not an array:", testcaseParsed);
          }

          let dataHarnessCodeParsed;
          if (typeof data.data_harness_code === "string") {
            dataHarnessCodeParsed = data.data_harness_code.replace(/\\n/g, "\n");
            setHarnessCode(dataHarnessCodeParsed);
          } else {
            dataHarnessCodeParsed = data.data_harness_code;
          }
        } catch (parseError) {
          console.error("Error parsing testcase:", parseError);
        }
      } else {
        console.error("data or data.testcase is undefined", response);
      }

    } catch (error) {
      console.error("Error fetching lab details:", error);
      setCode("// Error: Could not fetch lab details.");
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchLabDetails();
}, [labId, selectedLevel, setCode,isShowCodebase]);

return { labs, testCases, harnessCode, languageId, error };
};


export default useLabDetails;
