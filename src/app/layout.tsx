import type { Metadata } from "next";
import {Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Navber from "@/component/Navber";

const Notoserifbengali = Noto_Serif_Bengali({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Noto_Serif_Bengali({

  subsets: ["latin" , "bengali"],
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${Notoserifbengali.className}  h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navber />
        {children}
        </body>
    </html>
  );
}
