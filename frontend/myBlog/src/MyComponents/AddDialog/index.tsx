import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, PlusCircledIcon } from "@radix-ui/react-icons";
import "./styles.css";
import { Post } from "@/Model/Post";
import { FormEvent, useRef, useState } from "react"; // Add useState
import { Button } from "@radix-ui/themes";

type DialogProps = {
  addPost: (post: Partial<Post>) => void;
};

const AddDialogComp: React.FC<DialogProps> = ({ addPost }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false); // Add state to control dialog

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    
    const formData = new FormData(formRef.current);
    const tagsValue = formData.get('tags') as string;
    const data: Partial<Post> = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      author: formData.get('author') as string,
      tags: tagsValue ? tagsValue.split(',').map(tag => tag.trim()) : [],
    };
    
    addPost(data);
    setOpen(false); // Close dialog after successful submission
    formRef.current.reset(); // Optional: reset form fields
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button className="btn">
          <PlusCircledIcon width="18px" height="18px" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">New post</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Write new post here.
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
                defaultValue=""
                type="text"
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
                defaultValue=""
                type="text"
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
                defaultValue=""
                type="text"
              />
            </fieldset>
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="tags"> {/* Fixed from "tag" to "tags" */}
                Tags
              </label>
              <input
                className="Input"
                id="tags"
                name="tags"
                defaultValue=""
                type="text"
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
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddDialogComp;