import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Chart from "react-apexcharts";
//import config for standard options
import { options } from "../options.js";
import moment from "moment";

//

export const TimeSeriesGauge = ({ tnt, width }) => {
  const [newD, setNewD] = useState([]);

  //side effect to handle the incoming data, sort it out, push it to temp array and set the state.
  //dependency array to include prop changes to state
  useEffect(() => {
    let newArr = [];
    let newnewArr = [];
    let count = 0;
    let inc = 1;
    tnt[0].timeseries.tnt.forEach((e) => {
      let newTime = moment(e[0], "YYYY-MM-DD-hh:mm:ss").format("hh:mm");
      newArr.push({
        x: newTime,
        y: [count, inc],
      });
      count++;
      inc++;
    });
    newnewArr.push({
      data: newArr,
    });

    setNewD(newnewArr);
  }, [tnt]);

  const options = {
    yaxis: {
      labels: {
        style: {
          colors: "#ffffff",
        },
      },
    },
    xaxis: {
      labels: {
        style: {
          colors: "#ffffff",
        },
      },
      title: {
        text: "Tosses & Turns",
        style: {
          color: "#ffffff",
        },
      },
    },
    chart: {
      height: 350,
      type: "rangeBar",
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        return (
          "<div id='stage-chart-tool'>" +
          "<div id='stage-chart-top-tool'><strong>Time</strong>" +
          "<span>&nbsp;</span>" +
          w.config.series[0].data[dataPointIndex].x +
          "</div>" +
          "<div id='stage-chart-bottom-tool'>" +
          "<span><strong>Total: </strong></span>" +
          w.config.series[0].data[dataPointIndex].y[1] +
          "</div>" +
          "</div>"
        );
      },
    },
    responsive: [
      {
        breakpoint: 800,
        options: {
          chart: {
            width: "350px",
          },
        },
      },
    ],
  };

  return (
    <div>
      <div>
        <Chart options={options} series={newD} type="area" width={width} />
      </div>
    </div>
  );
};
