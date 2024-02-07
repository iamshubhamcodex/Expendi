import { ExpendiItem } from "@/context/ExpendiState";
import { Flex } from "antd";
import dayjs from "dayjs";
import React from "react";

const ExpendiListCard = ({expendi} : {expendi: ExpendiItem}) => {
  return (
    <div className="listCard bg-white py-2 px-4 rounded-lg mb-4 shadow shadow-gray">
      <Flex justify="space-between" align="center">
        <div>
          <h1 className="text-lg font-semibold">₹{expendi.amount}</h1>
          <p className="text-slate-600 text-sm">{expendi.payee}</p>
        </div>
        <p>{dayjs(expendi.date).format('D MMM, YYYY')}</p>
      </Flex>
      <div className="reason mt-4 pt-2 border-t border-slate-300">
        <p className="text-wrap text-gray-700 text-sm">{expendi.reason}</p>
      </div>
    </div>
  );
};

export default ExpendiListCard;
