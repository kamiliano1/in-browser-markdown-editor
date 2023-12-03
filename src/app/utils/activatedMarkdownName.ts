import { EditorType } from "@/atoms/markdownAtom";

export const activatedMarkdownName = (
  markdownEditorState: EditorType,
  id: string
) => {
  return markdownEditorState.data.find((item) => item.id === id)?.name || "";
};
