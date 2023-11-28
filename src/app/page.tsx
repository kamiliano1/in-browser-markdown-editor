"use client";
import Image from "next/image";
import Button from "../layout/Button/Button";
import ThemeSwitch from "../layout/ThemeSwitch/ThemeSwitch";
import InputText from "../layout/InputText/InputText";
import Navbar from "../layout/Navbar/Navbar";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <main className="p-5">
      <button className="bg-100" onClick={() => setOpen((prev) => !prev)}>
        Zmiana
      </button>
      {/* <Button>Test</Button> */}
      {/* <ThemeSwitch /> */}
      {/* <InputText /> */}
      {/* <Navbar /> */}
      <div className="bg-600 m-5 relative w-[30px] flex flex-col gap-[4px]">
        <span
          className={`w-full h-[1.53px] bg-300 ${
            open ? "animate-closeIconAfter rotate-45" : "animate-openIconAfter"
          }`}
        ></span>
        <span
          className={`w-full h-[1.53px] bg-300 ${
            open ? "animate-closeIcon opacity-0" : "animate-openIcon"
          }`}
        ></span>
        <span
          className={`w-full h-[1.53px] bg-300 ${
            open
              ? "animate-closeIconBefore rotate-[-45deg] -translate-y-[10px]"
              : "animate-openIconBefore"
          }`}
        ></span>
      </div>
    </main>
  );
}

// ${
//   open
//     ? "after:animate-closeIconAfter before:animate-closeIconBefore before:rotate-45 after:rotate-[-45deg] "
//     : ""
// }
// top: 0.25em;
//   width: 1em;

// after:animate-closeIconAfter before:animate-closeIconBefore after:rotate-45 before:rotate-[135deg] before:translate-y-[-10px] "
