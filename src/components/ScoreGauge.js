import React from "react";

export const ScoreGauge = (props) => {
  const score = props.item[0].score;

  return (
    <div id="score-gauge-inner">
      <h1>{score}%</h1>
      <p>Sleep Fitness</p>
    </div>
  );
};
