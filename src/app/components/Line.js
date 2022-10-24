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
    data: data.filter((_, i) => i < 1000),
    xField: "year",
    yField: "value",
    seriesField: "category",
    yAxis: {
      label: {
        // formatter: (v) => Number(v),
        formatter: (v) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    color: COLOR_PLATE_10,
    point: {
      shape: ({ reservoir }) => {
        return "circle";
      },
      style: ({ year }) => {
        return {
          r: Number(year) % 4 ? 0 : 3, // 4 个数据示一个点标记
        };
      },
    },
  };

  /*
  const config = {
    data,
    padding: "auto",
    xField: "Year",
    yField: "Qo",
    xAxis: {
      tickCount: 5,
    },
  };
  */

  return <Line {...config} />;
};
