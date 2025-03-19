import { ToggleGroup } from "radix-ui";
import {
    PersonIcon,
    Link1Icon
} from "@radix-ui/react-icons";
import "./styles.css";
import SelectComp from "../Select";
import { useState } from "react";

type ToggleProps = {
    setSearch: (query: string, filterType: string) => void;
}

const ToggleGroupComp: React.FC<ToggleProps> = ({setSearch}) => {
    const authors = ['John Doe', 'Jane Doe', 'Buyakaa'];
    const tags = ['cake', 'brownie', 'chocolate', 'muffin'];
    const [selectedFilter, setSelectedFilter] = useState<"tags" | "authors">("tags");
    const selectData = selectedFilter === "tags" ? tags : authors;

    return (
        <div>
            <ToggleGroup.Root
                className="ToggleGroup"
                type="single"
                defaultValue="tags"
                value={selectedFilter}
                onValueChange={(value: "tags" | "authors") => {
                    if (value) setSelectedFilter(value);
                }}
                aria-label="Filter"
            >
                <ToggleGroup.Item
                    className="ToggleGroupItem"
                    value="tags"
                    aria-label="Filter by Tag"
                >
                    <Link1Icon />
                </ToggleGroup.Item>
                <ToggleGroup.Item
                    className="ToggleGroupItem"
                    value="authors"
                    aria-label="Filter by Author"
                >
                    <PersonIcon />
                </ToggleGroup.Item>
            </ToggleGroup.Root>
            <SelectComp data={selectData} setSearch={setSearch} selectedFilter={selectedFilter}/>
        </div>
    );
};

export default ToggleGroupComp;