import React, { useState, useEffect } from "react";

import Chart from "react-apexcharts";

export const Area = ({ data, width }) => {
  const [bedTemp, setBedTemp] = useState([]);
  const [roomTemp, setRoomTemp] = useState([]);
  const [time, setTime] = useState([]);

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
          return val + " ℃";
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
      name: "Pod",
      data: bedTemp,
    },
    {
      name: "Room",
      data: roomTemp,
    },
  ];
  useEffect(() => {
    let bedArr = [];
    let roomArr = [];
    let timeArr = [];
    data.tempRoomC.forEach((e) => {
      let newTime = e[0].slice(11, 16);
      let newRoom = e[1].toFixed(2);

      timeArr.push(newTime);
      roomArr.push(newRoom);
    });
    data.tempBedC.forEach((e) => {
      let newBed = e[1].toFixed(2);
      bedArr.push(newBed);
    });

    setBedTemp(bedArr);
    setRoomTemp(roomArr);
    setTime(timeArr);
  }, [data]);

  return (
    <div className="chart-style">
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
