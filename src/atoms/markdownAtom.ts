import { atom } from "recoil";

export type EditorType = {
  data: MarkdownDataType[];
  isLightMode: boolean;
  isSidebarOpen: boolean;
  isDeleteModalOpen: boolean;
  activatedMarkdownPart: ActivatedPartType;
  activeMarkdownId: string;
  inputMarkdownValue: string;
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
  isDeleteModalOpen: false,
  activatedMarkdownPart: "Preview",
  activeMarkdownId: "",
  inputMarkdownValue: "",
};

export const editorState = atom<EditorType>({
  key: "editorState",
  default: defaultEditorState,
});
