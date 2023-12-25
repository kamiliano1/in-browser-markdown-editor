import { editorState } from "@/atoms/markdownAtom";
import { ComponentProps, useRef } from "react";
import { CiFileOn } from "react-icons/ci";
import { useRecoilState } from "recoil";

const InputText = ({}: ComponentProps<"input">): JSX.Element => {
  const [markdownEditorState, setMarkdownEditorState] =
    useRecoilState(editorState);
  const focusRef = useRef<HTMLInputElement>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMarkdownEditorState((prev) => ({ ...prev, [name]: value }));
  };

  const saveChanges = () => {
    const savedMarkdownName = markdownEditorState.data.map((item) =>
      item.id === markdownEditorState.activeMarkdownId
        ? { ...item, name: markdownEditorState.inputMarkdownValue }
        : item
    );
    setMarkdownEditorState((prev) => ({ ...prev, data: savedMarkdownName }));
  };

  const onKeyboardClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    if (key === "Enter") {
      saveChanges();
    }
  };
  return (
    <div className="flex items-center bg-800 py-3 ">
      <CiFileOn
        className={`mr-4 text-100 text-previewH4`}
        onClick={() => focusRef.current?.focus()}
      />
      <div className="flex flex-col items-start">
        <label
          htmlFor="inputMarkdownValue"
          className="text-bodyM font-roboto text-400 hidden sm:block m-0 p-0"
        >
          Document Name
        </label>
        <input
          ref={focusRef}
          onKeyDown={onKeyboardClick}
          type="text"
          onChange={onChange}
          aria-label="markdown file name"
          disabled={markdownEditorState.data.length ? false : true}
          value={markdownEditorState.inputMarkdownValue}
          className="text-headingM bg-800 text-100 border-b-[1px] border-800 enabled:hover:border-100 focus:border-100 focus:outline-none pb-1 caret-orange w-[120px] sm:w-full"
          name="inputMarkdownValue"
          id="inputMarkdownValue"
        />
      </div>
    </div>
  );
};
export default InputText;
