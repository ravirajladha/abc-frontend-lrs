import React from 'react';
import { Accordion } from 'react-bootstrap';
const index = () => {
  const faqs = [
   
    {
      title: 'How can I unlock the locks present in the videos section?',
      description:
        "To unlock the videos in the next chapter, you must first complete watching all the videos in the current chapter. Each chapter's content is designed to be sequential, ensuring that you grasp all the necessary concepts before moving on. Once you have watched all the videos in a particular chapter, the system will automatically unlock the subsequent chapter, allowing you to continue your learning journey. This structured approach ensures that you build a strong foundation before advancing to more complex topics.",
    },
    {
      title: 'How can we ask the next question in the Q&A tab?',
      description:
        'Students can ask a single question in the provided tab at any given time. After submitting their question, they need to wait for a response from the teacher before they can ask another question. This system ensures that each query is addressed individually, allowing for a more organized and effective learning experience.',
    },
    {
      title: 'How can I see the test button or pursue the test in any course?',
      description:
        'To access the test button and take the test for any course, you must first complete all the course content. Once you have finished all the chapters within a course, the test button will appear on the main page where all the courses are listed. This ensures that you have thoroughly understood the course material before attempting the test, enhancing your chances of success.',
    },
    {
      title: 'How do I get the certificate for each course?',
      description:
        'To receive a certificate for a course, you must complete all the chapters and their respective content within the course. After you have successfully finished all the chapters and any associated tests, the system will generate your certificate. This certificate will be available for download or viewing, signifying your successful completion and mastery of the course material.',
    },
  ];
  return (
    <div className="">
      <h2 className="fw-700 font-sm mb-3 mt-1 pl-1 text-black my-4">FAQs</h2>

      <Accordion defaultActiveKey={0}>
        {faqs.map((faq, index) => (
          <Accordion.Item eventKey={index} key={index} className="">
            <Accordion.Header className="bg-lightgreen shadow-md p-4 font-xss fw-600 rounded mb-1">
              {faq.title}
            </Accordion.Header>
            <Accordion.Body className="bg-grey p-4 font-xsss fw-500 text-black">
              {faq.description}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default index;
