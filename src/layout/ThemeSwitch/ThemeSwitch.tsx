import { editorState } from "@/atoms/markdownAtom";
import * as Switch from "@radix-ui/react-switch";
import { BiSun } from "react-icons/bi";
import { IoMoonOutline } from "react-icons/io5";
import { useRecoilState } from "recoil";

type ThemeSwitchProps = {};

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({}) => {
  const [markdownEditorState, setMarkdownEditorState] =
    useRecoilState(editorState);
  return (
    <div className="flex items-center justify-end h-[24px] w-min">
      <label htmlFor="theme-switcher">
        <IoMoonOutline
          className={`text-[1rem] cursor-pointer ${
            !markdownEditorState.isLightMode ? "text-100" : "text-600"
          }`}
        />
      </label>
      <Switch.Root
        checked={markdownEditorState.isLightMode}
        title="theme-switcher"
        className="bg-600 w-[48px] mx-2.5 h-[24px] rounded-full relative outline-none cursor-pointer"
        id="theme-switcher"
        onCheckedChange={(state) =>
          setMarkdownEditorState((prev) => ({ ...prev, isLightMode: state }))
        }
      >
        <Switch.Thumb className="mx-1 block w-3 h-3 bg-100 rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[26px]" />
      </Switch.Root>
      <label htmlFor="theme-switcher">
        <BiSun
          className={`text-[1.125rem] cursor-pointer ${
            markdownEditorState.isLightMode ? "text-100" : "text-600"
          }`}
        />
      </label>
    </div>
  );
};
export default ThemeSwitch;
