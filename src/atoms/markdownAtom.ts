import { atom } from "recoil";

export type EditorType = {
  data: MarkdownDataType[];
  isLightMode: boolean;
  isSidebarOpen: boolean;
  activatedMarkdownPart: ActivatedPartType;
  activeMarkdownId: string;
};
export type ActivatedPartType = "Markdown" | "Preview";
export type MarkdownDataType = {
  createdAt: string;
  name: string;
  content: string;
  id: string;
};

const defaultEditorState: EditorType = {
  data: [{ createdAt: "", name: "", content: "", id: "" }],
  isLightMode: false,
  isSidebarOpen: true,
  activatedMarkdownPart: "Preview",
  activeMarkdownId: "",
};

export const editorState = atom<EditorType>({
  key: "editorState",
  default: defaultEditorState,
});
