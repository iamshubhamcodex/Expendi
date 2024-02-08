import React, { useState } from "react";
import ExpendiSearchBar from "./ExpendiSearchBar";
import ExpendiList from "./ExpendiList";
import { ExpendiItem } from "@/context/ExpendiState";

const ExpendiSearchList = () => {
  return (
    <div>
      <ExpendiSearchBar />
      <ExpendiList search />
    </div>
  );
};

export default ExpendiSearchList;
