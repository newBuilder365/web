import React, { useState } from "react";
import moment from "moment";
import { Upload, Button, message, Tabs } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import PurchaseTable from "./PurchaseTable";
import PurchaseFinalTable from "./PurchaseFinalTable";
import "./index.css";
const { TabPane } = Tabs;

const ExcelUploader = () => {
  const [dataSource, setDataSource] = useState([]);
  const [finalDataSource, setFinalDataSource] = useState([]);
  const [otherDataSource, setOtherDataSource] = useState([]);

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

  const getDataSource = (dataSource) => {
    let flatData = [];
    let finalTotal = 0;
    Object.keys(dataSource).forEach((key) => {
      dataSource[key]["data"] = dataSource[key].data.filter(
        (v) => v["菜品"] && v["菜品"] !== "菜品"
      );
      dataSource[key]["total"] = dataSource[key].data.length;
      flatData = [
        ...flatData,
        ...dataSource[key].data.map((c) => ({
          ...c,
          dateKey: dataSource[key],
          时间: moment(c["时间"]).format("YYYY/MM/DD"),
        })),
      ];
    });
    groupTitle.forEach((item) => {
      flatData.forEach((v) => {
        if (isTrue(item, v["经办人"])) {
          v.groupKey = "经办人";
        }
        if (isTrue(item, v["供应商"])) {
          v.groupKey = "供应商";
        }
        if (isTrue(item, v["付款情况"])) {
          v.groupKey = "付款情况";
        }
      });
    });
    let finalDataSource = {};
    groupTitle.forEach((item) => {
      finalDataSource[item.key] = {};
      finalDataSource[item.key]["data"] = flatData.filter(
        (v) =>
          isTrue(item, v["经办人"], v) ||
          isTrue(item, v["供应商"], v) ||
          isTrue(item, v["付款情况"], v)
      );
      finalDataSource[item.key]["total"] =
        finalDataSource[item.key]["data"].length;
      finalTotal += finalDataSource[item.key]["data"].length;
    });
    dataSource["total"] = flatData.length;
    finalDataSource["total"] = finalTotal;
    setDataSource(dataSource);
    setFinalDataSource(finalDataSource);
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
        getDataSource(response.data);
        message.success("File uploaded successfully!");
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        message.error("File upload failed.");
      });

    return false; // Prevent default upload behavior
  };
  return (
    <Tabs
      type="card"
      style={{ height: 300 }}
      tabBarExtraContent={
        <Upload beforeUpload={handleUpload} showUploadList={false}>
          <Button icon={<UploadOutlined />}>上传采购</Button>
        </Upload>
      }
    >
      <TabPane tab={`原始采购数据(${dataSource.total ?? 0})`} key="1">
        <div className="tabContent">
          <PurchaseTable data={dataSource} />
        </div>
      </TabPane>
      <TabPane tab={`处理后采购数据(${finalDataSource.total ?? 0})`} key="2">
        <div className="tabContent">
          <PurchaseFinalTable data={finalDataSource} />
        </div>
      </TabPane>
    </Tabs>
  );
};

export default ExcelUploader;
