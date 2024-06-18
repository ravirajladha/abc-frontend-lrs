import { fetchFees } from '@/api/admin';
import { ContentFallback, ContentHeader, ContentLoader } from '@/components/common';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Index = ({ title }) => {

    const [feesData, setfeesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetchFees();
      setfeesData(response.fees);
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
          link: 'create',
          text: 'Create Fees',
        },
      ]}
    />
    {loading ? (
        <ContentLoader />
      ) : (
        feesData &&
        (feesData.length > 0 ? (
          <div className="row">
            <div className="col-lg-12">
              <div className="card border-0 mt-0 rounded-lg shadow-sm">
                <div className="card-body d-flex pt-4 px-4 pb-0">
                  <h4 className="font-xss text-grey-800 mt-3 fw-700">
                    {title}
                  </h4>
                </div>
                <div className="card-body p-4">
                  <div className="table-responsive">
                    <table className="table table-admin mb-0 ">
                      <thead className="bg-greylight rounded-10 ">
                        <tr>
                          <th className="border-0" scope="col">
                            #
                          </th>
                          <th className="border-0" scope="col">
                            Class
                          </th>
                          <th className="border-0" scope="col">
                            Amount
                          </th>
                          <th scope="col" className="text-right border-0 pl-1" width="20%">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {feesData.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.class_name}</td>
                            <td>{item.amount}</td>
                            <td className="text-right">
                              <Link
                                to={`${item.id}/edit`}
                                className="btn btn-outline-primary btn-icon btn-sm mr-2"
                              >
                                <i className="feather-edit"></i>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <ContentFallback />
        ))
      )}
    </>
  );
};

export default Index;
