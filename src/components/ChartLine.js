import React, { useState, useEffect } from "react";

import { Line } from "react-chartjs-2";

export const ChartLine = ({ stages, name }) => {
  const [chartLabel, setChartLabel] = useState([]);
  const [chartData, setChartData] = useState([]);

  const data = {
    labels: chartLabel,
    datasets: [
      {
        label: "Timeline",
        data: chartData,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  useEffect(() => {
    let setArr = [];
    let x = [];
    let y = [];

    stages[0].stages.map((e) => {
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
    setArr.map((e) => {
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
  let awake = ["awake"];
  return (
    <div>
      <h3>{name}</h3>

      <div className="chart-display-mid">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <div className="label-color">
            a
            <br />
            w
            <br />
            a
            <br />
            k
            <br />e
          </div>

          <div>
            a
            <br />
            s
            <br />
            l
            <br />
            e
            <br />
            e
            <br />p
          </div>
        </div>
        <div style={{ width: "100%", margin: "auto" }}>
          <Line data={data} options={options} />
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
