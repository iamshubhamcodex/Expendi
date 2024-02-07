import { Button, DatePicker, Form, Space } from "antd";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
import { ExpendiItem, useExpendiContext } from "@/context/ExpendiState";
import useLocalStorage from "@/utils/hooks/useLocalStorage";

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);

const initialFormSearchValues = {
  rangeDate: [dayjs(), dayjs()],
};
const dateFormat = "YYYY-MM-DD";

const ExpendiSearchBar = ({
  setSearchExpendi,
}: {
  setSearchExpendi: (expend?: ExpendiItem[]) => void;
}) => {
  const { expendi } = useExpendiContext();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearchSubmit = useCallback(
    (e: typeof initialFormSearchValues) => {
      const startDate = e.rangeDate[0];
      const endDate = e.rangeDate[1];

      setLoading(true);
      setSearchExpendi();

      setTimeout(() => {
        setSearchExpendi(
          expendi
            ? expendi.filter((expend) => {
                return (
                  dayjs(expend.date).isSame(startDate, "date") ||
                  dayjs(expend.date).isSame(endDate, "date") ||
                  dayjs(expend.date).isBetween(startDate, endDate)
                );
              })
            : []
        );
        setLoading(false);
      }, 2000);
    },
    [expendi, setSearchExpendi]
  );

  useEffect(() => {
    handleSearchSubmit({ rangeDate: [dayjs(), dayjs()] });
  }, [handleSearchSubmit]);

  return (
    <div className="bg-white py-2 px-5 rounded-xl mb-4 shadow-xl">
      <Form
        onFinish={handleSearchSubmit}
        form={form}
        initialValues={initialFormSearchValues}
      >
        <Space>
          {/* <Form.Item className="!mb-2" name={"startDate"} noStyle>
            <DatePicker />
          </Form.Item>
          <Form.Item className="!mb-2" name={"endDate"} noStyle>
            <DatePicker />
          </Form.Item> */}
          <Form.Item name={"rangeDate"} noStyle>
            <DatePicker.RangePicker format={dateFormat} />
          </Form.Item>
          <Form.Item className="!mb-0">
            <Button type="primary" htmlType="submit" loading={loading}>
              Search
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </div>
  );
};

export default ExpendiSearchBar;
