import React from "react";
import moment from "moment";
import { Table, Space, Card } from "antd";
import * as Comm from "../common";

const PurchaseUnHandleTable = ({ data }) => {
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
      title: "数量",
      dataIndex: "数量",
      key: "数量",
      align: "right",
    },
    {
      title: "单价",
      dataIndex: "单价",
      key: "单价",
      align: "right",
    },
    {
      title: "金额",
      dataIndex: "金额",
      key: "金额",
      align: "right",
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
  ];

  return (
    <>
      <Card style={{ marginBottom: 10 }}>
        <Space size="large">
          <label>条数：{data.length ?? 0}</label>
          <label>金额：{Comm.getSum(data, "金额")}</label>
        </Space>
      </Card>
      <Table columns={columns} dataSource={data} pagination={false} />
    </>
  );
};

export default PurchaseUnHandleTable; // 导出组件
