import PropTypes from 'prop-types';
import DefaultProfileImage from '@/assets/images/default/student.png';
import { ContentLoader } from '@/components/common';
import { formatDateTime, formatNumber } from '@/utils/helpers';

function Wallet({ studentData, walletData, walletLogs, loading }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const shareReferralCode = () => {
    navigator.clipboard.writeText(studentData.student_unique_code);
    alert('Referral code copied to clipboard!');
  };

  return (
    <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
      
      {loading ? (
        <div className="card-body p-lg-5 p-4 w-100 border-0">
          <div className="row">
            <ContentLoader />
          </div>
        </div>
      ) : (
        <>
          {walletData && (
            <div className="card-body p-lg-5 p-4 w-100 border-0">
              <div className="row">
                <div className="col-lg-5">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-4 border-0 text-center">
                      <a
                        href="/profile"
                        className="ml-auto mr-auto rounded-lg overflow-hidden d-inline-block"
                      >
                        <img
                          src={
                            studentData.profile_image
                              ? baseUrl + studentData.profile_image
                              : DefaultProfileImage
                          }
                          alt="avatar"
                          className="p-0 w100 shadow-xss"
                        />
                      </a>
                      <h4 className="fw-700 font-xs mt-3 mb-1">
                        {studentData.student_name}
                      </h4>
                      <div className="clearfix"></div>
                      <ul className="list-inline border-0 mt-4">
                        <li className="list-inline-item text-center">
                          <h4 className="fw-700 font-md">
                           Rs. {formatNumber(walletData.balance)}
                            <span className="font-xsssss fw-500 mt-1 text-grey-500 d-block">
                              Wallet Balance
                            </span>
                          </h4>
                        </li>
                      </ul>
                      <button
                        className="btn btn-outline-success btn-icon btn-sm "
                        onClick={shareReferralCode}
                      >
                        Share Referral Code
                      </button>
                      <p className="mt-2">{studentData.student_unique_code}</p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-7">
                  <div className="rounded-xxl bg-greylight h-100 p-3">
                    <table className="table rounded-10 table-admin mb-0">
                      <thead className="bg-greylight ovh">
                        <tr>
                          <th className="border-0" scope="col">
                            Date
                          </th>
                          <th className="border-0 text-center" scope="col">
                            Description
                          </th>
                          <th className="border-0 text-center" scope="col">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {walletLogs && walletLogs.length > 0 ? (
                          walletLogs.map((log, index) => (
                            <tr key={index}>
                              <td>         {formatDateTime(log.created_at)}</td>
                              <td className="text-center">{log.type}</td>
                              <td className="text-center">
                                Rs. {formatNumber(log.amount)}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td className="text-center" colSpan="3">
                              No wallet logs available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    <div className="col-lg-12 mt-5">
                      <div className="row"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

Wallet.propTypes = {
  studentData: PropTypes.shape({
    student_name: PropTypes.string,
    profile_image: PropTypes.string,
    auth_id: PropTypes.string,
  }).isRequired,
  walletData: PropTypes.shape({
    balance: PropTypes.string,
  }).isRequired,
  walletLogs: PropTypes.arrayOf(
    PropTypes.shape({
      created_at: PropTypes.string,
      type: PropTypes.string,
      amount: PropTypes.string,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Wallet;
