import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Chart from "react-apexcharts";
//import config for standard options
import { options } from "../options.js";

//

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
      labelArr.push(0, newTime);
      dataArr.push(0, e[1]);
    });
    setLabelData(labelArr);
    setData(dataArr);
  }, [tnt]);

  const options = {
    chart: {
      id: "line-ch",
      type: "line",
    },
    yaxis: {
      axisTicks: {
        show: true,
        color: "#ffffff",
      },
      labels: {
        show: true,
        style: {
          colors: "#ffffff",
        },
      },
    },
    xaxis: {
      categories: labelData,
      title: {
        text: "Tosses & Turns",
        style: {
          color: "#ffffff",
        },
      },
      labels: {
        show: true,
        style: {
          colors: "#ffffff",
        },
      },
      axisTicks: {
        show: true,
        borderType: "solid",
        color: "#ffffff",
        height: 6,
        offsetX: 0,
        offsetY: 0,
      },
    },
    stroke: {
      curve: "stepline",
    },
    dataLabels: {
      enabled: false,
    },
  };
  const series = [
    {
      name: "",
      data: data,
    },
  ];

  return (
    <div>
      <div>
        <Chart options={options} series={series} type="area" width="450" />
      </div>
    </div>
  );
};
