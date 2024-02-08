import React, { useState } from "react";
import { SaveOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Space } from "antd";
import { ExpendiItem, useExpendiContext } from "@/context/ExpendiState";
import dayjs from "dayjs";
import axios from "axios";

const initialFormDataValues = {
  amount: 0,
  date: dayjs(),
  reason: "",
  payee: "",
};
const ExpendiForm = () => {
  const [form] = Form.useForm<ExpendiItem>();
  const { saveExpendi, loading } = useExpendiContext();

  const saveData = async () => {
    saveExpendi(form.getFieldsValue(), emptyFormData);
  };
  const emptyFormData = (): void => {
    form.resetFields();
  };
  return (
    <div className="border border-[#e0e0e0] p-4 rounded-lg bg-white shadow-lg">
      <Form
        labelCol={{ span: 8 }}
        layout="vertical"
        scrollToFirstError
        initialValues={initialFormDataValues}
        onFinish={saveData}
        form={form}
      >
        <Form.Item className="!mb-2" label="Amount">
          <Space.Compact>
            <Form.Item
              name={"amount"}
              noStyle
              rules={[
                {
                  required: true,
                },
                () => ({
                  validator(_, value) {
                    if (value || value > 0) return Promise.resolve();

                    return Promise.reject(
                      new Error("Amount must be greater than zero")
                    );
                  },
                }),
              ]}
            >
              <Input
                prefix={"₹"}
                style={{ width: "50%", WebkitAppearance: "textfield" }}
                placeholder="Enter Amount"
                type="number"
              />
            </Form.Item>
            <Form.Item className="!mb-2" name={"date"} noStyle>
              <DatePicker />
            </Form.Item>
          </Space.Compact>
        </Form.Item>
        <Form.Item className="!mb-2" label="Reason" name={"reason"}>
          <Input placeholder="Enter Reason for amount" />
        </Form.Item>
        <Form.Item
          className="!mb-2"
          label="To Whom"
          name={"payee"}
          rules={[{ required: true, message: "Payee is required" }]}
        >
          <Input placeholder="Enter person name" />
        </Form.Item>
        <Form.Item className="!mb-0">
          <Button
            icon={<SaveOutlined />}
            loading={loading}
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ExpendiForm;
