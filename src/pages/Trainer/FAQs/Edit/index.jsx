import { fetchFaqById, fetchFaqs, storeFaq, updateFaq } from '@/api/trainer';
import {
  ContentCardWrapper,
  ContentHeader,
  ContentLoader,
} from '@/components/common';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';

const index = () => {
  const navigate = useNavigate();

  let { subjectId, courseId, faqId } = useParams();
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState({});

  const [form, setForm] = useState({
    question: '',
    answer: '',
  });

  useEffect(() => {
    const fetchFaqDetails = async () => {
      try {
        const response = await fetchFaqById(faqId);
        setForm({
          question: response.faq.question,
          answer: response.faq.answer,
        });
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqDetails();
  }, [faqId, courseId]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateFaq(faqId, form);
      toast.success(response.message);
      navigate(-1);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    setForm((prevState) => ({ ...prevState, [name]: newValue }));
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  if (loading) return <ContentLoader />;

  return (
    <>
      <ContentHeader title="Create" subtitle="Faqs" />
      <ContentCardWrapper>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="row">
            <div className="col-lg-6 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Question *</label>
                <input
                  type="text"
                  className="form-control"
                  name="question"
                  value={form.question}
                  onChange={handleFormChange}
                  placeholder="Enter Question"
                />
                {validationErrors.question && (
                  <span className="text-danger">
                    {validationErrors.question}
                  </span>
                )}
              </div>
            </div>
            <div className="col-lg-12 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Answer</label>
                <textarea
                  className="form-control"
                  name="answer"
                  value={form.answer}
                  onChange={handleFormChange}
                  placeholder="Enter Answer"
                ></textarea>
                {validationErrors.answer && (
                  <span className="text-danger">{validationErrors.answer}</span>
                )}
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
      </ContentCardWrapper>
    </>
  );
};

export default index;
