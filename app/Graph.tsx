import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import unFormatTime from "../constants/unFormatTime";

interface Props {
  times: time[];
  averages: any[];
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Graph({ times }: Props) {
  const timeData = times.map((time) => unFormatTime(time.time)).reverse();
  const ao5Data: any[] = [];

  const data = {
    labels: Array.from({ length: times.length }, (v, k) => k + 1),
    datasets: [
      {
        label: "Times",
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        data: timeData,
        fill: false,
      },
      {
        label: "Ao5",
        borderColor: "rgb(37 99 235)",
        backgroundColor: "rgba(37 99 235, 0.5)",
        data: ao5Data,
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        max: 500,
      },
      y: {
        max: Math.ceil(Math.max(...timeData) + 1),
      },
    },
    maintainAspectRatio: false,
  };

  return <Line data={data} options={options} />;
}

export default Graph;
