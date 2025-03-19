import { ToggleGroup } from "radix-ui";
import {
	PersonIcon,
	Link1Icon
} from "@radix-ui/react-icons";
import "./styles.css";
import SelectComp from "../Select";

const ToggleGroupComp = () => (
    <div>
        <ToggleGroup.Root
            className="ToggleGroup"
            type="single"
            defaultValue="tag"
            aria-label="Filter"
        >
            <ToggleGroup.Item
                className="ToggleGroupItem"
                value="tag"
                aria-label="Tag"
            >
                <Link1Icon />
            </ToggleGroup.Item>
            <ToggleGroup.Item
                className="ToggleGroupItem"
                value="author"
                aria-label="Author"
            >
                <PersonIcon />
            </ToggleGroup.Item>
        </ToggleGroup.Root>
        <SelectComp/>
    </div>
);

export default ToggleGroupComp;
