import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { editorState } from "@/atoms/markdownAtom";
import { useRecoilState } from "recoil";
import Button from "@/layout/Button/Button";
type DeleteModalProps = {};

const DeleteModal: React.FC<DeleteModalProps> = () => {
  const [markdownEditorState, setMarkdownEditorState] =
    useRecoilState(editorState);

  const activatedMarkdownName = markdownEditorState.data.find(
    (item) => item.id === markdownEditorState.activeMarkdownId
  )?.name;

  const deleteMarkdown = () => {
    const deletedMarkdown = markdownEditorState.data.filter(
      (item) => item.id !== markdownEditorState.activeMarkdownId
    );
    setMarkdownEditorState((prev) => ({
      ...prev,
      data: deletedMarkdown,
      activeMarkdownId: deletedMarkdown.length ? deletedMarkdown[0].id : "",
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
        <Dialog.Content className="data-[state=open]:animate-contentShow z-[31] fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[343px] translate-x-[-50%] translate-y-[-50%] rounded-[4px] bg-900 p-6 focus:outline-none">
          <Dialog.Title className="text-100 text-previewH4 font-robotoSlab">
            Delete this document?
          </Dialog.Title>
          <Dialog.Description className=" text-previewParagraph my-4 text-400 font-robotoSlab">
            Are you sure you want to delete the `{activatedMarkdownName}`
            document and its contents? This action cannot be reversed.
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
