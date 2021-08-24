import React, { useEffect, useState } from "react";

//state management
import { useRecoilValue } from "recoil";
import { grabData } from "../App.js";

//components
import { TimeSeriesGauge } from "./TimeSeriesGauge";
import { ScoreGauge } from "./ScoreGauge";
import { ChartLine } from "./ChartLine";
import { BarChart } from "./BarChart";
import { ScatterChart } from "./ScatterChart";

//packages
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export const Dashboard = () => {
  //incoming data
  const [data, setData] = useRecoilValue(grabData);

  //individual data
  const [intervalData, setIntervalData] = useState([]);

  //loading states
  const [isLoading, setIsLoading] = useState(true);
  const [childLoad, setChildLoad] = useState(true);

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
    data.forEach((e) => {
      if (e.id === selectedItem) {
        arr.push(e);
      }
    });

    setSelectedItemData(arr);
    setChildLoad(false);
  }, [selectedItem]);

  const handleClick = (e) => {
    e.preventDefault();
    setSelectedItem(e.target.id);
    setChildLoad(true);
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
              <ScoreGauge item={selectedItemData} loading={childLoad} />
            )}
          </div>

          <div id="cta-top-item2">
            {isLoading ? (
              "Loading..."
            ) : (
              <ChartLine
                name={"Stages"}
                stages={selectedItemData}
                height={200}
                width={300}
                icon1p={"awake"}
                icon1={<FaArrowUp />}
                icon2p={"asleep"}
                icon2={<FaArrowDown />}
                footer={"minutes"}
              />
            )}
          </div>
          <div id="cta-top-item2">
            {isLoading ? (
              "Loading..."
            ) : (
              <TimeSeriesGauge
                tnt={selectedItemData}
                name={"Tosses & Turns"}
                height={200}
                width={300}
                footer={"time"}
              />
            )}
          </div>
        </div>
        <div className="chart-display-mid">
          <div className="chart-sxs">
            {isLoading ? (
              "Loading..."
            ) : (
              <BarChart
                temp={selectedItemData[0].timeseries.tempRoomC}
                name={"Ambient Room Temperature"}
                height={400}
                width={450}
                footer={"time | temp"}
                footer2={"(celsius)"}
              />
            )}
          </div>
          <div className="chart-sxs">
            {isLoading ? (
              "Loading..."
            ) : (
              <BarChart
                temp={selectedItemData[0].timeseries.tempBedC}
                name={"Pod Temperature"}
                height={400}
                width={450}
                footer={"time | temp"}
                footer2={"(celsius)"}
              />
            )}
          </div>
        </div>
        <div className="chart-display-mid">
          <div className="chart-sxs">
            {isLoading ? (
              "Loading..."
            ) : (
              <ScatterChart
                name={"Respiratory Rate"}
                data={selectedItemData[0].timeseries.respiratoryRate}
                height={300}
                width={450}
                footer={"time | rate"}
              />
            )}
          </div>
          <div className="chart-sxs">
            {isLoading ? (
              "Loading..."
            ) : (
              <ScatterChart
                name={"Heart Rate"}
                data={selectedItemData[0].timeseries.heartRate}
                height={300}
                width={450}
                footer={"time | rate"}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
