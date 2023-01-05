import React from "react";
// import { Doughnut, Pie } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
function PieChart({ ChartData }) {
  return (
    <Pie
      datasetIdKey="id"
      data={ChartData}
      plugins={[ChartDataLabels]}
      options={{
        plugins: {
          legend: {
            display: true,
            position: "top",
            font: {
              size: "10",
            },
          },
          datalabels: {
            display: false,
          },
        },
      }}
    />
  );
}
export default PieChart;
