import React, { useEffect, useState } from "react";

//state management
import { useRecoilValue } from "recoil";
import { grabData } from "../App.js";

//components
import { TimeSeriesGauge } from "./TimeSeriesGauge";
import { ScoreGauge } from "./ScoreGauge";
import { LineChartRate } from "./LineChartRate";

//newcomps
import { StepLine } from "./StepLine";
import { Area } from "./Area";

//packages

export const Dashboard = () => {
  //incoming data
  const [data, setData] = useRecoilValue(grabData);

  //individual data
  const [intervalData, setIntervalData] = useState([]);
  const [hours, setHours] = useState(0);
  const [tnt, setTnt] = useState(0);

  //loading states
  const [isLoading, setIsLoading] = useState(true);

  //selected item
  const [selectedItem, setSelectedItem] = useState("1488955980");
  const [selectedItemData, setSelectedItemData] = useState();

  //side effect to handle the incoming data, sort it out, push it to temp array and set the state.
  //dependency array to include prop changes to state
  useEffect(() => {
    const splitData = () => {
      let arr = [];
      data.forEach((e) => {
        arr.push(e);
      });
      setIntervalData(arr.reverse());
      setIsLoading(false);
    };
    splitData();
  }, [data, selectedItem, selectedItemData]);

  useEffect(() => {
    let arr = [];
    let arr2 = [];
    let arr3 = 0;
    let timeArr = [];
    data.forEach((e) => {
      if (e.id === selectedItem) {
        arr.push(e);
        arr2.push(e.stages);
        arr3 = e.timeseries.tnt.length;
      }
    });

    arr2[0].forEach((j) => {
      let newTime = j.duration / 60 / 60;
      timeArr.push(newTime);
    });

    let x = timeArr.reduce((a, b) => a + b, 0);
    setTnt(arr3);
    setHours(x.toFixed(2));
    setSelectedItemData(arr);
  }, [selectedItem]);

  const handleClick = (e) => {
    e.preventDefault();
    setSelectedItem(e.target.id);
  };

  return (
    <div className="dash-container">
      <div className="date-box">
        {isLoading
          ? "Loading..."
          : intervalData.map((e) => {
              let updateDate = e.ts.slice(5, 7) + "/" + e.ts.slice(8, 10);

              //if i want to add the year to the date variable, uncomment below.
              // "/" +
              // e.ts.slice(2, 4);
              //   let updateTime = e.ts.slice(11, 14) + e.ts.slice(14, 16);
              return (
                <div
                  key={e.id}
                  className="date-box-item"
                  id={e.id}
                  onClick={handleClick}
                >
                  {updateDate}
                </div>
              );
            })}
      </div>

      <div>
        <div className="cta-top">
          <div id="cta-top-item1">
            {isLoading ? (
              "Loading..."
            ) : (
              <ScoreGauge
                item={selectedItemData[0].score + "%"}
                name={"Sleep Fitness"}
              />
            )}
          </div>
          <div id="cta-top-item1">
            {isLoading ? (
              "Loading..."
            ) : (
              <ScoreGauge item={hours} name={"Hours Slept"} />
            )}
          </div>
          <div id="cta-top-item1">
            {isLoading ? (
              "Loading..."
            ) : (
              <ScoreGauge item={tnt} name={"Tosses & Turns"} />
            )}
          </div>
        </div>
        <div className="top-chartz">
          <div id="cta-top-item2">
            {isLoading ? (
              "Loading..."
            ) : (
              <StepLine
                stages={selectedItemData[0].stages}
                time={selectedItemData[0].ts}
                width={450}
              />
            )}
          </div>
          <div id="cta-top-item2">
            {isLoading ? (
              "Loading..."
            ) : (
              <TimeSeriesGauge
                tnt={selectedItemData}
                width={450}
                time={selectedItemData[0].ts}
              />
            )}
          </div>
        </div>
        <div className="chart-display-mid">
          <div className="chart-sxs">
            {isLoading ? (
              "Loading..."
            ) : (
              <Area data={selectedItemData[0].timeseries} width={900} />
            )}
          </div>
          <div className="chart-sxs">
            {isLoading ? (
              "Loading..."
            ) : (
              <LineChartRate
                data={selectedItemData[0].timeseries}
                width={900}
              />
            )}
          </div>{" "}
        </div>
      </div>
    </div>
  );
};
