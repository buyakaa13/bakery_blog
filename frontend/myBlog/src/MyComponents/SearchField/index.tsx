import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";
import './styles.css';

function SearchTextField(){
    return(
        <TextField.Root placeholder="Search…" className="search">
            <TextField.Slot>
                <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
        </TextField.Root>
    )
}

export default SearchTextField;