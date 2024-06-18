import React, { useState, useEffect } from 'react';
import { ContentFallback, ContentHeader } from '@/components/common';
import { fetchOldApplicationById } from '@/api/school';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

function Print() {
  const { applicationId } = useParams();
  const [loading, setLoading] = useState(true);

  const [application, setApplication] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetchOldApplicationById(applicationId);
      setApplication(response.application);
      ;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData()
      .then(() => {
        // Set the title of the page
        document.title = `Application - ${applicationId}`;
        // Trigger print
        window.print();
      })
      .catch((error) => {
        // Handle error if needed
        console.error('Error fetching application:', error);
      });
  }, [applicationId]);
  return (
    <div>
      <ContentHeader
        title="Application"
        subtitle="Details"
        buttons={[
          {
            link: `print-applications`,
            text: 'Print',
          },
        ]}
      />
      <div className="row">
        {application && application ? (
          <div className="col-lg-10 pt-0 my-3 mx-auto">
            <div className="card w-100 border-0 bg-white p-0 px-5 mt-3">
              <div className="row">
                <div className="col-3">
                  <img
                    src="/assets/images/abc_logo.jpg"
                    alt="icon"
                    className="p-1"
                    width={200}
                  />
                </div>
                <div className="col-9">
                  <h2 className="fw-400 font-xl d-block ml-5">
                    <b>AGASTHYA VIDYANIKETHAN</b>
                  </h2>
                  <p className="fw-500 font-xs d-block float-right mr-5">
                    Branch: {application.branch ?? '___________________'}
                  </p>
                </div>
                <div className="row mt-4">
                  <div className="col-12">
                    <h2 className="fw-400 font-xs d-block text-center mb-2">
                      <b>Application For Admission</b>
                    </h2>
                  </div>
                  <div className="col-6">
                    <p className="fw-500 font-xs d-block mb-2">
                      Academic Year: 2024 - 2025
                    </p>
                    <p className="fw-500 font-xs d-block  mb-2">
                      Admission for Class:{' '}
                      {application.class_expected_in_2024_25 ??
                        '___________________'}
                    </p>
                    <p className="fw-500 font-xs d-block  mb-2">
                      STS No:___________________
                    </p>
                    <p className="fw-500 font-xs d-block  mb-2">
                      Admission No : {application.id ?? '___________________'}
                    </p>
                  </div>
                  <div className="col-6 d-flex flex-column align-items-end">
                    <div
                      style={{
                        width: '150px',
                        height: '150px',
                        border: '1px solid #000',
                      }}
                      className="text-center"
                    >
                      <p className="fw-400 font-xs d-block">
                        Affix 1 <br /> passport size <br /> photograph of <br />{' '}
                        the student{' '}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-12">
                    <h2 className="fw-400 font-xs d-block text-center mb-2">
                      <b>STUDENT PROFILE</b>
                    </h2>
                  </div>
                  <div className="col-lg-12">
                    <p className="fw-500 font-xs d-block mb-2 text-uppercase">
                      Full Name of the Child (in capital) :{' '}
                      {application.student_name ?? '___________________'}
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="fw-500 font-xs d-block mb-2">
                      Pet Name : {'___________________'}
                    </p>
                    <p className="fw-500 font-xs d-block  mb-2">
                      Aadhar Card No : {'___________________'}
                    </p>
                    <p className="fw-500 font-xs d-block  mb-2">
                      Mother tongue : {'___________________'}
                    </p>
                    <p className="fw-500 font-xs d-block  mb-2">
                      Religion : {'___________________'}
                    </p>
                    <p className="fw-500 font-xs d-block  mb-2">
                      Blood Group : {'___________________'}
                    </p>
                  </div>

                  <div className="col-6">
                    <p className="fw-500 font-xs d-block mb-2">
                      Date of Birth :{' '}
                      {application.dob
                        ? moment(application.dob).format('DD/MM/YYYY')
                        : '___________________'}
                    </p>
                    <p className="fw-500 font-xs d-block  mb-2">
                      {/* Sex : {application.student_gender === 'Male' ? 'M ☑  F ☐' : 'M ☐  F ☑'} */}
                      Sex : {'___________________'}
                    </p>
                    <p className="fw-500 font-xs d-block  mb-2">
                      Nationality : {'___________________'}
                    </p>
                    <p className="fw-500 font-xs d-block  mb-0">
                      Caste : {'___________________'}
                    </p>
                    <p className="fw-400 font-xsss">
                      (it is a govt. requirement){' '}
                    </p>
                  </div>
                  <div className="col-lg-12">
                    <p className="fw-500 font-xs d-block  mb-2">
                      Last School Attended (if any) : {'___________________'}
                    </p>
                  </div>
                  <div className="col-lg-12">
                    <p className="fw-500 font-xss d-block  mb-2">
                      List any special problems that your child may have, such
                      as allergies, existing illness, previous serious illness,
                      injuries and hospitalizations during the past 12 months,
                      any medication prescribed long-term continuous, and any
                      other information which the school should be aware of:{' '}
                      <br />
                      {'___________________________________________'}
                    </p>
                  </div>
                </div>

                <div className="row mt-3 ">
                  <div className="col-12">
                    <h2 className="fw-400 font-xs d-block text-center mb-2">
                      <b>PARENT PROFILE</b>
                    </h2>
                  </div>

                  <div className="col-6 border-right border-dark">
                    <p className="fw-500 font-xs d-block mb-2 text-center">
                      <b>Father</b>
                    </p>
                    <p className="fw-500 font-xs d-block mb-2">
                      Name : {application.f_name || '___________________'}
                    </p>
                    <p className="fw-500 font-xs d-block  mb-2">
                      Qualification : {'___________________'}
                    </p>
                    <p className="fw-500 font-xs d-block  mb-2">
                      Designation : {'___________________'}
                    </p>
                    <p className="fw-500 font-xs d-block  mb-2">
                      Mobile No :{' '}
                      {application.f_contact ?? '___________________'}
                    </p>
                    <p className="fw-500 font-xs d-block  mb-2">
                      Aadhar Card No : {'___________________'}
                    </p>
                    <p className="fw-500 font-xs d-block  mb-2">
                      Company : {'___________________'}
                    </p>
                    <p className="fw-500 font-xs d-block  mb-2">
                      Annual Income : {'___________________'}
                    </p>
                    <p className="fw-500 font-xs d-block  mb-2">
                      Office Tel No : {'___________________'}
                    </p>
                    <p className="fw-500 font-xs d-block  mb-2">
                      Blood Group : {'___________________'}
                    </p>
                    <p className="fw-500 font-xs d-block  mb-2">
                      E-mail : {'___________________'}
                    </p>
                  </div>

                  <div className="col-6">
                    <p className="fw-500 font-xs d-block mb-2 text-center">
                      <b>Mother</b>
                    </p>
                    <p className="fw-500 font-xs d-block mb-2">
                      Name : {application.m_name || '___________________'}
                    </p>
                    <p className="fw-500 font-xs d-block  mb-2">
                      Qualification : {'___________________'}
                    </p>
                    <p className="fw-500 font-xs d-block  mb-2">
                      Designation : {'___________________'}
                    </p>
                    <p className="fw-500 font-xs d-block  mb-2">
                      Mobile No :{' '}
                      {application.m_contact || '___________________'}
                    </p>
                    <p className="fw-500 font-xs d-block  mb-2">
                      Aadhar Card No : {'___________________'}
                    </p>
                    <p className="fw-500 font-xs d-block  mb-2">
                      Company : {'___________________'}
                    </p>
                    <p className="fw-500 font-xs d-block  mb-2">
                      Annual Income : {'___________________'}
                    </p>
                    <p className="fw-500 font-xs d-block  mb-2">
                      Office Tel No : {'___________________'}
                    </p>
                    <p className="fw-500 font-xs d-block  mb-2">
                      Blood Group : {'___________________'}
                    </p>
                    <p className="fw-500 font-xs d-block  mb-2">
                      E-mail : {'___________________'}
                    </p>
                  </div>
                  <div className="col-lg-12">
                    <p className="fw-500 font-xs d-block  mb-2">
                      Residential address : {'___________________'}
                    </p>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-12">
                    <h2 className="fw-400 font-xs d-block text-center mb-2">
                      <b>Emergency contact person (other than parents above)</b>
                    </h2>
                  </div>
                  <div className="col-6">
                    <p className="fw-500 font-xs d-block mb-2">
                      Relatives Name : {'___________________'}
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="fw-500 font-xs d-block  mb-2">
                      Tel No : {'___________________'}
                    </p>
                  </div>
                  <div className="col-lg-12">
                    <p className="fw-500 font-xs d-block  mb-2">
                      Relationship with the child : {'___________________'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <ContentFallback />
        )}
      </div>
    </div>
  );
}

export default Print;
