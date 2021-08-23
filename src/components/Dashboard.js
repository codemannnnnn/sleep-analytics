import React, { useEffect, useState } from "react";

//state management
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom, grabData } from "../App.js";

//components
import { TimeSeriesGauge } from "./TimeSeriesGauge";
import { DateGauge } from "./DateGauge";
import { ScoreGauge } from "./ScoreGauge";
import { ChartLine } from "./ChartLine";
import { BarChart } from "./BarChart";
import { ScatterChart } from "./ScatterChart";

//packages
import moment from "moment";
import { split, update } from "lodash";

export const Dashboard = () => {
  //incoming data
  const [data, setData] = useRecoilValue(grabData);
  //   const [id, setId] = useRecoilState(userAtom);

  //individual data
  const [ts, setTs] = useState();
  const [stages, setStages] = useState();
  const [score, setScore] = useState();
  const [tnt, setTnt] = useState();

  const [intervalData, setIntervalData] = useState([]);

  //loading states
  const [isLoading, setIsLoading] = useState(true);
  const [childLoad, setChildLoad] = useState(true);

  //selected item
  const [selectedItem, setSelectedItem] = useState("1488955980");
  const [selectedItemData, setSelectedItemData] = useState();

  useEffect(() => {
    const splitData = () => {
      let arr = [];
      data.map((e) => {
        arr.push(e);
      });
      setIntervalData(arr.reverse());
      setIsLoading(false);
    };
    splitData();
  }, [data, selectedItem, selectedItemData]);

  useEffect(() => {
    let arr = [];
    data.map((e) => {
      if (e.id === selectedItem) {
        arr.push(e);
      }
    });

    setSelectedItemData(arr);
    setChildLoad(false);
  }, [selectedItem]);

  const handleClick = (e) => {
    setSelectedItem(e.target.id);
    setChildLoad(true);
  };

  return (
    <div>
      <div>
        <div className="date-box">
          {isLoading
            ? "Loading..."
            : intervalData.map((e) => {
                let updateDate =
                  e.ts.slice(5, 7) +
                  "/" +
                  e.ts.slice(8, 10) +
                  "/" +
                  e.ts.slice(2, 4);
                let updateTime = e.ts.slice(11, 14) + e.ts.slice(14, 16);
                return (
                  <div
                    key={e.id}
                    className="date-box-item"
                    id={e.id}
                    onClick={handleClick}
                  >
                    <DateGauge date={updateDate} time={updateTime} />
                  </div>
                );
              })}
        </div>
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
              <ChartLine name={"Sleep Report"} stages={selectedItemData} />
            )}
          </div>
        </div>
        <div className="chart-display-mid">
          <div>
            {isLoading ? (
              "Loading..."
            ) : (
              <TimeSeriesGauge tnt={selectedItemData} name={"Tosses & Turns"} />
            )}
          </div>
        </div>
        <div className="chart-display-mid">
          <div>
            {isLoading ? (
              "Loading..."
            ) : (
              <BarChart
                temp={selectedItemData[0].timeseries.tempRoomC}
                name={"Ambient Room Temperature"}
              />
            )}
          </div>
          <div>
            {isLoading ? (
              "Loading..."
            ) : (
              <BarChart
                temp={selectedItemData[0].timeseries.tempBedC}
                name={"Bed Temperature (Celsius)"}
              />
            )}
          </div>
        </div>
        <div className="chart-display-mid">
          <div>
            {isLoading ? (
              "Loading..."
            ) : (
              <ScatterChart
                name={"Respiratory Rate"}
                data={selectedItemData[0].timeseries.respiratoryRate}
              />
            )}
          </div>
          <div>
            {isLoading ? (
              "Loading..."
            ) : (
              <ScatterChart
                name={"Heart Rate"}
                data={selectedItemData[0].timeseries.heartRate}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
