// Import necessary hooks and libraries
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { submitElab } from '@/api/student'; // Adjust the import path as per your API service structure

/**
 * A custom hook for submitting code.
 * @returns An object containing the handleSubmitCode function and the submission state.
 */
const useSubmitCode = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handles the submission of code.
   * @param {Object} dataToSend The data to be sent for submission.
   */
  console.log("datatosend", [dataToSend]);
  const handleSubmitCode = async (dataToSend) => {
    if (!dataToSend.allTestCasesPassed) {
      console.error('Not all test cases have passed.');
      toast.error('Not all test cases have passed.');
      return;
    }

    setIsSubmitting(true); // Mark the submission process as started

    try {
      // Perform the submission via the API
      const response = await submitElab(dataToSend);

      // Handle success response
      toast.success('Code submitted successfully. You are redirecting back...', {
        onClose: () => handleRedirection(dataToSend.type, dataToSend.redirecting_id), // Ensure to pass redirecting_id in dataToSend
        autoClose: 5000, // Close after 5 seconds
      });
    } catch (error) {
      // Handle errors
      console.error('Failed to submit code:', error);
      toast.error(error.message || 'Failed to submit code.');
    } finally {
      setIsSubmitting(false); // Mark the submission process as ended
    }
  };

  /**
   * Handles redirection after successful submission.
   * @param {Number|String} type The type of redirection.
   * @param {String} redirecting_id The ID needed for redirection path.
   */
  const handleRedirection = (type, redirecting_id) => {
    let redirectPath = type === 1 ? `/subject_stream/view_project/${redirecting_id}` : `/subject_stream/${redirecting_id}`;
    navigate(redirectPath);
  };

  // Expose the handleSubmitCode function and the isSubmitting state
  return { handleSubmitCode, isSubmitting };
};

export default useSubmitCode;
