import { Button, Grid } from "@radix-ui/themes";
import ToggleGroupComp from "../ToggleGroup";
import SearchTextField from "../SearchField";
import { DownloadIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import "./styles.css";

function Filter(){
    return (
        <>
            <Grid columns="2">
                <Button className="btn"><PlusCircledIcon width="18px" height="18px"/></Button>
                <Button className="btn download"><DownloadIcon width="18px" height="18px"/></Button>
                <ToggleGroupComp/>
                <SearchTextField/>
            </Grid>
        </>
    )
}

export default Filter;