import PropTypes from 'prop-types';

function RankCard({ reportData }) {
  const ranks = null;
  return (
    <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
      <div className="card-header p-4 w-100 border-0 d-flex rounded-lg  bg-current">
        <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">My Ranks</h4>
      </div>
      {reportData && (
        <div className="card-body p-lg-5 p-4 w-100 border-0 mb-0">
          <div className="row">
            <div className="col-6">
              <div className="item w-100 h50 bg-blue-gradiant rounded-xxl overflow-hidden text-left shadow-md pl-3 pt-3 align-items-end d-flex">
                <h4 className="text-white font-xxl fw-700 mont-font mb-3 ">
                  <span className="d-block fw-500 text-white font-xss mt-1">
                    Subject Rank
                  </span>
                  {reportData?.class_rank ? reportData?.class_rank : '-'}
                </h4>
              </div>
            </div>
            {/* <div className="col-6">
              <div className="item w-100 h50 bg-red-gradiant rounded-xxl text-left shadow-md pl-3 pt-3 align-items-end d-flex">
                <h4 className="text-white mb-3 font-xxl fw-700 mont-font">
                  <span className="d-block fw-500 text-grey-300 font-xss mt-1">
                    Section Rank
                  </span>
                  {reportData?.section_rank ? reportData?.section_rank : '-'}
                </h4>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}

RankCard.propTypes = {
  reportData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default RankCard;
