import React from "react";
import { Card, Table, Drawer, Button, Tabs, Select } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import axios from "axios";
import { compsColumns, prodsColumns } from "./config-column";
import { DataGraphLine } from "./components/Line";

export default () => {
  const [load, setLoad] = React.useState(true);
  const [graph, setGraph] = React.useState([]);
  const [search, setSearch] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [completions, setCompletions] = React.useState([]);
  const [productions, setProductions] = React.useState([]);

  const getCompletions = async () => {
    return axios.get("api/v1/completions").then((res) => res.data);
  };

  const getProductions = async () => {
    return axios.get("api/v1/productions").then((res) => res.data);
  };

  const keyProduction = (year, item, ref, table, node) => {
    const value = Math.round(item[ref]);
    const rowValue = table[node][year]?.value;
    if (typeof rowValue === "number") {
      // console.log("sum:", rowValue, value);
      return {
        year,
        category: node,
        value: Math.round(rowValue) + value,
      };
    }
    // console.log("init:", value);
    return {
      year,
      category: node,
      value: value,
    };
  };

  const mapGraph = (items = []) => {
    const tabla = {
      oil: {},
      gas: {},
      water: {},
    };
    for (const item of items) {
      const key = item.Year;
      tabla.oil[key] = keyProduction(key, item, "Qo", tabla, "oil");
      tabla.gas[key] = keyProduction(key, item, "Qg", tabla, "gas");
      tabla.water[key] = keyProduction(key, item, "Qw", tabla, "water");
    }
    const _oil = Object.values(tabla.oil);
    const _gas = Object.values(tabla.gas);
    const _water = Object.values(tabla.water);
    const _graph = [..._oil, ..._gas, ..._water].sort(
      ({ year: a }, { year: b }) => a - b
    );
    setGraph(_graph);
  };

  const handleChange = (value) => {
    if (!value || (Array.isArray(value) && !value.length)) {
      setSearch([]);
      return;
    }
    setSearch(`${value}`.split(","));
  };

  const _prod = React.useMemo(() => {
    if (Array.isArray(search) && !search.length) return productions;
    return productions.filter(({ wellAPI }) => search.includes(wellAPI));
  }, [productions, search]);

  const _comp = React.useMemo(() => {
    if (Array.isArray(search) && !search.length) return completions;
    return completions.filter(({ wellAPI }) => search.includes(wellAPI));
  }, [completions, search]);

  React.useEffect(() => {
    getCompletions().then(({ data }) => setCompletions(data));
  }, []);

  React.useEffect(() => {
    getProductions().then(({ data = [] }) => {
      const map = data.map((i) => {
        return {
          ...i,
          Gross: Math.round(i?.Qo + i?.Qw),
        };
      });
      setProductions(map);
    });
  }, []);

  React.useEffect(() => {
    if (!load) return;
    if (!Array.isArray(completions) || !completions.length) return;
    if (!Array.isArray(productions) || !productions.length) return;
    setLoad(false);
  }, []);

  React.useEffect(() => {
    mapGraph(_prod);
  }, [_prod]);

  return (
    <div
      className={"mv20"}
      style={{
        maxWidth: 1024,
        marginTop: 10,
        margin: "10px auto",
      }}
    >
      <Card
        title="Search filter"
        extra={
          <Button
            type="primary"
            shape="round"
            onClick={() => setVisible(true)}
            icon={<EnvironmentOutlined />}
          >
            See map
          </Button>
        }
        className="br10"
      >
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder={"Please select a well"}
          defaultValue={[]}
          onChange={handleChange}
          optionFilterProp="children"
          filterOption={(input, option) => option.children.includes(input)}
          filterSort={(optionA, optionB) =>
            optionA.children
              .toLowerCase()
              .localeCompare(optionB.children.toLowerCase())
          }
        >
          {Array.isArray(completions)
            ? completions.map(({ wellAPI, wellName, Type }, i) => (
                <Select.Option key={i} value={wellAPI}>
                  {`${wellName} - (type: ${Type})`}
                </Select.Option>
              ))
            : null}
        </Select>
      </Card>

      <Card
        title={
          <React.Fragment>
            <strong style={{ fontSize: "1.5em" }}>Completions</strong>
            <br />
            <small style={{ color: "#CCC" }}>
              <i>List of completed wells</i>
            </small>
          </React.Fragment>
        }
        className="br10 mv10"
      >
        <Table
          columns={compsColumns}
          dataSource={_comp}
          pagination={{
            pageSize: 50,
          }}
          scroll={{
            y: 500,
            x: 900,
          }}
        />
      </Card>

      <Card
        title={
          <React.Fragment>
            <strong style={{ fontSize: "1.5em" }}>Productions</strong>
            <br />
            <small style={{ color: "#CCC" }}>
              <i>List of produced by well</i>
            </small>
          </React.Fragment>
        }
        className="br10 mv10"
      >
        <Tabs>
          <Tabs.TabPane tab="Data table" key="item-1">
            <Table
              columns={prodsColumns}
              dataSource={_prod}
              pagination={{ pageSize: 50 }}
              scroll={{ y: 500, x: 900 }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Data graph" key="item-2">
            <DataGraphLine data={graph} />
          </Tabs.TabPane>
        </Tabs>
      </Card>

      <Drawer
        title={
          <React.Fragment>
            <strong>Well geolocation.</strong>
            <br />
            <small style={{ color: "#CCC" }}>
              <i>We mark on the map the location of each well</i>
            </small>
          </React.Fragment>
        }
        placement={"bottom"}
        closable={false}
        onClose={() => setVisible(false)}
        open={visible}
        key={"bottom"}
      >
        <center>
          <h1>Google map</h1>
        </center>
      </Drawer>
    </div>
  );
};
