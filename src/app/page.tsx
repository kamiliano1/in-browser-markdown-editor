"use client";
import Image from "next/image";
import Button from "../layout/Button/Button";
import ThemeSwitch from "../layout/ThemeSwitch/ThemeSwitch";
import InputText from "../layout/InputText/InputText";
import Navbar from "../layout/Navbar/Navbar";
import { useState } from "react";
import HamburgerIcon from "@/layout/Navbar/HamburgerIcon";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import data from "./data/data.json";

type ActivatedPartType = "Markdown" | "Preview";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activatedPart, setActivatedPart] =
    useState<ActivatedPartType>("Markdown");

  const switchPart = () => {
    activatedPart === "Markdown"
      ? setActivatedPart("Preview")
      : setActivatedPart("Markdown");
  };
  return (
    <main className="overflow-hidden">
      <Navbar
        open={open}
        setOpen={setOpen}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
      <div
        className={`relative h-[100vh] ${!isDarkMode ? "bg-1000" : "bg-100"}`}
      >
        <div
          className={`absolute top-0 left-0 pt-[56px] sm:pt-[72px]  
              ${
                open
                  ? " translate-x-[250px] animate-markdownOpen sw-[calc(100%_-_250px)] w-full overflow-hidden"
                  : "animate-markdownClose w-full"
              }
              `}
        >
          <div
            className={`flex px-4 py-3  items-center ${
              !isDarkMode ? "bg-900" : "bg-200"
            } justify-between`}
          >
            <h1
              className={`text-headingS uppercase  ${
                !isDarkMode ? "text-400" : "text-500"
              }`}
            >
              {activatedPart === "Markdown" ? "Markdown" : "Preview"}
            </h1>
            {activatedPart === "Markdown" ? (
              <FiEye
                onClick={switchPart}
                className={`${!isDarkMode ? "text-400" : "text-500"}`}
              />
            ) : (
              <FiEyeOff
                onClick={switchPart}
                className={`${!isDarkMode ? "text-400" : "text-500"}`}
              />
            )}
          </div>
          <textarea
            value={data[1].content}
            className={`p-4 w-full h-[calc(100vh_-_108px)]  ${
              !isDarkMode ? "bg-1000 text-400" : "bg-100 text-700"
            }`}
          ></textarea>
        </div>
      </div>
    </main>
  );
}
