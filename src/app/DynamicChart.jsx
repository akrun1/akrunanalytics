"use client";

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
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

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DynamicChart = () => {
  // Initialize with default empty arrays to avoid errors during the initial render
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    // Simulated API call (replace with your actual API call if needed)
    const fetchWeatherData = async () => {
      try {
        // For demonstration, using dummy data:
        const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const temperatures = [20, 22, 18, 25, 24, 19, 21];

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Temperature Forecast (°C)",
              data: temperatures,
              borderColor: "rgba(75,192,192,1)",
              backgroundColor: "rgba(75,192,192,0.2)",
              fill: true,
              tension: 0.4,
            },
          ],
        });

        setChartOptions({
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "7-Day Weather Forecast",
            },
          },
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div className="bg-zinc-800 p-6 rounded-2xl">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default DynamicChart;
