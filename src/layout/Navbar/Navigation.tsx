import { editorState } from "@/atoms/markdownAtom";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import React from "react";
import { useRecoilValue } from "recoil";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

type NavigationProps = {};

const Navigation: React.FC<NavigationProps> = () => {
  const markdownEditorState = useRecoilValue(editorState);

  return (
    <>
      <NavigationMenu.Root
        orientation="vertical"
        className="col-start-1 row-start-1 row-span-2"
      >
        <Sidebar />
      </NavigationMenu.Root>
      <NavigationMenu.Root
        orientation="horizontal"
        className="col-start-2 row-start-1"
      >
        <Navbar />
      </NavigationMenu.Root>
    </>
    // <NavigationMenu.Root
    //   orientation="vertical"
    //   className={`text-100 fixed w-full grid
    //       grid-cols-[250px,_100vw]
    //       grid-rows-[56px,1fr] sm:grid-rows-[72px,1fr] z-[5] transition duration-500 ${
    //         !markdownEditorState.isSidebarOpen && "-translate-x-[250px]"
    //       }`}
    // >
    //   <Sidebar />
    //   <Navbar />
    // </NavigationMenu.Root>
  );
};
export default Navigation;
