import React, { memo, useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

import {
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  TimeScale,
  TimeSeriesScale,
  ArcElement,
} from "chart.js";
import { getCustomer } from "../Customer/CustomerLibrary";
import { getVehicles } from "../Vehicle/VehicleLibrary";
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  TimeScale, // Đăng ký time scale
  TimeSeriesScale,
  ArcElement // Đăng ký time series scale
);

const ChartUserVehicle = memo(({ accounts }) => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Fetch vehicle data
    getVehicles().then((vehicleData) => {
      setVehicles(vehicleData);
    });
  }, []);
  const totalUsers = accounts.length; // Assuming each account represents a user
  const totalProducts = vehicles.length; // Assuming each vehicle represents a product

  const pieChartData = {
    labels: ["User Count", "Vehicle Count"],
    datasets: [
      {
        data: [totalUsers, totalProducts],
        backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const optionsForPieChart = {
    maintainAspectRatio: false,
  };
  return (
    <div style={{ width: "100%" }}>
      <div style={{ height: "50vh" }}>
        <Doughnut options={optionsForPieChart} data={pieChartData} />
      </div>
    </div>
  );
});

export default ChartUserVehicle;
