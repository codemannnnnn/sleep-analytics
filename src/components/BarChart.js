import React, { useEffect, useState } from "react";

import { Bar } from "react-chartjs-2";

export const BarChart = ({ temp, name }) => {
  const [labelData, setLabelData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    let labelArr = [];
    let dataArr = [];
    temp.map((e) => {
      let newTime = e[0].slice(11, 16);
      labelArr.push(newTime);
      dataArr.push(e[1]);
    });

    setLabelData(labelArr);
    setData(dataArr);
  }, [temp]);

  const chartdata = {
    labels: labelData,
    datasets: [
      {
        label: "",
        data: data,
        backgroundColor: ["dodgerblue", "lightblue", "skyblue", "magenta"],
        borderColor: ["black"],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      yAxes: {
        display: false,
      },
    },
  };

  return (
    <div>
      <div id="bar-chart">
        <h3>{name}</h3>
        <Bar data={chartdata} options={options} height={400} width={450} />
      </div>
    </div>
  );
};
