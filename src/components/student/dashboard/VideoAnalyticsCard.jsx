import ApexChart from '@/components/common/ApexChart';

function VideoAnalyticsCard({ stats }) {
  return (
    <>
      <h4 className="font-xs text-grey-800 my-3 lh-22 fw-700">Statistics</h4>
      <div className="row">
        {stats &&
          stats.map((item) => (
            <div className="col-xl-4 col-md-6" key={item.subject_id}>
              <div className="card bg-white pb-2 shadow-md border-0">
              <ApexChart
                seriesData={[
                  item.started_video_count,
                  item.total_video_count - item.started_video_count,
                ]}
                colorsData={['#25d366', '#dc3545']}
              />
              <h4 className="font-xss text-grey-800 mt-1 lh-22 fw-600  ml-7">
                {item.subject_name}
              </h4>
              </div>
              
            </div>
          ))}
      </div>
    </>
    // <div className="card w-100 p-1 border-0 mt-4 rounded-lg bg-white shadow-xs overflow-hidden">
    //   <div className="card-body">

    //   </div>
    // </div>
  );
}

export default VideoAnalyticsCard;
