import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

export const TimeSeriesGauge = ({ name, tnt, height, width, footer }) => {
  const [labelData, setLabelData] = useState([]);
  const [data, setData] = useState([]);

  //side effect to handle the incoming data, sort it out, push it to temp array and set the state.
  //dependency array to include prop changes to state
  useEffect(() => {
    let labelArr = [];
    let dataArr = [];
    tnt[0].timeseries.tnt.forEach((e) => {
      let newTime = e[0].slice(11, 16);
      labelArr.push(newTime);
      dataArr.push(e[1]);
    });
    setLabelData(labelArr);
    setData(dataArr);
  }, [tnt]);

  const configData = {
    labels: labelData,
    datasets: [
      {
        label: "",
        data: data,
        backgroundColor: "black",
        borderColor: "white",
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
      <div>
        <h3>{name}</h3>
        <Line
          data={configData}
          options={options}
          height={height}
          width={width}
        />
        <br />
        <p>{footer}</p>
      </div>
    </div>
  );
};
