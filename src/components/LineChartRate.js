import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

export const LineChartRate = ({ data, width }) => {
  const [heartRate, setHearRate] = useState([]);
  const [respRate, setRespRate] = useState([]);
  const [time, setTime] = useState([]);

  useEffect(() => {
    let respArr = [];
    let heartArr = [];
    let timeArr = [];
    data.heartRate.forEach((e) => {
      let newTime = e[0].slice(11, 16);
      let newHeart = e[1].toFixed(2);
      timeArr.push(newTime);
      heartArr.push(newHeart);
    });
    data.respiratoryRate.forEach((e) => {
      let newResp = e[1].toFixed(2);
      respArr.push(newResp);
    });

    setHearRate(heartArr);
    setRespRate(respArr);
    setTime(timeArr);
  }, [data]);

  const options = {
    chart: {
      type: "area",
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
        formatter: function (val) {
          return val;
        },
      },
    },
    xaxis: {
      categories: time,
      title: {
        text: "",
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
    legend: {
      labels: {
        colors: "#ffffff",
      },
    },
    colors: ["rgb(46, 147, 255)", "rgb(180, 160, 237)"],
    stroke: {
      curve: "smooth",
    },
    dataLabels: {
      enabled: false,
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

  const series = [
    {
      name: "Heart Rate",
      data: heartRate,
    },
    {
      name: "Respiratory Rate",
      data: respRate,
    },
  ];
  return (
    <div>
      <Chart
        series={series}
        options={options}
        type="area"
        width={width}
        height="400"
      />
    </div>
  );
};
