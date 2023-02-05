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
import unFormatTime from "../../constants/unFormatTime";

interface Props {
  times: time[];
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
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
}

export default Graph;
