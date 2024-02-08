import { ExpendiItem, useExpendiContext } from "@/context/ExpendiState";
import { Flex } from "antd";
import dayjs from "dayjs";
import React from "react";

const ExpendiListCard = ({
  expendi,
  search,
  handleDeleteExpendi,
}: {
  expendi: ExpendiItem;
  search: boolean;
  handleDeleteExpendi: (id:string) => void;
}) => {

  return (
    <div className="listCard bg-white py-2 px-4 rounded-lg mb-4 shadow shadow-gray">
      <Flex justify="space-between" align="center">
        <div>
          <h1 className="text-lg font-semibold">₹{expendi.amount}</h1>
          <p className="text-slate-600 text-sm">{expendi.payee}</p>
        </div>
        <p>{dayjs(expendi.date).format("D MMM, YYYY")}</p>
      </Flex>
      <Flex
        align="center"
        justify="space-between"
        className="detail mt-2 border-t border-slate-300 py-1 "
      >
        <div className="reason grow">
          <p className="text-wrap text-gray-700 text-sm">{expendi.reason}</p>
        </div>
        <div className="deleteIcon">
          <p
            className="text-red-600 w-[30px] h-[30px] rounded-full hover:bg-slate-200 cursor-pointer p-[8px]"
            onClick={async () => {
              handleDeleteExpendi(expendi._id)
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              fill="currentcolor"
              style={{ transform: "translateY(-1.2px)" }}
            >
              <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
            </svg>
          </p>
        </div>
      </Flex>
    </div>
  );
};

export default ExpendiListCard;
