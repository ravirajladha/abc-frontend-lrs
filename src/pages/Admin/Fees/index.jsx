import { fetchFeeDetails } from '@/api/admin';
import { ContentFallback, ContentHeader, ContentLoader } from '@/components/common';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Index = ({ title }) => {
  const [feesData, setFeesData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetchFeeDetails();
      setFeesData(response.fee);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <ContentHeader
        title={title}
        buttons={[
          {
            link: 'edit',
            text: 'Update Fees',
          },
        ]}
      />
      {loading ? (
        <ContentLoader />
      ) : feesData ? (
        <div className="row">
          <div className="col-lg-12">
            <div className="card border-0 mt-0 rounded-lg shadow-sm">
              <div className="card-body d-flex pt-4 px-4 pb-0">
                <h4 className="font-xss text-grey-800 mt-3 fw-700">{title}</h4>
              </div>
              <div className="card-body p-4">
                <div className="row">
                  <div className="col-lg-6 col-md-12 mb-3">
                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss">Amount</label>
                      <p>{feesData.amount}</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 mb-3">
                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss">Slash Amount</label>
                      <p>{feesData.slash_amount}</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 mb-3">
                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss">Total Amount</label>
                      <p>{feesData.total_amount}</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 mb-3">
                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss">Referral Amount</label>
                      <p>{feesData.referral_amount}</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 mb-3">
                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss">Referrer Amount</label>
                      <p>{feesData.referrer_amount}</p>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 mb-3">
                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss">Benefits</label>
                      <p
                className="font-xsss fw-500"
                dangerouslySetInnerHTML={{ __html: feesData.benefits }}
              ></p>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss">Description</label>
                      <p
                className="font-xsss fw-500"
                dangerouslySetInnerHTML={{ __html: feesData.description }}
              ></p>
                    </div>
                  </div>
                </div>
                {/* <div className="row">
                  <div className="col-lg-12">
                    <Link
                      to="edit"
                      className="btn btn-primary btn-sm float-right"
                    >
                      Update Fees
                    </Link>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ContentFallback />
      )}
    </>
  );
};

export default Index;
