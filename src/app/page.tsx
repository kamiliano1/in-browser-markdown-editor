"use client";
import Image from "next/image";
import Button from "../layout/Button/Button";
import ThemeSwitch from "../layout/ThemeSwitch/ThemeSwitch";
import InputText from "../layout/InputText/InputText";
import Navbar from "../layout/Navbar/Navbar";
import { useState } from "react";
import HamburgerIcon from "@/layout/Navbar/HamburgerIcon";

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <main className="">
      {/* <Button>Test</Button> */}
      {/* <ThemeSwitch /> */}
      {/* <InputText /> */}
      <Navbar open={open} setOpen={setOpen} />
      <div className={`relative z-[-1] w-full h-[100vh] bg-500`}>
        <div
          className={`absolute top-0 left-0 z-[20] pt-[56px] sm:pt-[72px] 
          ${open && " translate-x-[250px] "}
          `}
        >
          <h2 className="">aaaaaaaaaa</h2>
        </div>
      </div>
    </main>
  );
}
