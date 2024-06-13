import React, { useState, useEffect } from "react";
import {
  Table,
  Tag,
  FloatButton,
  Modal,
  Form,
  Input,
  message,
  Space,
  Button,
} from "antd";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

const PurchaseRules = () => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [localData, setLocalData] = useState(() => {
    const dcy = window.localStorage.getItem("dcy");
    return dcy ? JSON.parse(dcy) : [];
  });

  const onCreate = ({ value, search }) => {
    let newData = [...localData];
    if (isEditing) {
      // Editing existing record
      const index = newData.findIndex((v) => v.key === currentRecord.key);
      if (index !== -1) {
        newData[index] = {
          value,
          key: value,
          search: search.split("，"),
        };
      }
    } else {
      // Adding new record
      const item = newData.some((v) => v.key === value);
      if (item) {
        return message.error("分组名称重复");
      }
      newData.push({
        value,
        key: value,
        search: search.split("，"),
      });
    }
    window.localStorage.setItem("dcy", JSON.stringify(newData));
    setLocalData(newData);
    setOpen(false);
    form.resetFields();
  };

  const onDelete = (key) => {
    const newData = localData.filter((item) => item.key !== key);
    window.localStorage.setItem("dcy", JSON.stringify(newData));
    setLocalData(newData);
    message.success("删除成功");
  };

  const columns = [
    {
      title: "分组名称",
      dataIndex: "value",
      key: "key",
    },
    {
      title: "分组规则",
      dataIndex: "search",
      key: "search",
      render: (_, { search }) => (
        <>
          {search.map((tag) => {
            return (
              <Tag color={"geekblue"} key={tag}>
                {tag}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 200,
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Button
            title="编辑"
            size="small"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setIsEditing(true);
              setCurrentRecord(record);
              setOpen(true);
              form.setFieldsValue({
                value: record.value,
                search: record.search.join("，"),
              });
            }}
          />
          <Button
            title="删除"
            size="small"
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record.key)}
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    if (!open) {
      form.resetFields();
      setIsEditing(false);
      setCurrentRecord(null);
    }
  }, [open, form]);

  return (
    <>
      <Table columns={columns} dataSource={localData} pagination={false} />
      <FloatButton
        onClick={() => {
          setIsEditing(false);
          setOpen(true);
        }}
        icon={<PlusCircleOutlined />}
        type="primary"
        style={{
          right: 54,
        }}
      />
      <Modal
        open={open}
        title={isEditing ? "编辑规则" : "创建规则"}
        okText="确定"
        cancelText="取消"
        onCancel={() => setOpen(false)}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
        destroyOnClose
      >
        <Form
          layout="vertical"
          form={form}
          name="form_in_modal"
          initialValues={{
            value: "public",
            search: "123",
          }}
        >
          <Form.Item
            name="value"
            label="分组名称"
            rules={[
              {
                required: true,
                message: "分组名称不能为空!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="search"
            label="分组规则"
            rules={[
              {
                required: true,
                message: "分组规则不能为空!",
              },
            ]}
          >
            <Input.TextArea placeholder="以逗号隔开" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PurchaseRules;
