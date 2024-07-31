import React, { useState } from "react";
import moment from "moment";
import axios from "axios";
import { message, Button, Upload, Table, Divider, FloatButton } from "antd";
import { UploadOutlined, CopyOutlined } from "@ant-design/icons";
import * as Comm from "../common";

const SalesPage = () => {
  const [dataSource, setDataSource] = useState([]);
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
            (v) => v["时间"] && v["包厢号"]
          );
        });
        handleDataSource(dataSource);
        message.success("File uploaded successfully!");
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        message.error("File upload failed.");
      });

    return false; // Prevent default upload behavior
  };

  const handleDataSource = (data) => {
    let dataSource = [];
    Object.keys(data).forEach((key) => {
      const total = Comm.getSum(data[key].data, "实付金额", 2);
      dataSource = [
        ...dataSource,
        ...data[key].data.map((v, i) => ({
          ...v,
          序号: dataSource.length + i + 1,
          时间: moment("2024." + key).format("YYYY-MM-DD"),
          日合计: i === 0 ? total : null,
        })),
      ];
    });
    setDataSource(dataSource);
  };

  const columns = [
    {
      title: "序号",
      dataIndex: "序号",
      key: "序号",
    },
    {
      title: "时间",
      dataIndex: "时间",
      key: "时间",
    },
    {
      title: "包厢号",
      dataIndex: "包厢号",
      key: "包厢号",
    },
    {
      title: "应付金额",
      dataIndex: "应付金额",
      key: "应付金额",
    },
    {
      title: "实付金额",
      dataIndex: "实付金额",
      key: "实付金额",
    },
    {
      title: "优惠金额",
      dataIndex: "优惠金额",
      key: "优惠金额",
    },
    {
      title: "酒水",
      children: [
        {
          title: "品名",
          dataIndex: "品名",
          key: "品名",
        },
        {
          title: "数量",
          dataIndex: "数量",
          key: "数量",
        },
        {
          title: "金额",
          dataIndex: "金额",
          key: "金额",
        },
      ],
    },
    {
      title: "包厢预定人",
      dataIndex: "包厢预定人",
      key: "包厢预定人",
    },
    {
      title: "点餐",
      dataIndex: "点餐",
      key: "点餐",
    },
    {
      title: "付款方式",
      children: [
        {
          title: "收银通",
          dataIndex: "收银通",
          key: "收银通",
        },
        {
          title: "挂账",
          dataIndex: "挂账",
          key: "挂账",
        },
        {
          title: "现金",
          dataIndex: "现金",
          key: "现金",
        },
        {
          title: "POS机",
          dataIndex: "POS机",
          key: "POS机",
        },
        {
          title: "会员扣卡",
          dataIndex: "会员扣卡",
          key: "会员扣卡",
        },
        {
          title: "手机微信",
          dataIndex: "手机微信",
          key: "手机微信",
        },
        {
          title: "美团劵",
          dataIndex: "美团劵",
          key: "美团劵",
        },
        {
          title: "代金券",
          dataIndex: "代金券",
          key: "代金券",
        },
      ],
    },
    {
      title: "付款方式",
      dataIndex: "付款方式",
      key: "付款方式",
    },
    {
      title: "备注",
      dataIndex: "备注",
      key: "备注",
    },
    {
      title: "日合计",
      dataIndex: "日合计",
      key: "日合计",
    },
  ];

  const exportColumns = [
    {
      title: "序号",
      dataIndex: "序号",
      key: "序号",
    },
    {
      title: "时间",
      dataIndex: "时间",
      key: "时间",
    },
    {
      title: "包厢号",
      dataIndex: "包厢号",
      key: "包厢号",
    },
    {
      title: "应付金额",
      dataIndex: "应付金额",
      key: "应付金额",
    },
    {
      title: "实付金额",
      dataIndex: "实付金额",
      key: "实付金额",
    },
    {
      title: "优惠金额",
      dataIndex: "优惠金额",
      key: "优惠金额",
    },
    {
      title: "品名",
      dataIndex: "品名",
      key: "品名",
    },
    {
      title: "数量",
      dataIndex: "数量",
      key: "数量",
    },
    {
      title: "金额",
      dataIndex: "金额",
      key: "金额",
    },
    {
      title: "包厢预定人",
      dataIndex: "包厢预定人",
      key: "包厢预定人",
    },
    {
      title: "点餐",
      dataIndex: "点餐",
      key: "点餐",
    },
    {
      title: "收银通",
      dataIndex: "收银通",
      key: "收银通",
    },
    {
      title: "挂账",
      dataIndex: "挂账",
      key: "挂账",
    },
    {
      title: "现金",
      dataIndex: "现金",
      key: "现金",
    },
    {
      title: "POS机",
      dataIndex: "POS机",
      key: "POS机",
    },
    {
      title: "会员扣卡",
      dataIndex: "会员扣卡",
      key: "会员扣卡",
    },
    // {
    //   title: "手机微信",
    //   dataIndex: "手机微信",
    //   key: "手机微信",
    // },
    // {
    //   title: "美团劵",
    //   dataIndex: "美团劵",
    //   key: "美团劵",
    // },
    // {
    //   title: "代金券",
    //   dataIndex: "代金券",
    //   key: "代金券",
    // },
    {
      title: "付款方式",
      dataIndex: "付款方式",
      key: "付款方式",
    },
    {
      title: "备注",
      dataIndex: "备注",
      key: "备注",
    },
    {
      title: "日合计",
      dataIndex: "日合计",
      key: "日合计",
    },
  ];

  const showHeader = () => {
    return <div>111</div>;
  };

  const getTableDataAsString = (data) => {
    const exportCols = [...exportColumns];
    let dataSource = data.map((v) => ({
      ...v,
      时间: moment(v["时间"]).format("YYYY/MM/DD"),
    }));
    const rows = dataSource.map((row) =>
      exportCols.map((col) => row[col.dataIndex] ?? "").join("\t")
    );
    return rows.join("\n");
  };

  const copyToClipboard = async () => {
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
    <div>
      <Upload beforeUpload={handleUpload} showUploadList={false}>
        <Button icon={<UploadOutlined />}>上传采购</Button>
      </Upload>
      <Divider />
      <Table
        columns={columns}
        dataSource={dataSource || []}
        header={showHeader}
        pagination={false}
      />
      <FloatButton
        onClick={copyToClipboard}
        icon={<CopyOutlined />}
        type="primary"
        style={{
          right: 54,
        }}
      />
    </div>
  );
};

export default SalesPage;
