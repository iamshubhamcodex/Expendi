import React from "react";
import ExpendiListCard from "./ExpendiListCard";
import { ExpendiItem, useExpendiContext } from "@/context/ExpendiState";
import { Empty, Flex, Skeleton, Space } from "antd";
import { getUniqId } from "@/utils/utility";

type ExpendiListSearchType = {
  search?: boolean;
};
// type ExpendiList = ExpendiListSearchType | {};
// const isExpendiListSearchType = (
//   props: ExpendiList
// ): props is ExpendiListSearchType => {
//   return (props as ExpendiListSearchType).search !== undefined;
// };
// const getSetSearchExpendi = (
//   props: ExpendiList
// ) => {
//   return (props as ExpendiListSearchType).setSearchExpendi;
// };
const ExpendiList = ({ search }: ExpendiListSearchType) => {
  const { expendi, loading, searchExpendiList, deleteExpendi } =
    useExpendiContext();
  // const isSearchEnabled = isExpendiListSearchType(props);
  const isSearchEnabled = search ?? false;
  const itemsToRender = isSearchEnabled ? searchExpendiList : expendi;

  const handleDeleteExpendi = async (id: string) => {
    await deleteExpendi(id, search ? "search" : "home");
  };
  return (
    <div className="h-[70vh] overflow-auto pr-2 expendiList">
      {loading && (
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
      {!loading && itemsToRender && itemsToRender.length === 0 && (
        <div className="bg-white rounded-lg py-4 px-2">
          <Empty />
        </div>
      )}
      {itemsToRender &&
        itemsToRender.length > 0 &&
        itemsToRender.map((expend, i) => {
          return (
            <ExpendiListCard
              key={expend._id ?? getUniqId()}
              expendi={expend}
              search={isSearchEnabled}
              handleDeleteExpendi={handleDeleteExpendi}
            />
          );
        })}
    </div>
  );
};

export default ExpendiList;
