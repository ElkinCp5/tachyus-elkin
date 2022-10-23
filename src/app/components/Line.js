import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/plots";

export const DataGraphLine = ({ data = [] }) => {
  const COLOR_PLATE_10 = [
    "#5B8FF9",
    "#5AD8A6",
    "#5D7092",
    "#F6BD16",
    "#E8684A",
    "#6DC8EC",
    "#9270CA",
    "#FF9D4D",
    "#269A99",
    "#FF99C3",
  ];

  const config = {
    data,
    xField: "Year",
    yField: "TD",
    seriesField: "reservoir",
    yAxis: {
      label: {
        // formatter: (v) => Number(v),
        formatter: (v) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    // animation: {
    //   appear: {
    //     animation: "path-in",
    //     duration: 5000,
    //   },
    // },
    color: COLOR_PLATE_10,
    // point: {
    //   shape: ({ reservoir }) => {
    //     return reservoir === "Red" ? "square" : "circle";
    //   },
    //   style: ({ year }) => {
    //     return {
    //       r: Number(year) % 4 ? 0 : 3, // 4 个数据示一个点标记
    //     };
    //   },
    // },
  };

  return <Line {...config} />;
};
