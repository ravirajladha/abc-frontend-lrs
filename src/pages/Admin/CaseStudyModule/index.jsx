import React from 'react';
import { useState, useEffect } from 'react';
import { ContentHeader, ContentLoader } from '@/components/common';
import { fetchCaseStudyModules } from '@/api/admin';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';


function CaseStudyModule({ title }) {
  const [caseStudyModules, setCaseStudyModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const {caseStudyId} = useParams();

  const fetchData = async () => {
    try {
      const response = await fetchCaseStudyModules(caseStudyId);
      setCaseStudyModules(response.caseStudyModules);
      console.warn(response);
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
        title="Case study"
        subtitle="Modules"
        buttons={[
          {
            link: `create`,
            text: 'New Module',
          },
        ]}
      />
      <div className="row">
        {loading ? (
          <ContentLoader />
        ) : (
          caseStudyModules &&
          (caseStudyModules.length > 0 ? (
            <div className="col-lg-12">
              <div className="card border-0 mt-0 rounded-lg shadow-sm">
                <div className="card-body d-flex pt-4 px-4 pb-0">
                  <h4 className="font-xss text-grey-800 mt-3 fw-700">
                    {title}
                  </h4>
                  <select className="form-select ml-auto float-right border-0 font-xssss fw-600 text-grey-700 bg-transparent">
                    <option>Sort by latest</option>
                  </select>
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
                            Title
                          </th>
                          <th scope="col" className="text-right border-0 pl-1" width="20%">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {caseStudyModules.map((caseStudyModule, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <strong>{caseStudyModule.title}</strong>
                            </td>
                            <td className="text-right">
                              <Link
                                to={`/case-studies/${caseStudyId}/preview`}
                                className="btn btn-outline-warning btn-icon btn-sm mr-2"
                              >
                                <i className="feather-eye"></i>
                              </Link>
                              <Link
                                to={`${caseStudyModule.id}/sections`}
                                className="btn btn-outline-secondary btn-icon btn-sm mr-2"
                              >
                                <i className="feather-book"></i>
                              </Link>
                              {/* not implemented edit and delete */}
                              
                              <Link
                                to={`${caseStudyModule.id}/edit`}
                                className="btn btn-outline-primary btn-icon btn-sm mr-2"
                              >
                                <i className="feather-edit"></i>
                              </Link>
                              {/* <Link
                                to="#"
                                className="btn btn-outline-danger btn-icon btn-sm"
                                onClick={() => handleDelete(caseStudyModule.id)}
                              >
                                <i className="feather-trash"></i>
                              </Link> */}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center mt-5 col-12">
              <div className="alert" role="alert">
                There are no case studies available at the moment.
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default CaseStudyModule;
