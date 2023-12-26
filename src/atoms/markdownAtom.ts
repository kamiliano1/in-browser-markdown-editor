import { atom } from "recoil";

export type EditorType = {
  data: MarkdownDataType[];
  isLightMode: boolean;
  isSidebarOpen: boolean;
  isDeleteModalOpen: boolean;
  activatedMarkdownPart: ActivatedPartType;
  activeMarkdownId: string;
  inputMarkdownValue: string;
  isReloaded: boolean;
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
  isSidebarOpen: false,
  isDeleteModalOpen: false,
  activatedMarkdownPart: "Preview",
  activeMarkdownId: "",
  inputMarkdownValue: "",
  isReloaded: false,
};

export const editorState = atom<EditorType>({
  key: "editorState",
  default: defaultEditorState,
});
