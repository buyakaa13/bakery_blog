import { ToggleGroup } from "radix-ui";
import {
	PersonIcon,
	Link1Icon
} from "@radix-ui/react-icons";
import "./styles.css";

const ToggleGroupComp = () => (
    <div className="inline">
        <ToggleGroup.Root
            className="ToggleGroup"
            type="single"
            defaultValue="center"
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
        <label>""
            <select name="selectedFruit">
                <option value="apple">Apple</option>
                <option value="banana">Banana</option>
                <option value="orange">Orange</option>
            </select>
        </label>
    </div>
);

export default ToggleGroupComp;
