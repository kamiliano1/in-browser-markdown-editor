import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

type NavigationProps = {};

const Navigation: React.FC<NavigationProps> = () => {
  return (
    <>
      <NavigationMenu.Root
        orientation="vertical"
        className="col-start-1 row-start-1 row-span-2 w-[250px] fixed h-[100vh] bg-900 px-6 py-7 flex flex-col"
        aria-label="sidebar"
      >
        <Sidebar />
      </NavigationMenu.Root>
      <NavigationMenu.Root
        orientation="horizontal"
        className="col-start-2 row-start-1"
        aria-label="navbar"
      >
        <Navbar />
      </NavigationMenu.Root>
    </>
  );
};
export default Navigation;
