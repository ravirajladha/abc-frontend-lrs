import { useCallback, useEffect, useState } from 'react';

import {
  ContentCardWrapper,
  ContentFallback,
  ContentHeader,
  ContentLoader,
} from '@/components/common';

import { fetchParentInfo } from '@/api/parent';
import { getUserDataFromLocalStorage } from '@/utils/services';

import DefaultProfileImage from '@/assets/images/default/user.png';

function Profile() {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const userData = JSON.parse(getUserDataFromLocalStorage());
  const parentId = userData.id;

  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchDashboardItems = useCallback(async () => {
    fetchParentInfo(parentId)
      .then((data) => {
        if (data) {
          setProfile(data.parent);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, []);

  useEffect(() => {
    fetchDashboardItems();
  }, [fetchDashboardItems]);

  return (
    <>
      <ContentHeader title="Profile" />
      <ContentCardWrapper>
        {loading ? (
          <ContentLoader />
        ) : (
          <>
            {profile && (
              <div className="row">
                <div className="col-lg-3">
                  <div className="mb-4 d-block w-100 border-0 text-center">
                    <figure className="avatar rounded-circle shadow-md ml-auto mr-auto mb-0 w100 overflow-hidden">
                      <img
                        src={
                          profile?.profile_image
                            ? baseUrl + profile?.profile_image
                            : DefaultProfileImage
                        }
                        alt="avatar"
                        className="w-100 mt-2"
                      />
                    </figure>
                    <h4 className="fw-700 font-xs my-3">{profile?.name}</h4>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="row">
                    <div className="col-lg-6 mb-3 border-bottom">
                      <div className="form-group">
                        <label className="mont-font fw-500 font-xsss">
                          <span className="fw-600 ">Name: </span>{' '}
                          {profile?.name}
                        </label>
                      </div>
                      <div className="form-group">
                        <label className="mont-font fw-500 font-xsss">
                          <span className="fw-600 ">Email: </span>{' '}
                          {profile?.email}
                        </label>
                      </div>

                      {/* <div className="form-group">
                        <label className="mont-font fw-500 font-xsss">
                          <span className="fw-600 ">Address: </span>{' '}
                          {profile?.address}
                        </label>
                      </div> */}
                    </div>
                    <div className="col-lg-6 mb-3 border-bottom">
                      <div className="form-group">
                        <label className="mont-font fw-500 font-xsss">
                          <span className="fw-600 ">ID: </span>{' '}
                          {profile?.username}
                        </label>
                      </div>
                      <div className="form-group">
                        <label className="mont-font fw-500 font-xsss">
                          <span className="fw-600 ">Phone Number: </span>{' '}
                          {profile?.phone_number}
                        </label>
                      </div>
                      {/* <div className="form-group">
                        <label className="mont-font fw-500 font-xsss">
                          <span className="fw-600 ">Pincode: </span>{' '}
                          {profile?.pincode}
                        </label>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="col-lg-3"></div>
                <div className="col-lg-9">
                  {profile?.children && (profile?.children.length > 0) ? (
                    <div className="table-responsive ">
                      <table className="table table-bordered mb-4">
                        <thead>
                          <th>Student</th>
                          <th>Class</th>
                        </thead>
                        <tbody>
                          {profile?.children?.map((child) => (
                            <tr key={child.id}>
                              <td>{child.name}</td>
                              <td>
                                {child.class} Section {child.section}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <ContentFallback message="No children connected."/>
                  )}
                </div>
              </div>
            )}
            {error && <ContentFallback message={error.message} />}
          </>
        )}
      </ContentCardWrapper>
    </>
  );
}

export default Profile;
