import { Select } from "@radix-ui/themes";
import "./styles.css";

interface SelectProps {
    data: string[];
    setSearch: (query: string, filterType: string) => void;
    selectedFilter: "tags" | "authors" | "all";
}

const SelectComp: React.FC<SelectProps> = ({ data, setSearch, selectedFilter }) => {
    const defaultValue = data.length > 0 ? data[0] : undefined;
    const handleSearch = (selectedValue: string) => {
        if (selectedValue) {
            setSearch(selectedValue, selectedFilter);
        }
    };

    return (
        <Select.Root
            defaultValue={defaultValue}
            onValueChange={handleSearch}
            disabled={data.length === 0}
        >
            <Select.Trigger 
                className="select-trigger"
                aria-label="Select filter option"
            />
            <Select.Content className="content">
                {data.length > 0 ? (
                    data.map((item) => (
                        <Select.Item key={item} value={item}>
                            {item}
                        </Select.Item>
                    ))
                ) : (
                    <Select.Item value="no-options" disabled>
                        No options available
                    </Select.Item>
                )}
            </Select.Content>
        </Select.Root>
    );
};

export default SelectComp;