import { useState, useEffect } from 'react';
import { fetchTrainers } from '@/api/internshipAdmin';
import { Link } from 'react-router-dom';

import {
  ContentDisplayModal,
  ContentHeader,
  ContentLoader,
} from '@/components/common';

function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrainers()
      .then((data) => {
        setTrainers(data.trainers);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <ContentHeader
        title="All"
        subtitle="Trainers"
        buttons={[
          {
            link: 'create',
            text: 'New Trainer',
          },
        ]}
      />
      <div className="row">
        {loading ? (
          <div className="text-center col-12">
            <ContentLoader />
          </div>
        ) : trainers && trainers.length > 0 ? (
          <div className="col-lg-12">
            <div className="card border-0 mt-0 rounded-lg shadow-xs">
              <div className="card-body d-flex px-4 pt-4 pb-0">
                <h4 className="font-xss text-grey-700"></h4>
              </div>
              <div className="card-body p-4">
                <div className="table-responsive">
                  <table className="table table-admin mb-0 ">
                    <thead className="bg-greylight rounded-10 ovh border-0">
                      <tr>
                        <th className="border-0" width="4%">
                          #
                        </th>
                        <th className="border-0" width="10%">
                          Name
                        </th>
                        <th className="border-0" width="10%">
                          Phone Number
                        </th>
                        <th className="border-0" width="10%">
                          Email
                        </th>
                        {/* <th className="border-0" width="15%">
                          Subject
                        </th> */}
                        <th className="border-0" width="15%">
                          Subject - Course
                        </th>
                        <th className="border-0 text-right" width="20%">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {trainers.map((trainer, index) => (
                        <tr key={trainer.id}>
                          <td>{index + 1}</td>
                          <td>{trainer.name}</td>
                          <td>{trainer.phone_number}</td>
                          <td>{trainer.email}</td>
                          {/* <td>
                            {trainer.trainer_subjects.length > 0 ? (
                              trainer.trainer_subjects.map((item) => (
                                <span key={item.id}>
                                  {item.subject_name} &nbsp;
                                </span>
                              ))
                            ) : (
                              <span>Not assigned</span>
                            )}
                          </td> */}
                          <td>
                            {trainer.trainer_courses.length > 0 ? (
                              trainer.trainer_courses.map((item) => (
                                <span key={item.id}>
                                  {item.subject_name} - {item.course_name} &nbsp;
                                </span>
                              ))
                            ) : (
                              <span>Not assigned</span>
                            )}
                          </td>

                          <td className="text-right">
                            <Link
                              to={`${trainer.auth_id}/show`}
                              className="btn btn-outline-warning btn-icon btn-sm mr-2"
                            >
                              <i className="feather-eye"></i>
                            </Link>
                            <Link
                              to={`${trainer.auth_id}/edit`}
                              className="btn btn-outline-info btn-icon btn-sm mr-2"
                            >
                              <i className="feather-edit"></i>
                            </Link>
                            {/* <Link
                              to={`${trainer.auth_id}/assign`}
                              className="btn btn-outline-success btn-icon btn-sm"
                            >
                              <i className="feather-airplay"></i>
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
              There are no trainers available at the moment.
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Trainers;
