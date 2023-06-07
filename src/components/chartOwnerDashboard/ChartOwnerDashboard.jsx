import { useDispatch, useSelector } from "react-redux";
import { setOwnerInfoBookingApiCall } from "../../redux/apiCalls/bookingApiCall";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

function ChartOwnerDashboard() {
  const [chartData, setChartData] = useState({});
  const { OwnerHotelInfo } = useSelector((state) => state.hotels);
  useEffect(() => {
    if (OwnerHotelInfo) {
      let filteredData = OwnerHotelInfo[0]?.bookings;
      // Filter data based on date range

      const counts = {};
      filteredData.forEach((booking) => {
        const date = new Date(booking.createdAt).toDateString();
        if (counts[date]) {
          counts[date]++;
        } else {
          counts[date] = 1;
        }
      });

      const data = {
        xaxis: {
          categories: Object.keys(counts),
        },
        series: [
          {
            name: "Bookings",
            data: Object.values(counts),
          },
        ],
      };

      setChartData(data);
    }
  }, [OwnerHotelInfo]);

  const chartOptions = {
    chart: {
      id: "chartOwnerDashboard",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "20%",
      },
    },
    xaxis: {
      categories: chartData.xaxis ? chartData.xaxis.categories : [],
    },
  };

  return (
    <div>
      {chartData.series && chartData.series.length > 0 && (
        <Chart options={chartOptions} series={chartData.series} type="bar" />
      )}
    </div>
  );
}

export default ChartOwnerDashboard;
