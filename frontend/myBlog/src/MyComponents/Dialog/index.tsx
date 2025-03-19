import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import "./styles.css";
import { Post } from "@/Model/Post";
import { FormEvent, useRef } from "react";

interface DialogProps {
  dataItem: Post;
  updateBookmark: (id: string, post: Partial<Post>) => void;
}

const DialogComp: React.FC<DialogProps> = ({ dataItem, updateBookmark }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const data: Partial<Post> = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      author: formData.get('author') as string,
    };

    updateBookmark(dataItem.id, data);
    dialogCloseRef.current?.click();
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="Button violet">Edit</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Edit post</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Make changes to your post here.
          </Dialog.Description>
          <form ref={formRef} onSubmit={handleSubmit}>
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="title">
                Title
              </label>
              <input
                className="Input"
                id="title"
                name="title"
                defaultValue={dataItem.title}
                type="text"
                required
              />
            </fieldset>
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="content">
                Content
              </label>
              <input
                className="Input"
                id="content"
                name="content"
                defaultValue={dataItem.content}
                type="text"
                required
              />
            </fieldset>
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="author">
                Author
              </label>
              <input
                className="Input"
                id="author"
                name="author"
                defaultValue={dataItem.author}
                type="text"
                required
              />
            </fieldset>
            <div
              style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}
            >
              <button type="submit" className="Button green">
                Save
              </button>
            </div>
          </form>
          
          <Dialog.Close asChild>
            <button
              ref={dialogCloseRef}
              className="IconButton"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogComp;