import { editorState } from "@/atoms/markdownAtom";
import { ForwardRefRenderFunction, InputHTMLAttributes } from "react";
import { CiFileOn } from "react-icons/ci";
import { useRecoilState } from "recoil";
interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {}

const InputText: ForwardRefRenderFunction<
  HTMLInputElement,
  InputTextProps
> = (): JSX.Element => {
  const [markdownEditorState, setMarkdownEditorState] =
    useRecoilState(editorState);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMarkdownEditorState((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="flex items-center bg-800 py-3">
      <CiFileOn className="mr-4 text-100" />
      <div className="flex flex-col items-start">
        <label
          htmlFor="markdownFileName"
          className="text-bodyM font-roboto text-400 hidden sm:block m-0 p-0"
        >
          Document Name
        </label>
        <input
          type="text"
          onChange={onChange}
          disabled={markdownEditorState.data.length ? false : true}
          value={markdownEditorState.inputMarkdownValue}
          className="text-headingM bg-800 text-100 border-b-[1px] border-800 hover:border-100 focus:border-100 focus:outline-none pb-1 caret-orange w-full"
          name="inputMarkdownValue"
          id="inputMarkdownValue"
        />
      </div>
    </div>
  );
};
export default InputText;
