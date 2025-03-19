import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "@radix-ui/themes";
import "./styles.css";

function DropDownComp(){
    return(
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                    <DotsVerticalIcon width="20px" height="20px" className="grid-end"/>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
                <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
                    Delete
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>

    )
}

export default DropDownComp;