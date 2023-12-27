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
import "chartjs-adapter-date-fns";
import { useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { getOrder } from "../SalesOrder/SaleOrderLibrary";
import { getCustomer } from "../Customer/CustomerLibrary";
import { getVehicles } from "../Vehicle/VehicleLibrary";
import { TextField } from "@mui/material";
import { getPurchaseOrder } from "../Order/PurchaseOrderLibrary";

// Đăng ký các thành phần cần thiết
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

export const options = {
  maintainAspectRatio: false,
  animations: {
    tension: {
      duration: 1000,
      easing: "linear",
      from: 1,
      to: 0.4,
      loop: true,
    },
  },
  scales: {
    x: {
      type: "timeseries", // Sử dụng timeseries thay vì time
      time: {
        unit: "day",
        displayFormats: {
          day: "MMM dd", // Sử dụng "MMM dd" để định dạng ngày
        },
      },
    },
  },
};

export const Analystic = ({ orders, vehicles, purchaseOrders }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleChangeSelectedYear = (event) => {
    const year = parseInt(event.target.value, 10);
    setSelectedYear(year);
  };

  const getOrderCountAndTotalPriceByMonthInYear = () => {
    const orderCount = {};
    const orderTotalPrice = {};
    const allMonths = Array.from({ length: 12 }, (_, i) => i + 1);

    allMonths.forEach((month) => {
      orderCount[month] = 0;
      orderTotalPrice[month] = 0;
    });

    orders.forEach((order) => {
      if (order.orderDate) {
        const orderYear = new Date(order.orderDate).getFullYear();
        const orderMonth = new Date(order.orderDate).getMonth() + 1;

        if (orderYear === selectedYear) {
          orderCount[orderMonth] += 1;
          orderTotalPrice[orderMonth] += order.totalPrice; // Assuming totalPrice property exists in your order object
        }
      }
    });

    return {
      orderCount: Object.entries(orderCount),
      orderTotalPrice: Object.entries(orderTotalPrice),
    };
  };

  const { orderCount, orderTotalPrice } =
    getOrderCountAndTotalPriceByMonthInYear();

  const mixedChartDataByMonthInYear = {
    labels: orderCount.map(([month]) => month),
    datasets: [
      {
        label: "Order Count",
        data: orderCount.map(([, count]) => count),
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        type: "line",
        yAxisID: "count",
      },
      {
        label: "Total Order Price",
        data: orderTotalPrice.map(([, totalPrice]) => totalPrice),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        type: "bar",
        yAxisID: "price",
      },
    ],
  };

  const optionsForMixedChart = {
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "category",
      },
      count: {
        type: "linear",
        position: "left",
        title: {
          display: true,
          text: "Order Count",
        },
      },
      price: {
        type: "linear",
        position: "right",
        title: {
          display: true,
          text: "Total Order Price",
        },
      },
    },
    elements: {
      line: {
        tension: 0.4, // Adjust this value for smoother or sharper lines
      },
    },
  };

  const getPurchaseOrderCountAndTotalPriceByMonthInYear = () => {
    const purchaseOrderCount = {};
    const purchaseOrderTotalPrice = {};
    const allMonths = Array.from({ length: 12 }, (_, i) => i + 1);

    allMonths.forEach((month) => {
      purchaseOrderCount[month] = 0;
      purchaseOrderTotalPrice[month] = 0;
    });

    purchaseOrders.forEach((order) => {
      console.log(order);
      if (order.orderDate) {
        const orderYear = new Date(order.orderDate).getFullYear();
        const orderMonth = new Date(order.orderDate).getMonth() + 1;

        if (orderYear === selectedYear) {
          purchaseOrderCount[orderMonth] += 1;

          // Calculate total purchase order price by multiplying purchasePrice with quantity
          const vehicle = vehicles.find((v) => v.vehicleID === order.vehicleId);
          console.log(vehicle);
          const purchasePrice = vehicle ? vehicle.purchasePrice : 0;
          purchaseOrderTotalPrice[orderMonth] += purchasePrice * order.quantity;
        }
      }
    });

    return {
      purchaseOrderCount: Object.entries(purchaseOrderCount),
      purchaseOrderTotalPrice: Object.entries(purchaseOrderTotalPrice),
    };
  };

  const { purchaseOrderCount, purchaseOrderTotalPrice } =
    getPurchaseOrderCountAndTotalPriceByMonthInYear();

  const mixedChartDataForPurchaseOrder = {
    labels: purchaseOrderCount.map(([month]) => month),
    datasets: [
      {
        label: "Purchase Order Count",
        data: purchaseOrderCount.map(([, count]) => count),
        borderColor: "red",
        borderWidth: 2,
        type: "line",
        yAxisID: "count",
      },
      {
        label: "Total Purchase Order Price",
        data: purchaseOrderTotalPrice.map(([, totalPrice]) => totalPrice),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        type: "bar",
        yAxisID: "price",
      },
    ],
  };
  console.log(purchaseOrderTotalPrice.map(([, totalPrice]) => totalPrice));
  const optionsForMixedChartForPurchaseOrder = {
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "category",
      },
      count: {
        type: "linear",
        position: "left",
        title: {
          display: true,
          text: "Purchase Order Count",
        },
      },
      price: {
        type: "linear",
        position: "right",
        title: {
          display: true,
          text: "Total Purchase Order Price",
        },
      },
    },
    elements: {
      line: {
        tension: 0.4, // Adjust this value for smoother or sharper lines
      },
    },
  };
  return (
    <div>
      <div>
        <TextField
          label="Year"
          type="number"
          id="selectedYear"
          value={selectedYear}
          onChange={handleChangeSelectedYear}
        />
      </div>
      <div>
        <div style={{ width: "100%" }}>
          <div style={{ height: "50vh" }}>
            <Bar
              options={optionsForMixedChart}
              data={mixedChartDataByMonthInYear}
            />
          </div>
        </div>
      </div>
      <div>
        <div style={{ width: "100%" }}>
          <div style={{ height: "50vh" }}>
            <Bar
              options={optionsForMixedChartForPurchaseOrder}
              data={mixedChartDataForPurchaseOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
