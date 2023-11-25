"use client";
import Image from "next/image";
import Button from "./layout/Button/Button";
import ThemeSwitch from "./layout/ThemeSwitch/ThemeSwitch";

export default function Home() {
  return (
    <main className="">
      <Button>Test</Button>
      <ThemeSwitch />
    </main>
  );
}
