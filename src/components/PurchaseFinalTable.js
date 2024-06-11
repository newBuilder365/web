import { Table, Tabs, message, FloatButton } from "antd";
import moment from "moment";
import { useRef } from "react";
import { CopyOutlined } from "@ant-design/icons";
const { TabPane } = Tabs;

const PurchaseFinalTable = ({ data: dataSource }) => {
  const groupTitle = [
    {
      search: ["双岗"],
      key: "双岗",
      value: "双岗",
    },
    {
      search: ["蔬菜"],
      key: "罗志友",
      value: "罗志友",
    },
    {
      search: ["四湾"],
      key: "金老板",
      value: "金老板",
    },
    {
      search: ["朱秀勤", "秀勤"],
      key: "李涛",
      value: "李涛",
    },
    {
      search: ["陶俊新"],
      key: "陶俊新",
      value: "陶俊新",
    },
    {
      search: ["牛中月"],
      key: "牛中月",
      value: "牛中月",
    },
    {
      search: ["知勤"],
      key: "锦泽商贸",
      value: "锦泽商贸",
    },
    {
      search: ["小菜市"],
      key: "小菜市",
      value: "小菜市",
    },
    {
      search: ["易耗品"],
      key: "易耗品",
      value: "易耗品",
    },
    {
      search: ["土禽"],
      key: "李军军",
      value: "李军军",
    },
    {
      search: ["君淐"],
      key: "君淐",
      value: "君淐",
    },
    {
      search: ["茂昌"],
      key: "茂昌",
      value: "茂昌",
    },
    {
      search: ["荣凡商贸"],
      key: "荣凡商贸",
      value: "荣凡商贸",
    },
    {
      search: ["优味乐"],
      key: "优味乐",
      value: "优味乐",
    },
    {
      search: ["老店"],
      key: "老店",
      value: "老店",
    },
    {
      search: ["金正梅"],
      key: "金正梅",
      value: "金正梅",
    },
  ];
  const textareaRef = useRef(null);

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

  const tabContentStyle = {
    height: "80vh", // 设置高度
    overflowY: "auto", // 如果内容超过高度则显示滚动条
    padding: "16px",
    border: "1px solid #f0f0f0",
    background: "#fafafa",
  };

  const getTableDataAsString = (dataSource) => {
    const rows = dataSource.map((row) =>
      columns.map((col) => row[col.dataIndex]).join("\t")
    );
    return rows.join("\n");
  };

  const copyToClipboard = (dataSource) => {
    const text = getTableDataAsString(dataSource);
    if (textareaRef.current) {
      textareaRef.current.value = text;
      textareaRef.current.select();
      textareaRef.current.setSelectionRange(0, 99999);
      document.execCommand("copy");
      message.success("Table data copied to clipboard!");
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
              <p>条数：{dataSource[item.key].total}</p>
              <Table
                columns={columns}
                dataSource={dataSource[item.key].data}
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
