import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  ContentHeader,
  ContentLoader,
  UcFirst,
  Pagination,
} from '@/components/common';
import { Link } from 'react-router-dom';
import { fetchElabs} from '@/api/admin';

function Elabs({ title }) {
  const [elabs, setElabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    fetchElabs(currentPage)
      .then((response) => {
        console.log('Full response:', response);
        if (response && response.elabs) {
          console.log('res', response.elabs);
          setElabs(response.elabs.data);
          setTotalPages(response.elabs.last_page);
        } else {
          // Handle the case where the response is not in the expected shape
          setError(new Error('Invalid response structure'));
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [currentPage]);

  const extractValue = (elab) => {
    // Parse the JSON string
    const parsedElab = JSON.parse(elab.code_language);
    // Extract the value
    return parsedElab.value;
  };

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <ContentHeader
        title="All"
        subtitle="eLabs"
        buttons={[
          {
            link: 'create',
            text: 'New eLab',
          },
        ]}
      />
      <div className="row">
        {loading ? (
          <div className="text-center col-12">
            <ContentLoader />
          </div>
        ) : elabs && elabs.length > 0 ? (
          <div className="col-lg-12">
            <div className="card border-0 mt-0 rounded-lg shadow-sm">
              <div className="card-body d-flex pt-4 px-4 pb-0">
                <h4 className="font-xss text-grey-800 mt-3 fw-700">{title}</h4>
                {/* <select className="form-select ml-auto float-right border-0 font-xssss fw-600 text-grey-700 bg-transparent">
                  <option>Sort by latest</option>
                </select> */}
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
                          Problem Statement
                        </th>

                        <th className="border-0" scope="col">
                        Subject
                        </th>
                        <th className="border-0" scope="col">
                          Course
                        </th>
                        <th className="border-0" scope="col">
                          Language
                        </th>
                        <th className="border-0" scope="col">
                          Participants
                        </th>
                        <th className="border-0" scope="col">
                      Status
                        </th>
                        <th scope="col" className="text-right border-0 pl-1">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {elabs.map((elab, index) => (
                        <tr key={elab.id}>
                          <td>{index + 1}</td> {/* Serial number */}
                          <td>
                            <strong>
                              <UcFirst text={elab.title} />
                            </strong>
                          </td>
                          <td>
                            <UcFirst text={elab.subject.name} />
                          </td>
                          <td>
                            <UcFirst text={elab.course.name} />
                          </td>
                          <td>
                            <UcFirst text={extractValue(elab)} />
                          </td>
                          <td>
                            <Link
                              to={elab.id + '/participants'}
                              className="btn btn-outline-primary btn-icon btn-sm mr-2"
                            >
                              <i className="feather-eye"></i>
                            </Link>
                          </td>
                          <td>
                              {elab.active ? (
                                <span className="badge badge-success">
                                  Active
                                </span>
                              ) : (
                                <span className="badge badge-danger">
                                  Inactive
                                </span>
                              )}
                            </td>
                          <td className="text-right">
                            {/* <Link
                              to={elab.id}
                              disabled
                              className="btn btn-outline-warning btn-icon btn-sm mr-2"
                            >
                              <i className="feather-eye"></i>
                            </Link> */}
                            <Link
                              to={`/student/elab/test-code/1/1/${elab.id}`}
                              className="btn btn-outline-primary btn-icon btn-sm mr-2"
                            >
                              <i className="feather-play"></i>
                            </Link>

                            <Link
                              to={elab.id + '/edit'}
                              className="btn btn-outline-primary btn-icon btn-sm mr-2"
                            >
                              <i className="feather-edit"></i>
                            </Link>

                            {/* <Toggle
                              id={elab.id}
                              isActive={elab.active}
                              onToggle={handleToggle}
                            /> */}
                            {/* <Link
                              to="#"
                              className="btn btn-outline-danger btn-icon btn-sm"
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
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
          </div>
        ) : (
          <div className="text-center mt-5 col-12">
            <div className="alert" role="alert">
              There are no elabs available at the moment.
            </div>
          </div>
        )}
      </div>
    </>
  );
}

Elabs.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Elabs;
