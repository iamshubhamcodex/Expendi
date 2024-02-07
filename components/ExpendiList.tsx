import React from "react";
import ExpendiListCard from "./ExpendiListCard";
import { ExpendiItem, useExpendiContext } from "@/context/ExpendiState";
import { Empty, Flex, Skeleton, Space } from "antd";
import { getUniqId } from "@/utils/utility";

type ExpendiListSearchType = {
  search: boolean;
  searchExpendi: ExpendiItem[] | undefined;
};
type ExpendiList = ExpendiListSearchType | {};
const isExpendiListSearchType = (
  props: ExpendiList
): props is ExpendiListSearchType => {
  return (props as ExpendiListSearchType).search !== undefined;
};

const ExpendiList = (props: ExpendiList) => {
  const { expendi } = useExpendiContext();
  const isSearchEnabled = isExpendiListSearchType(props);
  const itemsToRender = isSearchEnabled ? props.searchExpendi : expendi

  return (
    <div className="h-[70vh] overflow-auto pr-2 expendiList">
      {!itemsToRender && (
        <>
          <div className="bg-white py-3 px-4 rounded-lg mb-3">
            <Flex justify="space-between" align="center">
              <div>
                <Skeleton.Button active size={"small"} className="mb-1" />
                <Skeleton.Input active size="small" />
              </div>
              <Skeleton.Input active size="small" />
            </Flex>
          </div>
          <div className="bg-white py-3 px-4 rounded-lg">
            <Flex justify="space-between" align="center">
              <div>
                <Skeleton.Button active size={"small"} className="mb-1" />
                <Skeleton.Input active size="small" />
              </div>
              <Skeleton.Input active size="small" />
            </Flex>
          </div>
        </>
      )}
      {itemsToRender && itemsToRender.length === 0 && (
        <div className="bg-white rounded-lg py-4 px-2">
          <Empty />
        </div>
      )}
      {itemsToRender &&
        itemsToRender.length > 0 &&
        itemsToRender.map((expend, i) => {
          return (
            <ExpendiListCard key={expend._id ?? getUniqId()} expendi={expend} />
          );
        })}
    </div>
  );
};

export default ExpendiList;
