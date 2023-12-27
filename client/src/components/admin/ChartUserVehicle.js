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
  TimeScale,
  TimeSeriesScale,
  ArcElement
);

const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const ChartUserVehicle = memo(({ accounts, vehicles, orders }) => {
  const totalUsers = accounts.length; // Assuming each account represents a user
  const totalProducts = vehicles.length; // Assuming each vehicle represents a product
  const totalOrders = orders.length;

  const pieChartData = {
    labels: ["User", "Vehicle", "Order"],
    datasets: [
      {
        data: [totalUsers, totalProducts, totalOrders],
        backgroundColor: [
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
        ],
        borderColor: [
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
        ],
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
