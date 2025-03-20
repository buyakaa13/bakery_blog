import { Button, Grid, Spinner } from "@radix-ui/themes";
import ToggleGroupComp from "../ToggleGroup";
import SearchTextField from "../SearchField";
import { DownloadIcon } from "@radix-ui/react-icons";
import "./styles.css";
import { Post } from "@/Model/Post";
import AddDialog from "../AddDialog";
import { useState } from "react";

type FilterProps = {
  addPost: (post: Partial<Post>) => void;
  setSearch: (query: string) => void;
  downloadPost: () => void;
};

const Filter: React.FC<FilterProps> = ({ addPost, setSearch, downloadPost }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      downloadPost();
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Grid columns="2" gap="3" width="auto" className="filter-grid">
      <AddDialog addPost={addPost} />
      <div className="download" onClick={handleDownload}>
        <Button
          className="btn"
          aria-label="Download posts"
          disabled={isDownloading} type="submit"
        >
          <DownloadIcon width="18px" height="18px" />
          {isDownloading && <Spinner/>}
        </Button>
      </div>
      
      <ToggleGroupComp setSearch={setSearch}/>
      <SearchTextField setSearch={setSearch} />
    </Grid>
  );
};

export default Filter;