import { Button, DatePicker, Form, Space } from "antd";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
import { ExpendiItem, useExpendiContext } from "@/context/ExpendiState";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import useAfterMount from "@/utils/hooks/useAfterMount";

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);

const initialFormSearchValues = {
  rangeDate: [dayjs(), dayjs()],
};
const dateFormat = "YYYY-MM-DD";

const ExpendiSearchBar = () => {
  const { searchExpendi, loading, setSearchExpendiList } = useExpendiContext();
  const [form] = Form.useForm();
  // const [loading, setLoading] = useState<boolean>(false);

  const handleSearchSubmit = useCallback(
    (e: typeof initialFormSearchValues) => {
      const startDate = e.rangeDate[0];
      const endDate = e.rangeDate[1];

      // setLoading(true);

      searchExpendi({
        startDate: startDate.toString(),
        endDate: endDate.toString(),
      })
        .then((expendi) => {
          setSearchExpendiList(expendi);
        })
        .catch((err) => {
          alert("Error");
        })
        .finally(() => {
          // setLoading(false);
        });
    },
    [setSearchExpendiList, searchExpendi]
  );

  useAfterMount(() => {
    handleSearchSubmit({ rangeDate: [dayjs(), dayjs()] });
  });

  return (
    <div className="bg-white py-2 px-5 rounded-xl mb-4 shadow-xl">
      <Form
        onFinish={handleSearchSubmit}
        form={form}
        initialValues={initialFormSearchValues}
      >
        <Space>
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
