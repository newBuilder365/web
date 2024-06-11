import { Table, Tabs } from "antd";
import moment from "moment";
const { TabPane } = Tabs;

const PurchaseTable = ({ data }) => {
  const columns = [
    {
      title: "时间",
      dataIndex: "时间",
      key: "时间",
      render: (text) => moment(text).format("YYYY-MM-DD"),
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

  const tabContentStyle = {
    height: "80vh", // 设置高度
    overflowY: "auto", // 如果内容超过高度则显示滚动条
    padding: "16px",
    border: "1px solid #f0f0f0",
    background: "#fafafa",
  };
  return (
    <Tabs
      style={{
        height: "80vh",
      }}
      type="card"
      tabPosition="left"
    >
      {Object.keys(data).map((key) => {
        return (
          <TabPane tab={key} key={key}>
            <div style={tabContentStyle}>
              <p>条数：{data[key].total}</p>
              <Table
                columns={columns}
                dataSource={data[key].data}
                pagination={false}
              />
            </div>
          </TabPane>
        );
      })}
    </Tabs>
  );
};

export default PurchaseTable;
