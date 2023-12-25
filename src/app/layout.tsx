import type { Metadata } from "next";
import { Roboto, Roboto_Slab, Roboto_Mono } from "next/font/google";
import "./globals.css";
import RecoilProvider from "./RecoilProvider";

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
  weight: "400",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-slab",
  weight: ["300", "400", "700"],
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
  weight: "400",
});
export const metadata: Metadata = {
  title: "In-browser markdown editor",
  description: "Frontend Mentor challenge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${robotoMono.variable} ${robotoSlab.variable} ${roboto.variable}`}
    >
      <RecoilProvider>
        <body>{children}</body>
      </RecoilProvider>
    </html>
  );
}
