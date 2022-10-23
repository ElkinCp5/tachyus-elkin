import React from "react";
import { Card, Table, Drawer, Button, Tabs } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import axios from "axios";
import { compsColumns, prodsColumns } from "./config-column";

export default () => {
  const [visible, setVisible] = React.useState(false);
  const [completions, setCompletions] = React.useState([]);
  const [productions, setProductions] = React.useState([]);

  const getCompletions = async () => {
    return axios.get("api/v1/completions").then((res) => res.data);
  };

  const getProductions = async () => {
    return axios.get("api/v1/productions").then((res) => res.data);
  };

  React.useEffect(() => {
    getCompletions().then(({ data }) => setCompletions(data));
  }, []);

  React.useEffect(() => {
    getProductions().then(({ data }) => setProductions(data));
  }, []);

  return (
    <div
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
        hola
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
          dataSource={completions}
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
              dataSource={productions}
              pagination={{
                pageSize: 50,
              }}
              scroll={{
                y: 500,
                x: 900,
              }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Data graph" key="item-2">
            Content 2
          </Tabs.TabPane>
        </Tabs>
        ;
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
