import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);

const BarChart = ({ chartData }: any) => {
  return <Bar data={chartData} />;
};

export default BarChart;
