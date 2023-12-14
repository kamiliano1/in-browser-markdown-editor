import { EditorType } from "@/atoms/markdownAtom";

export const generateMarkdownName = (markdownEditorState: EditorType) => {
  const untitledDocumentArray = new Array(100)
    .fill("")
    .map((item, id) =>
      id === 0 ? "untitled-document.md" : `untitled-document(${id}).md`
    );
  return untitledDocumentArray.find((item) => {
    if (
      markdownEditorState.data.findIndex((items) => items.name === item) === -1
    )
      return item;
  });
};
