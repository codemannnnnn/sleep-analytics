import React, { useState } from "react";

export const DateGauge = (props) => {
  const { date, time } = props;

  return (
    <div>
      <div>{date}</div>
      <div>{time}</div>
    </div>
  );
};
