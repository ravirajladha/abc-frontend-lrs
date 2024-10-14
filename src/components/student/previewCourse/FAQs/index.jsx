import { Accordion } from 'react-bootstrap';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteFaq, fetchFaqs } from '@/api/trainer';
import { ContentFallback, ContentLoader } from '@/components/common';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserType } from '@/store/authSlice';
import { USER_TYPES } from '@/utils/constants';

const FaqIndex = ({ courseId }) => {
  const authenticatedUserType = useSelector(selectUserType);


  const [faqsData, setFaqsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFaqsCallback = useCallback(async () => {
    try {
      const data = await fetchFaqs(courseId);
      setFaqsData(data.faqs);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchFaqsCallback();
  }, [courseId]);

  const handleDeleteFaq = async (faqId) => {
    try {
      await deleteFaq(faqId);
      toast.success('FAQ deleted successfully');
      setFaqsData((prevFaqs) => prevFaqs.filter(faq => faq.id !== faqId));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const confirmDelete = (faq) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to delete this FAQ? This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteFaq(faq.id); // Proceed with deletion if confirmed
      }
    });
  };

  if (loading) return <ContentLoader />;
  return (
    <div className="">
      <h2 className="fw-700 font-sm mb-3 mt-1 pl-1 text-black my-4">FAQs</h2>
      {
        faqsData && faqsData.length > 0 ? (
          <Accordion defaultActiveKey={0}>
            {faqsData.map((faq, index) => (
              <Accordion.Item eventKey={index} key={index} className="">
                <Accordion.Header className="bg-lightgreen shadow-md p-4 font-xss fw-600 rounded mb-1">
                  {faq.question}
                  {(authenticatedUserType === USER_TYPES.TRAINER) && (
                      <span className="ml-auto">
                      <Link to={`${faq.id}/edit`}>
                      <i className='feather-edit mx-1'></i>
                      </Link>
                      <i
                        className='feather-trash text-danger'
                        onClick={() => confirmDelete(faq)} // Show SweetAlert2 for confirmation
                        style={{ cursor: 'pointer' }}
                      ></i>
                    </span>
                    )}
                  
                </Accordion.Header>
                <Accordion.Body className="bg-grey p-4 font-xsss fw-500 text-black">
                  {faq.answer}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        ) : (
          <ContentFallback />
        )
      }
    </div>
  );
};

export default FaqIndex;
