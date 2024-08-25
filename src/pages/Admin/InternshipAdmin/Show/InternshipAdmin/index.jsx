import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';

import Logo from '@/assets/images/logo-transparent.png';
import No_image from '@/assets/images/no_image.png';

import {
  ContentCardWrapper,
  ContentHeader,
  ContentLoader,
} from '@/components/common';
import { NavTab } from '@/components/admin/internship-admin';
import { getInternshipAdminData } from '@/api/admin';

function Show({ title }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const { internshipAdminId } = useParams();
  const [loading, setLoading] = useState(true);
  const [internshipAdminData, setInternshipAdminData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getInternshipAdminData(internshipAdminId);
        console.log("data", data);
        setInternshipAdminData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching academic admin data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [internshipAdminId]);

  return (
    <div className="px-2">
      <ContentHeader
        title={title}
        buttons={[
          {
            link: 'edit',
            text: 'Edit Internship Admin Details',
            iconClassName: 'feather-edit mr-2',
          },
        ]}
        backLink={'/admin/internship-admin'}
      />
      <NavTab internshipAdminId={internshipAdminId} />
      {loading && (
        <div className="row my-5">
          <ContentLoader />
        </div>
      )}
      {internshipAdminData && (
        <ContentCardWrapper>
          <div className="row">
            <div className="col-lg-3">
              <div className="mb-4 d-block w-100 rounded-lg  border-0 text-center">
                <figure className="avatar ml-auto mr-auto mb-0 w150 overflow-hidden">
                  <img
                    src={internshipAdminData?.image ? baseUrl + internshipAdminData?.image : No_image}
                    alt="avatar"
                    className="shadow-lg w-100 p-1"
                  />
                </figure>
                <h4 className="fw-700 font-xs my-3"> Image</h4>
                <figure className="avatar ml-auto mr-auto mb-0 w150 overflow-hidden">
                  <img
                    src={internshipAdminData?.logo ? baseUrl + internshipAdminData?.logo : No_image}
                    alt="avatar"
                    className="shadow-lg w-100 p-1"
                  />
                </figure>
                <h4 className="fw-700 font-xs my-3">Logo</h4>
                <h6 className="fw-700 font-xs my-3">Name: <u>{internshipAdminData?.name}</u></h6>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="row">
                <div className="col-lg-6 mb-3 border-bottom">
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">Legal Name: </span>{' '}
                      {internshipAdminData?.legal_name || 'N/A'}
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">Email: </span>{' '}
                      {internshipAdminData?.email || 'N/A'}
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">YOE: </span>{' '}
                      {internshipAdminData?.year_of_establishment || 'N/A'}
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">Address: </span>{' '}
                      {internshipAdminData?.address || 'N/A'}
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">Website: </span>{' '}
                      {internshipAdminData?.website_url || 'N/A'}
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 mb-3 border-bottom">
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">Accreditation: </span>{' '}
                      {internshipAdminData?.accreditation_no || 'N/A'}
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">Phone Number: </span>{' '}
                      {internshipAdminData?.phone_number || 'N/A'}
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">Location: </span>{' '}
                      {internshipAdminData?.city || 'N/A'} {internshipAdminData?.state}

                    </label>
                  </div>
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">Pincode: </span>{' '}
                      {internshipAdminData?.pincode || 'N/A'}
                    </label>
                  </div>

                </div>
                <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-12 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-500 font-xsss">
                      <span className="fw-600 ">Description: </span>{' '}
                      {internshipAdminData?.description || 'N/A'}
                    </label>
                  </div>
                </div>
              </div>
            </div>
              </div>
            </div>
         
          </div>
        </ContentCardWrapper>
      )}
    </div>
  );
}

Show.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Show;
