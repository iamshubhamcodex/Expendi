"use client";

import ExpendiSearchList from "@/components/ExpendiSearchList";
import { ExpendiState } from "@/context/ExpendiState";
import { Flex } from "antd";
import React from "react";

const Home = () => {
  return (
    <ExpendiState>
      <Flex
        gap={25}
        justify="center"
        align="start"
        className="pt-[17vh] min-h-screen"
        wrap="wrap"
      >
        <ExpendiSearchList />
      </Flex>
    </ExpendiState>
  );
};

export default Home;
