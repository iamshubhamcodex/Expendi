import React, { PropsWithChildren, useContext, useState } from "react";
import useAfterMount from "@/utils/hooks/useAfterMount";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import { getUniqId } from "@/utils/utility";
import { Dayjs } from "dayjs";
import axios from "axios";

export type ExpendiItem = {
  _id: string;
  amount: 0;
  date: Dayjs;
  reason: string;
  payee: string;
};
type StringRecord = Record<string, string>;
type ExpendiContextType = {
  loading: boolean;
  expendi: ExpendiItem[] | undefined;
  searchExpendiList: ExpendiItem[] | undefined;
  setSearchExpendiList: (expendi: ExpendiItem[]) => void;
  saveExpendi: (expendi: ExpendiItem, success?: () => void) => void;
  getExpendi: () => Promise<ExpendiItem[]>;
  searchExpendi: <T extends StringRecord>(body: T) => Promise<ExpendiItem[]>;
  deleteExpendi: (
    _id: string,
    where: "home" | "search"
  ) => Promise<void | ExpendiItem[]>;
};

export const ExpendiContext = React.createContext<ExpendiContextType | null>(
  null
);

export const ExpendiState = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(false);
  const [expendi, setExpendi] = useState<ExpendiItem[]>([]);
  const [searchExpendiList, setSearchExpendiList] = useState<ExpendiItem[]>([]);

  const saveExpendi = (body: ExpendiItem, success?: () => void): void => {
    setLoading(true);

    axios
      .post("/api/expendi", {
        ...body,
      })
      .then(({ data, status }) => {
        if (status === 200 && data) {
          success && success();

          const expendiTempItem: ExpendiItem = {
            ...body,
            _id: data.expendi._id ?? getUniqId(),
          };
          if (
            body.date.toISOString().split("T")[0] ===
            new Date().toISOString().split("T")[0]
          )
            setExpendi((prevExpendi) => {
              if (prevExpendi) {
                return [expendiTempItem, ...prevExpendi];
              }
              return prevExpendi;
            });
        } else {
          alert("Error");
        }
      })
      .catch(() => {
        alert("Error");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const encodeParametersToURL = <T extends StringRecord>(body: T): string => {
    let encodedString: string = "?";

    for (let key of Object.keys(body)) {
      encodedString += key + "=" + body[key] + "&";
    }

    return encodedString;
  };
  const searchExpendi = async <T extends StringRecord>(
    body?: T
  ): Promise<ExpendiItem[]> => {
    setLoading(true);
    let { data, status } = await axios.get<{ expendis: ExpendiItem[] }>(
      "/api/expendi" + (body ? encodeParametersToURL(body) : "")
    );

    setLoading(false);
    if (data && status === 200) {
      return data.expendis;
    }
    return [];
  };
  const getExpendi = async (): Promise<ExpendiItem[]> => {
    let localExpendiItems: ExpendiItem[] | undefined;

    if (!localExpendiItems)
      localExpendiItems = await searchExpendi({
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
      });

    setExpendi(localExpendiItems);
    return localExpendiItems ?? [];
  };
  const deleteExpendi = async (
    id: string,
    where: "home" | "search"
  ): Promise<void | ExpendiItem[]> => {
    fetch("http://localhost:3000/api/expendi", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then(({ data }) => {
        !data && alert("Error");
        if (data && where === "home") {
          setExpendi((expendi) => {
            const remExpendi = expendi.filter((expend) => {
              return expend._id !== id;
            });
            return remExpendi;
          });
        }
        if (data && where === "search") {
          setSearchExpendiList((expendi) => {
            return expendi.filter((expend) => {
              return expend._id !== id;
            });
          });
        }
      })
      .catch((e) => {
        alert("Error");
      });
  };

  useAfterMount(() => {
    getExpendi();
  });

  return (
    <ExpendiContext.Provider
      value={{
        expendi,
        searchExpendiList,
        setSearchExpendiList,
        saveExpendi,
        getExpendi,
        searchExpendi,
        loading,
        deleteExpendi,
      }}
    >
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
