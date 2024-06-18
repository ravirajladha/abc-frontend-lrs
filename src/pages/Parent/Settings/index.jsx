import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import {
  ChangePasswordForm,
  ContentCardWrapper,
  ContentLoader,
  ContentHeader,
} from '@/components/common';

import { updateSettings, fetchParentInfo, fetchChildren } from '@/api/parent';
import { getUserDataFromLocalStorage } from '@/utils/services';
import { Link } from 'react-router-dom';

function Settings({ title }) {
  const [parentData, setParentData] = useState({});
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [loading, setLoading] = useState(true);
  const [validationErrors, setValidationErrors] = useState({});
  const [childrenList, setChildrenList] = useState(null);

  const userData = JSON.parse(getUserDataFromLocalStorage());

  const parentId = userData.id;

  const fetchParentDetails = useCallback(async () => {
    fetchParentInfo(parentId)
      .then((data) => {
        if (data) {
          setParentData(data.parent);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  }, []);

  useEffect(() => {
    fetchParentDetails();
  }, [fetchParentDetails]);

  const fetchChildrenDropdown = useCallback(async () => {
    try {
      const data = await fetchChildren(parentId);
      setChildrenList(data.children);
      console.log(data.children);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [parentId]);

  useEffect(() => {
    fetchChildrenDropdown();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'confirmPassword') {
      setPasswordMatch(value === formData.password);
    } else if (name === 'password') {
      setPasswordMatch(value === formData.confirmPassword);
    }
  };

  const handleUpdateClick = async (event) => {
    event.preventDefault();
    try {
      const response = await updateSettings(parentId, formData);
      toast.success(response.message);
      setValidationErrors({});
    } catch (error) {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      }
      toast.error(error.message);
    } finally {
      setFormData({ password: '', confirmPassword: '' });
    }
  };

  return (
    <div>
      <ContentHeader title={title} 
      buttons={[
        {
          link: `student/create`,
          text: 'New Student',
        },
      ]}/>
      {loading ? (
        <ContentLoader />
      ) : (
        <>
          <ContentCardWrapper>
            <div className="row">
              <div className="col-12">
                <h2 className="text-grey-800  text-center font-md mb-0">
                  Your{' '}
                  <span className="fw-600 text-grey-800">
                    Unique Parent Code: {parentData?.parent_code}
                  </span>
                </h2>
              </div>
            </div>
          </ContentCardWrapper>
          {childrenList &&
            (childrenList.length > 0 ? (
              <div className="row">
                <div className="col-lg-12">
                  <div className="card border-0 mt-0 rounded-lg shadow-md mb-4">
                    <div className="card-body d-flex pt-4 px-4 pb-0">
                      <h4 className="font-xss text-grey-800 mt-3 fw-700">
                        Children list
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
                                Name
                              </th>
                              <th className="border-0" scope="col">
                                User id
                              </th>
                              <th className="border-0" scope="col">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {childrenList.map((children, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{children.name}</td>
                                <td>{children.username}</td>
                                <td>
                                  <Link
                                    to={'/parent/dashboard/student/' + children.id}
                                    className="btn bg-current text-center text-white font-xsss fw-500 p-1 rounded-lg border-0"
                                  >
                                    View Profile
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
              <> </>
            ))}
        </>
      )}
      <ChangePasswordForm
        formData={formData}
        validationErrors={validationErrors}
        passwordMatch={passwordMatch}
        onInputChange={handleInputChange}
        onUpdateClick={handleUpdateClick}
      />
    </div>
  );
}

Settings.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Settings;
