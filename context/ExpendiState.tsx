import React, { PropsWithChildren, useContext, useState } from "react";
import useAfterMount from "@/utils/hooks/useAfterMount";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import { getUniqId } from "@/utils/utility";
import { Dayjs } from "dayjs";

export type ExpendiItem = {
  _id: string;
  amount: 0;
  date: Dayjs;
  reason: string;
  payee: string;
};
type ExpendiContextType = {
  expendi: ExpendiItem[] | undefined;
  saveExpendi: (expendi: ExpendiItem) => void;
  getExpendi: () => ExpendiItem[];
};
export const ExpendiContext = React.createContext<ExpendiContextType | null>(
  null
);

export const ExpendiState = ({ children }: PropsWithChildren) => {
  const [expendi, setExpendi] = useState<ExpendiItem[]>();
  const { setItem, getItem } = useLocalStorage<ExpendiItem[]>("expendi");

  const saveExpendi = ({ amount, date, reason, payee }: ExpendiItem): void => {
    const expendiTempItem: ExpendiItem = {
      _id: getUniqId(),
      amount,
      date,
      reason,
      payee,
    };
    setExpendi((prevExpendi) => {
      if (prevExpendi) {
        setItem([expendiTempItem, ...prevExpendi]);
        return [expendiTempItem, ...prevExpendi];
      }
      return prevExpendi;
    });
  };
  const getExpendi = (): ExpendiItem[] => {
    const localExpendiItems: ExpendiItem[] | undefined = getItem();
    if (localExpendiItems) return localExpendiItems;
    return expendi ?? [];
  };
  const checkForLocalAndGet = (): void => {
    setExpendi(getExpendi());
  };

  useAfterMount(() => {
    checkForLocalAndGet();
  });

  return (
    <ExpendiContext.Provider value={{ expendi, saveExpendi, getExpendi }}>
      {children}
    </ExpendiContext.Provider>
  );
};

export const useExpendiContext = () => {
  const expendiItems = useContext(ExpendiContext);
  if (!expendiItems) {
    throw new Error("You are accessing ExpendiContext out of ExpendiProvider");
  }
  return expendiItems;
};
