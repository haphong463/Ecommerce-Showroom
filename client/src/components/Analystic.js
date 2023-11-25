import {
  CategoryScale,
  Chart,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  maintainAspectRatio: false,
  responsive: true,
  animations: {
    tension: {
      duration: 1000,
      easing: "linear",
      from: 1,
      to: 0.4,
      loop: true,
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      label: "Looping tension",
      data: [65, 59, 80, 81, 26, 55, 40],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
    },
  ],
};

export const Analystic = () => {
  return (
    <div style={{ height: "50vh" }}>
      <Line options={options} data={data} />
    </div>
  );
};
