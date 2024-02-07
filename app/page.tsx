"use client";

import ExpendiForm from "@/components/ExpendiForm";
import ExpendiList from "@/components/ExpendiList";
import { ExpendiState } from "@/context/ExpendiState";
import { Button, Flex } from "antd";
import Link from "next/link";

export default function Home() {
  return (
    <ExpendiState>
      <Flex
        gap={25}
        justify="center"
        align="start"
        className="pt-[20vh] min-h-screen"
        wrap="wrap"
      >
        <div className="mb-6">
          <h1 className="text-xl font-bold mb-3" style={{ color: "black" }}>
            Add Expendi
          </h1>
          <ExpendiForm />
        </div>
        <div className="min-w-[300px] w-[300px]">
          <Flex justify="space-between" align="center" className="pr-4">
            <h1 className="text-xl font-bold mb-3" style={{ color: "black" }}>
              Today&apos;s Expendi
            </h1>
            <Button ghost type="primary" size="small">
              <Link href={"/search"}>
              Search
              </Link>
            </Button>
          </Flex>
          <ExpendiList />
        </div>
      </Flex>
    </ExpendiState>
  );
}
