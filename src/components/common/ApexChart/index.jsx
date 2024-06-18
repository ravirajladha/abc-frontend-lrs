import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';

const ApexChart = ({
  seriesData,
  optionsData,
  colorsData = ['#25D366', '#FEC794'],
}) => {
  const defaultOptions = {
    chart: {
      type: 'donut',
    },
    labels: ['Started Videos', 'Pending Videos'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 220,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  const options = {
    ...defaultOptions,
    ...optionsData,
    colors: colorsData,
  };

  return (
    <div className="card w-100 border-0 rounded-10 bg-white overflow-hidden">
      <div id="chart">
        <ReactApexChart
          options={options}
          series={seriesData}
          type="donut"
          width={400}
        />
      </div>
    </div>
  );
};

ApexChart.propTypes = {
  seriesData: PropTypes.array.isRequired,
  optionsData: PropTypes.object,
  colorsData: PropTypes.array,
};

export default ApexChart;
