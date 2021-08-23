import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import moment from "moment";

export const TimeSeriesGauge = ({ name, tnt }) => {
  const [labelData, setLabelData] = useState([]);
  const [data, setData] = useState([]);

  const tntT = [
    ["2017-03-09T08:26:00.000Z", 1],
    ["2017-03-09T09:15:00.000Z", 1],
    ["2017-03-09T09:56:00.000Z", 1],
    ["2017-03-09T10:10:00.000Z", 1],
    ["2017-03-09T10:28:00.000Z", 1],
    ["2017-03-09T10:34:00.000Z", 1],
    ["2017-03-09T10:41:00.000Z", 1],
    ["2017-03-09T11:02:00.000Z", 1],
    ["2017-03-09T12:37:00.000Z", 1],
    ["2017-03-09T12:53:00.000Z", 1],
    ["2017-03-09T13:11:00.000Z", 1],
    ["2017-03-09T13:22:00.000Z", 1],
  ];

  useEffect(() => {
    let labelArr = [];
    let dataArr = [];
    tnt[0].timeseries.tnt.map((e) => {
      let newTime = e[0].slice(11, 16);
      labelArr.push(newTime);
      dataArr.push(e[1]);
    });

    setLabelData(labelArr);
    setData(dataArr);
  }, [tnt]);

  const olddata = {
    labels: labelData,
    datasets: [
      {
        label: "# of Votes",
        data: data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
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
        <Line data={olddata} options={options} height={400} width={850} />
      </div>
    </div>
  );
};
