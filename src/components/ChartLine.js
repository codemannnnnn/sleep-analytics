import React, { useState, useEffect } from "react";

import { Line } from "react-chartjs-2";

export const ChartLine = ({
  stages,
  name,
  width,
  height,
  icon1,
  icon1p,
  icon2,
  icon2p,
  footer,
}) => {
  const [chartLabel, setChartLabel] = useState([]);
  const [chartData, setChartData] = useState([]);

  const data = {
    labels: chartLabel,
    datasets: [
      {
        label: ["Stage"],
        data: chartData,
        fill: false,
        backgroundColor: "black",
        borderColor: "white",
      },
    ],
  };

  //side effect to handle the incoming data, sort it out, push it to temp array and set the state.
  //dependency array to include prop changes to state
  useEffect(() => {
    let setArr = [];
    let x = [];
    let y = [];

    stages[0].stages.forEach((e) => {
      let secToMin = e.duration / 60;
      let deep = 1;
      let light = 2;
      let awake = 3;
      let out = 4;
      if (e.stage === "deep") {
        setArr.push({
          stage: deep,
          duration: secToMin,
        });
      }
      if (e.stage === "light") {
        setArr.push({
          stage: light,
          duration: secToMin,
        });
      }
      if (e.stage === "awake") {
        setArr.push({
          stage: awake,
          duration: secToMin,
        });
      }
      if (e.stage === "out") {
        setArr.push({
          stage: out,
          duration: secToMin,
        });
      }
    });
    setArr.forEach((e) => {
      x.push(e.stage);
      y.push(e.duration);
    });
    setChartData(x);
    setChartLabel(y);
  }, [stages]);

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
      <div id="line-chart-triple">
        <div id="line-chart-triple">
          <p>{icon1p}</p>
          <span id="line-chart-triple-icon">{icon1}</span>
        </div>
        <h3>{name}</h3>
        <div id="line-chart-triple">
          <span id="line-chart-triple-icon">{icon2}</span>
          <p>{icon2p}</p>
        </div>
      </div>
      <div className="chart-display-mid">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        ></div>
        <div>
          <Line data={data} options={options} width={width} height={height} />
          <br />
          <p>{footer}</p>
        </div>
      </div>
    </div>
  );
};

//   <Chart height={400} data={data} forceFit>
//     <Axis name="temperature" label={{ formatter: (val) => `${val}°C` }} />
//     <Line position="month*temperature" size={2} color={"city"} />
//     <Point position="month*temperature" size={4} color={"city"} />
//   </Chart>;
