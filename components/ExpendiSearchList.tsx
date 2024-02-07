import React, { useState } from "react";
import ExpendiSearchBar from "./ExpendiSearchBar";
import ExpendiList from "./ExpendiList";
import { ExpendiItem } from "@/context/ExpendiState";

const ExpendiSearchList = () => {
  const [searchExpendi, setSearchExpendi] = useState<ExpendiItem[]>();
  
  return (
    <div>
      <ExpendiSearchBar setSearchExpendi={setSearchExpendi} />
      <ExpendiList search searchExpendi={searchExpendi}/>
    </div>
  );
};

export default ExpendiSearchList;
