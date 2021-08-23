import React, { useEffect, useState } from "react";

import { Scatter } from "react-chartjs-2";

export const ScatterChart = ({ name, data }) => {
  const [dataset, setDataset] = useState([]);

  useEffect(() => {
    let labArr = [];
    let dataArr = [];

    data.map((e) => {
      let newTime = e[0].slice(11, 16);
      dataArr.push({
        x: parseInt(newTime),
        y: e[1],
      });
    });

    setDataset(dataArr);
  }, [data]);

  const chartdata = {
    labels: "labelData",
    datasets: [
      {
        label: "",
        data: dataset,
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
      <h3>{name}</h3>
      <Scatter data={chartdata} options={options} height={400} width={450} />
    </div>
  );
};
