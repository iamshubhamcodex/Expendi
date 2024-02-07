import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { PropsWithChildren } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Expendi",
  description: "Track Your Expendiure(s)",
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ minHeight: "100vh" }}>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
