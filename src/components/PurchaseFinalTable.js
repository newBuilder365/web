import { Table, Tabs, message, FloatButton, Card, Space, Divider } from "antd";
import moment from "moment";
import { useRef, useState } from "react";
import { CopyOutlined } from "@ant-design/icons";
import * as Comm from "../common";
const { TabPane } = Tabs;

const PurchaseFinalTable = ({ data: dataSource, flatData }) => {
  const [groupTitle] = useState(() => {
    const dcy = window.localStorage.getItem("dcy");
    return dcy ? JSON.parse(dcy) : [];
  });

  const textareaRef = useRef(null);

  const flatFinalData = flatData.filter((v) => v.groupKey);

  const columns = [
    {
      title: "时间",
      dataIndex: "时间",
      key: "时间",
      render: (text) => moment(text).format("YYYY/MM/DD"),
    },
    {
      title: "菜品",
      dataIndex: "菜品",
      key: "菜品",
    },
    {
      title: "单价",
      dataIndex: "单价",
      key: "单价",
      align: "right",
    },
    {
      title: "数量",
      dataIndex: "数量",
      key: "数量",
      align: "right",
    },
    {
      title: "金额",
      dataIndex: "金额",
      key: "金额",
      align: "right",
    },
    {
      title: "",
      dataIndex: "",
      key: "",
    },
    {
      title: "经办人",
      dataIndex: "经办人",
      key: "经办人",
    },
    {
      title: "供应商",
      dataIndex: "供应商",
      key: "供应商",
    },
    {
      title: "付款情况",
      dataIndex: "付款情况",
      key: "付款情况",
    },
    {
      title: "原始数据",
      dataIndex: "originalValue",
      key: "originalValue",
    },
  ];

  const tabContentStyle = {
    height: "80vh", // 设置高度
    overflowY: "auto", // 如果内容超过高度则显示滚动条
    padding: "16px",
    border: "1px solid #f0f0f0",
    background: "#fafafa",
  };

  const getTableDataAsString = (data) => {
    const exportCols = [...columns];
    exportCols.pop(); // 移除操作列
    let dataSource = data.map((v) => ({
      ...v,
      时间: moment(v["时间"]).format("YYYY/MM/DD"),
    }));
    const rows = dataSource.map((row) =>
      exportCols.map((col) => row[col.dataIndex] ?? "").join("\t")
    );
    return rows.join("\n");
  };

  const copyToClipboard = async (dataSource) => {
    const text = getTableDataAsString(dataSource);
    try {
      await navigator.clipboard.writeText(text);
      message.success("Table data copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
      message.error("Failed to copy data to clipboard.");
    }
  };

  return (
    <Tabs
      style={{
        height: "80vh",
      }}
      type="card"
      tabPosition="left"
    >
      {groupTitle.map((item) => {
        return (
          <TabPane tab={item.value} key={item.key}>
            <div style={tabContentStyle}>
              <Card>
                <Space size="large">
                  <label>总条数：{flatFinalData.length ?? 0}</label>
                  <label>总金额：{Comm.getSum(flatFinalData, "金额")}</label>
                  <Divider type="vertical" />
                  <label>条数：{dataSource[item.key]?.length ?? 0}</label>
                  <label>
                    金额：{Comm.getSum(dataSource[item.key], "金额")}
                  </label>
                </Space>
              </Card>
              <Table
                columns={columns}
                dataSource={dataSource[item.key] || []}
                pagination={false}
              />
              <FloatButton
                onClick={() => copyToClipboard(dataSource[item.key])}
                icon={<CopyOutlined />}
                type="primary"
                style={{
                  right: 54,
                }}
              />
              <textarea
                ref={textareaRef}
                style={{ position: "absolute", left: "-9999px" }}
                readOnly
              />
            </div>
          </TabPane>
        );
      })}
    </Tabs>
  );
};

export default PurchaseFinalTable;
