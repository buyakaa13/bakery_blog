import { Grid } from "@radix-ui/themes";
import SelectComp from "../Select";
import ToggleGroupComp from "../ToggleGroup";

function Filter(){
    return (
        <>
            <Grid columns="2" gap="3" className="m-3">
                <ToggleGroupComp/>
                <SelectComp/>
            </Grid>
        </>
    )
}

export default Filter;