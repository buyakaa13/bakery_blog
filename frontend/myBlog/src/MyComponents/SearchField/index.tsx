import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";
import './styles.css';

type SearchProps = {
    setSearch: (query:string) => void
}

const SearchTextField: React.FC<SearchProps> = ({setSearch}) =>{
    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        setSearch(event.currentTarget.value);
    }
    return(
        <TextField.Root placeholder="Search…" className="search" onChange={handleChange}>
            <TextField.Slot>
                <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
        </TextField.Root>
    )
}

export default SearchTextField;