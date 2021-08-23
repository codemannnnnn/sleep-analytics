import React, { useEffect, useState } from "react";

export const ScoreGauge = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const childLoad = props.loading;
  //   const { score } = props.item[0];

  const score = props.item[0].score;

  return (
    <div id="score-gauge-inner">
      <h1>{childLoad ? "Loading..." : score}%</h1>
      <p>Sleep Fitness</p>
    </div>
  );
};
