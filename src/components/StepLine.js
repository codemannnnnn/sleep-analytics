import React, { useState, useEffect } from "react";

import Chart from "react-apexcharts";

// import { stages } from "../stages";

export const StepLine = ({
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
  const [stage, setStage] = useState([]);
  const [dur, setDur] = useState([]);

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
      categories: dur,
      title: {
        text: "Sleep Stages",
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
            ? "<span><strong>deep</strong></span>"
            : w.config.series[0].data[dataPointIndex] === 2
            ? "<span><strong>light</strong></span>"
            : w.config.series[0].data[dataPointIndex] === 3
            ? "<span><strong>awake</strong></span>"
            : w.config.series[0].data[dataPointIndex] === 4
            ? "<span><strong>out</strong></span>"
            : "") +
          "</div>" +
          "</div>"
        );
      },
    },
  };

  const series = [
    {
      name: "",
      data: stage,
    },
  ];

  useEffect(() => {
    let stageArr = [];
    let arr2 = [];
    let run2 = [];
    let g2 = 0;

    stages.forEach((e, idx) => {
      let newTime = e.duration / 60;
      if (newTime > 40) {
        arr2.push({
          stage: e.stage,
          duration: e.duration,
        });
        run2.push(idx + g2);
        g2++;
      }
    });

    //this is the function that will split things out to be bigger.
    //works in the console but react doesn't like it, will keep working on it.
    // arr2.forEach((e, idx) => {
    //   stages.splice(run2[idx], 0, e);
    // });

    let a = [];
    let b = [];
    stages.forEach((e) => {
      a.push(e.stage);
      b.push(e.duration);
    });

    let c = [];
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
  }, [stages]);

  return (
    <div className="new-chart-split">
      <div>
        <Chart options={options} series={series} type="area" width="450" />
      </div>
    </div>
  );
};
