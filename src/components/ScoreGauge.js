import React from "react";

export const ScoreGauge = ({ item, name }) => {
  return (
    <div id="score-gauge-inner">
      <h1>{item}</h1>
      <p>{name}</p>
    </div>
  );
};
