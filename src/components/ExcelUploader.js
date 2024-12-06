import React, { useState, useEffect } from "react";
import { Upload, Button, message, Tabs, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import PurchaseTable from "./PurchaseTable";
import PurchaseFinalTable from "./PurchaseFinalTable";
import PurchaseUnHandleTable from "./PurchaseUnHandleTable";
import PurchaseRules from "./PurchaseRules";
import "./index.css";
const { TabPane } = Tabs;

const ExcelUploader = () => {
  const [uploadData, setUploadData] = useState({});
  const [flatData, setFlatData] = useState([]);
  const [finalTotal, setFinalTotal] = useState(0);
  const [finalDataSource, setFinalDataSource] = useState([]);
  const [otherDataSource, setOtherDataSource] = useState([]);
  const [groupTitle, setGroupTitle] = useState(() => {
    const dcy = window.localStorage.getItem("dcy");
    return dcy
      ? JSON.parse(dcy)
      : [
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
  });
  const oldData = [
    {
      search: ["陶总", "陶总付"],
      key: "陶河",
      value: "陶河",
    },
    {
      search: ["双岗蔬菜"],
      key: "双岗蔬菜",
      value: "双岗蔬菜",
    },
    {
      search: ["金老板"],
      key: "水产金",
      value: "水产金",
    },
    {
      search: ["双岗王燕", "干货王燕"],
      key: "王燕干货",
      value: "王燕干货",
    },
    {
      search: ["锦泽商贸"],
      key: "啤泽商贸啤酒",
      value: "啤泽商贸啤酒",
    },
    {
      search: ["老鸡李军军"],
      key: "李军军",
      value: "李军军",
    },
    {
      search: ["猪肉陈松", "陈松"],
      key: "猪肉陈",
      value: "猪肉陈",
    },
    {
      search: ["李涛"],
      key: "李涛牛肉",
      value: "李涛牛肉",
    },
    {
      search: ["庞雪萍"],
      key: "庞雪萍",
      value: "庞雪萍",
    },
    {
      search: ["零散单"],
      key: "零散单",
      value: "零散单",
    },
    {
      search: ["日盛海参"],
      key: "日盛海参",
      value: "日盛海参",
    },
    {
      search: ["必九餐饮"],
      key: "必九餐饮",
      value: "必九餐饮",
    },
    {
      search: ["蒙牛"],
      key: "何声源蒙牛",
      value: "何声源蒙牛",
    },
    {
      search: ["新店"],
      key: "新店",
      value: "新店",
    },
    {
      search: ["荣凡商贸"],
      key: "荣凡商贸",
      value: "荣凡商贸",
    },
  ];

  const newData = [
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
    {
      search: ["零散单"],
      key: "零散单",
      value: "零散单",
    },
  ];

  useEffect(() => {
    const dcy = window.localStorage.getItem("dcy");
    if (dcy) {
      setGroupTitle(JSON.parse(dcy));
    } else {
      setGroupTitle(newData);
      window.localStorage.setItem("dcy", JSON.stringify(newData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFlatData = (dataSource) => {
    const flatData = Object.keys(dataSource).reduce((acc, key) => {
      const currentData = dataSource[key].data.map((c) => ({
        ...c,
        dateKey: key,
      }));
      return [...acc, ...currentData];
    }, []);

    const updatedFlatData = flatData.map((v) => {
      let updatedRecord = { ...v };
      let groupNewTitle = groupTitle;
      let dcy = window.localStorage.getItem("dcy");
      if (dcy) {
        groupNewTitle = JSON.parse(dcy);
        setGroupTitle(groupNewTitle);
      }
      for (const item of groupNewTitle) {
        if (isTrue(item, v["供应商"])) {
          updatedRecord = {
            ...updatedRecord,
            groupKey: "供应商",
            groupValue: item.value,
          };
          break;
        }
        if (isTrue(item, v["经办人"])) {
          updatedRecord = {
            ...updatedRecord,
            groupKey: "经办人",
            groupValue: item.value,
          };
          break;
        }
        if (isTrue(item, v["付款情况"])) {
          updatedRecord = {
            ...updatedRecord,
            groupKey: "付款情况",
            groupValue: item.value,
          };
          break;
        }
      }

      return updatedRecord;
    });
    const otherDataSource = updatedFlatData.filter((v) => !v.groupKey);
    const finalDataSource = getFinalTable(updatedFlatData);
    setFlatData(updatedFlatData);
    setOtherDataSource(otherDataSource);
    setFinalDataSource(finalDataSource);
  };

  const getFinalTable = (updatedFlatData) => {
    let data = updatedFlatData.filter((v) => v.groupKey);
    setFinalTotal(data.length);
    const dataSource = data.map((item) => {
      const updatedItem = { ...item };
      if (updatedItem.groupKey && updatedItem.groupValue) {
        // 备份原始值
        updatedItem.originalValue = updatedItem[updatedItem.groupKey];
        // 替换值
        updatedItem[updatedItem.groupKey] = updatedItem.groupValue;
      }
      return updatedItem;
    });
    return dataSource.reduce((acc, item) => {
      const groupValue = item.groupValue;
      if (!acc[groupValue]) {
        acc[groupValue] = [];
      }
      acc[groupValue].push(item);
      return acc;
    }, {});
  };

  const isTrue = (item, value, v) => {
    const flag = item?.search?.some((v) => value?.includes(v));
    if (flag) {
    }
    return flag;
  };

  const handleUpload = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://localhost:3001/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Uploaded Data:", response.data);
        let dataSource = response.data;
        Object.keys(dataSource).forEach((key) => {
          dataSource[key]["data"] = dataSource[key].data?.filter(
            (v) =>
              (v["菜品"] && v["菜品"] !== "菜品" && v["时间"]) ||
              v["数量"] === "优惠"
          );
          dataSource[key]["data"] = dataSource[key].data?.map((v, i) =>
            v["数量"] === "优惠"
              ? {
                  ...v,
                  经办人: dataSource[key].data[i - 1]["经办人"] || "",
                  供应商: dataSource[key].data[i - 1]["供应商"] || "",
                  付款情况: dataSource[key].data[i - 1]["付款情况"] || "",
                  时间: dataSource[key].data[i - 1]["时间"] || "",
                }
              : v
          );
        });
        setUploadData(dataSource);
        getFlatData(dataSource);
        message.success("File uploaded successfully!");
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        message.error("File upload failed.");
      });

    return false; // Prevent default upload behavior
  };
  console.log("uploadData", uploadData);
  console.log("flatData", flatData);
  console.log("otherDataSource", otherDataSource);
  return (
    <Tabs
      type="card"
      style={{ height: 300 }}
      tabBarExtraContent={
        <Space size="middle">
          <Button onClick={() => getFlatData(uploadData)}>生成数据</Button>
          <Upload beforeUpload={handleUpload} showUploadList={false}>
            <Button icon={<UploadOutlined />}>上传采购</Button>
          </Upload>
          <Button
            onClick={() => {
              window.localStorage.setItem("dcy", JSON.stringify(oldData));
            }}
          >
            设置为老店
          </Button>
          <Button
            onClick={() => {
              window.localStorage.setItem("dcy", JSON.stringify(newData));
            }}
          >
            设置为新店
          </Button>
        </Space>
      }
    >
      <TabPane tab="处理规则设置" key="0">
        <div className="tabContent">
          <PurchaseRules />
        </div>
      </TabPane>
      <TabPane tab={`原始采购数据(${flatData.length ?? 0})`} key="1">
        <div className="tabContent">
          <PurchaseTable data={uploadData} flatData={flatData} />
        </div>
      </TabPane>
      <TabPane tab={`未处理数据(${otherDataSource.length ?? 0})`} key="2">
        <div className="tabContent">
          <PurchaseUnHandleTable data={otherDataSource} />
        </div>
      </TabPane>
      <TabPane tab={`处理后采购数据(${finalTotal ?? 0})`} key="3">
        <div className="tabContent">
          <PurchaseFinalTable data={finalDataSource} flatData={flatData} />
        </div>
      </TabPane>
    </Tabs>
  );
};

export default ExcelUploader;
