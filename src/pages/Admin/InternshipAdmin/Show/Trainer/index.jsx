import React, { useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';

import {
  ContentCardWrapper,
  ContentHeader,
  ContentLoader,
} from '@/components/common';

import { NavTab } from '@/components/admin/internship-admin';
import { getTrainers } from '@/api/admin';

function Trainer() {
  const { internshipAdminId } = useParams();

  const [loading, setLoading] = useState(true);
  const [trainers, setTrainers] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTrainers(internshipAdminId);
        setTrainers(data.trainers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching academic admin trainers:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [internshipAdminId]);

  return (
    <div className="px-2">
      <ContentHeader
        title="Trainers"
        buttons={[
          {
            link: `/admin/internshipAdmins/${internshipAdminId}/edit`,
            text: 'Edit internship Admin Details',
            iconClassName: 'feather-edit mr-2',
          },
        ]}
        backLink={'/admin/internshipAdmins'}
      />
      <NavTab internshipAdminId={internshipAdminId} />
      {loading ? (
        <div className="my-5">
          <ContentLoader />
        </div>
      ) : trainers && trainers.length > 0 ? (
        <ContentCardWrapper>
          <div className="row">
            <div className="col-12">
              <h4 className="font-xss text-grey-700 mb-4">Trainers List</h4>
              <div className="table-responsive">
                <table className="table table-admin mb-0 ">
                  <thead className="bg-greylight rounded-10 ovh border-0">
                    <tr>
                      <th className="border-0">#</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Phone Number</th>
                      <th className="border-0">Class</th>
                      <th className="border-0">Subject</th>
                      <th className="border-0">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trainers.map((trainer, index) => (
                      <tr key={trainer.id}>
                        <td>{index + 1}</td>
                        <td>{trainer.name}</td>
                        <td>{trainer.phone_number}</td>
                        <td>
                          {trainer.trainer_classes &&
                          trainer.trainer_classes?.length > 0 ? (
                            trainer.trainer_classes?.map((item) => (
                              <span key={item.id}>{item.class_name} </span>
                            ))
                          ) : (
                            <>
                              <p className="text-center">-</p>
                            </>
                          )}
                        </td>
                        <td>
                          {trainer.trainer_subjects &&
                          trainer.trainer_subjects?.length > 0 ? (
                            trainer.trainer_subjects?.map((item) => (
                              <span key={item.id}>{item.subject_name} </span>
                            ))
                          ) : (
                            <>
                              <p className="text-center">-</p>
                            </>
                          )}
                        </td>
                        <td>{trainer.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </ContentCardWrapper>
      ) : (
        <div className="text-center mt-5 col-12">
          <div className="alert" role="alert">
            There are no trainers available at the moment.
          </div>
        </div>
      )}
    </div>
  );
}

export default Trainer;
