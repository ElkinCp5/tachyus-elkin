import React from "react";
import { Tag } from "antd";

const width = 100;
const tagStatus = (status = false) => {
  let color = status ? "green" : "red";
  let text = status ? "Enabled" : "Disabled";
  return <Tag color={color}>{text}</Tag>;
};

export const compsColumns = [
  {
    title: "Well name",
    dataIndex: "wellName",
    width,
  },
  {
    title: "Well api",
    dataIndex: "wellAPI",
    width,
  },
  {
    title: "Bore id",
    dataIndex: "boreID",
    width,
  },
  {
    title: "comp sub id",
    dataIndex: "compSubId",
    width,
  },
  {
    title: "Type",
    dataIndex: "Type",
    width,
  },
  {
    title: "X",
    dataIndex: "X",
    width,
  },
  {
    title: "Y",
    dataIndex: "Y",
    width,
  },
  {
    title: "TD",
    dataIndex: "TD",
    width,
  },
  {
    title: "Is horizontal",
    dataIndex: "isHorizontal",
    width,
  },
  {
    title: "reservoir",
    dataIndex: "reservoir",
    width,
  },
  {
    title: "Fault block",
    dataIndex: "faultBlock",
    width,
  },
  {
    title: "compartment",
    dataIndex: "compartment",
    width,
  },
  {
    title: "max BHP",
    dataIndex: "maxBHP",
    width,
  },
  {
    title: "long",
    dataIndex: "long",
    width,
  },
  {
    title: "lat",
    dataIndex: "lat",
    width,
  },
];

export const prodsColumns = [
  {
    title: "wellAPI",
    dataIndex: "wellAPI",
    width,
  },
  {
    title: "Q, Oil",
    dataIndex: "Qo",
    width,
  },
  {
    title: "Q, Water",
    dataIndex: "Qw",
    width,
  },
  {
    title: "Q, gas",
    dataIndex: "Qg",
    width,
  },
  {
    title: "Gross",
    dataIndex: "Gross",
    width,
  },
  {
    title: "Qs",
    dataIndex: "Qs",
    width,
  },
  {
    title: "Status",
    dataIndex: "Status",
    render: (status) => tagStatus(status),
    width,
  },
  {
    title: "boreID",
    dataIndex: "boreID",
    width,
  },
  {
    title: "compSubId",
    dataIndex: "compSubId",
    width,
  },
  {
    title: "BHP",
    dataIndex: "BHP",
    width,
  },
  {
    title: "CompL",
    dataIndex: "CompL",
    width,
  },
  {
    title: "FlowDays",
    dataIndex: "FlowDays",
    width,
  },
  {
    title: "Pressure",
    dataIndex: "Pressure",
    width,
  },
  {
    title: "Year",
    dataIndex: "Year",
    width,
  },
  {
    title: "Month",
    dataIndex: "Month",
    width,
  },
];
