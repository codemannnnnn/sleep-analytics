import React, { useEffect, useState } from "react";

import { Scatter } from "react-chartjs-2";

// //import config for standard options
// import { options } from "../options.js";

export const ScatterChart = ({ name, data, height, width, footer }) => {
  const [dataset, setDataset] = useState([]);

  //side effect to handle the incoming data, sort it out, push it to temp array and set the state.
  //dependency array to include prop changes to state
  useEffect(() => {
    let dataArr = [];
    data.forEach((e) => {
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
      <Scatter
        data={chartdata}
        options={options}
        height={height}
        width={width}
      />
      <br />
      <p>{footer}</p>
    </div>
  );
};
