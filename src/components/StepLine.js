import React, { useState, useEffect } from "react";

import Chart from "react-apexcharts";

// import { stages } from "../stages";

import moment from "moment";

export const StepLine = ({ stages, time, width }) => {
  const [stage, setStage] = useState([]);
  const [dur, setDur] = useState([]);
  const [hours, setHours] = useState([]);

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

        formatter: function (val) {
          if ((val <= 1) & (val <= 2)) {
            return "DEEP";
          }
          if ((val <= 2) & (val <= 3)) {
            return "LIGHT";
          }

          if ((val <= 3) & (val <= 4)) {
            return "AWAKE";
          }
          if (val <= 4) {
            return "OUT";
          }
        },
      },
    },
    xaxis: {
      categories: dur,
      title: {
        text: "Sleep Stages",
        style: {
          color: "#ffffff",
        },
      },
      labels: {
        show: false,
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

    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        return (
          "<div id='stage-chart-tool'>" +
          "<div id='stage-chart-top-tool'>" +
          w.globals.categoryLabels[dataPointIndex] +
          "<span> minutes</span>" +
          "</div>" +
          "<div id='stage-chart-bottom-tool'>" +
          (w.config.series[0].data[dataPointIndex] === 1
            ? "<span><strong>DEEP</strong></span>"
            : w.config.series[0].data[dataPointIndex] === 2
            ? "<span><strong>LIGHT</strong></span>"
            : w.config.series[0].data[dataPointIndex] === 3
            ? "<span><strong>AWAKE</strong></span>"
            : w.config.series[0].data[dataPointIndex] === 4
            ? "<span><strong>OUT</strong></span>"
            : "") +
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

  const series = [
    {
      data: stage,
    },
  ];

  useEffect(() => {
    let stageArr = [];
    let newStage = [];
    let arr2 = [];
    let run2 = [];
    let g2 = 0;
    let a = [];
    let b = [];
    let c = [];
    let d = [];

    stages.forEach((e, idx) => {
      let newTime = e.duration / 60;
      if (newTime > 60) {
        arr2.push({
          stage: e.stage,
          duration: e.duration,
        });
        run2.push(idx + g2);
        g2++;
      }
      d.push(newTime);
      newStage.push(e);
    });

    //this is the function that will split things out to be bigger.
    //works in the console but react doesn't like it, will keep working on it.f
    arr2.forEach((e, idx) => {
      newStage.splice(run2[idx], 0, e);
    });

    newStage.forEach((e) => {
      a.push(e.stage);
      b.push(e.duration);
    });

    b.forEach((e) => {
      let newTime = e / 60;
      c.push(newTime);
    });

    //handle the comparison between stages and numbering them.
    //1 - deep; 2 - light; 3 - awake; 4 - out;
    a.forEach((e) => {
      if (e === "deep") {
        stageArr.push(1);
      }
      if (e === "light") {
        stageArr.push(2);
      }
      if (e === "awake") {
        stageArr.push(3);
      }
      if (e === "out") {
        stageArr.push(4);
      }
    });

    setStage(stageArr);
    setDur(c);

    let x = 0;
    x = d.reduce((a, b) => a + b, 0);

    let y = moment(time, "YYYY-DD-MM-hh:mm:ss").add(x, "minutes").format("LTS");

    let log = [
      moment(time, "YYYY-DD-MM-hh:mm:ss").format("hh:mm"),
      moment(y, "hh:mm:ss").format("hh:mm"),
    ];

    setHours(log);
  }, [stages, time]);

  return (
    <div className="new-chart-split">
      <div>
        <Chart options={options} series={series} type="area" width={width} />
      </div>
      <div id="xaxis-split">
        {hours.map((e) => {
          return <div key={e}>{e}</div>;
        })}
      </div>
    </div>
  );
};
