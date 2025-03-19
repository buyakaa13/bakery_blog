import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "@radix-ui/themes";
import "./styles.css";
import DialogComp from "../Dialog";
import { Post } from "@/Model/Post";

type DropDownProps = {
    dataItem: Post,
    updateBookmark: (id: string, post: Partial<Post>) => void,
    deletePost: (id: string) => void
}

const DropDownComp: React.FC<DropDownProps> = ({dataItem, updateBookmark, deletePost}) =>{
    function onHandleDelete(){
        deletePost(dataItem.id);
    }
    
    return(
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <DotsVerticalIcon width="20px" height="20px" className="grid-end"/>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                {/* <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item> */}
                <DialogComp dataItem={dataItem} updateBookmark={updateBookmark}/>
                <DropdownMenu.Item shortcut="⌘ ⌫" color="red" onClick={onHandleDelete}>
                    Delete
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
   
}

export default DropDownComp;