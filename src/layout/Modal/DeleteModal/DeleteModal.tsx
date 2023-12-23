import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { editorState } from "@/atoms/markdownAtom";
import { useRecoilState } from "recoil";
import Button from "@/layout/Button/Button";
import { activatedMarkdownName } from "@/app/utils/activatedMarkdownName";
type DeleteModalProps = {};

const DeleteModal: React.FC<DeleteModalProps> = () => {
  const [markdownEditorState, setMarkdownEditorState] =
    useRecoilState(editorState);

  const deleteMarkdown = () => {
    const deletedMarkdown = markdownEditorState.data.filter(
      (item) => item.id !== markdownEditorState.activeMarkdownId
    );
    setMarkdownEditorState((prev) => ({
      ...prev,
      data: deletedMarkdown,
      activeMarkdownId: deletedMarkdown.length ? deletedMarkdown[0].id : "",
      inputMarkdownValue: deletedMarkdown.length ? deletedMarkdown[0].name : "",
      isReloaded: false,
    }));
  };
  return (
    <Dialog.Root
      open={markdownEditorState.isDeleteModalOpen}
      onOpenChange={(state) =>
        setMarkdownEditorState((prev) => ({
          ...prev,
          isDeleteModalOpen: state,
        }))
      }
    >
      <Dialog.Portal>
        <Dialog.Overlay className="bg-500 bg-opacity-50 z-[30] data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content
          className={`data-[state=open]:animate-contentShow z-[31] fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[343px] translate-x-[-50%] translate-y-[-50%] rounded-[4px] p-6 focus:outline-none
            ${markdownEditorState.isLightMode ? "bg-100" : "bg-900"}
            `}
        >
          <Dialog.Title
            className={`text-previewH4 font-robotoSlab ${
              markdownEditorState.isLightMode ? "text-700" : "text-100"
            }`}
          >
            Delete this document?
          </Dialog.Title>
          <Dialog.Description
            className={`text-previewParagraph my-4 font-robotoSlab ${
              markdownEditorState.isLightMode ? "text-500" : "text-400"
            }`}
          >
            Are you sure you want to delete the `
            {activatedMarkdownName(
              markdownEditorState,
              markdownEditorState.activeMarkdownId
            )}
            ` document and its contents? This action cannot be reversed.
          </Dialog.Description>
          <Dialog.Close asChild>
            <Button
              cssClassName="w-full py-[.6875rem]"
              onClick={deleteMarkdown}
            >
              Confirm & Delete
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export default DeleteModal;
