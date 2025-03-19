import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
import { Box, Card, Flex, Grid, Text } from '@radix-ui/themes';
import "./styles.css";
import DropDownComp from '../Dropdown';
import PopoverComp from '../Popover';
import { Post as PostModel } from '@/Model/Post';
import { Comment as CommentModel } from '@/Model/Comment';

interface PostProps {
    dataItem: PostModel;
    updateBookmark: (id: string, post: Partial<PostModel>) => void;
    deletePost: (id: string) => void;
    getComment: (id: string) => void;
    comments: CommentModel[];
    addComment: (id: string, comment: Partial<CommentModel>) => void
}

const Post: React.FC<PostProps> = ({ dataItem, updateBookmark, deletePost, getComment, comments, addComment }) => {
    const handleBookmark = () => {
        const updatedPost = { bookmarked: !dataItem.bookmarked };
        updateBookmark(dataItem.id, updatedPost);
    };

    const handleGetComment = () => {
        getComment(dataItem.id);
    }

    return (
        <Box width="100%">
            <Card size="2" variant="surface">
                <Flex direction="column" gap="3" p="2">
                    <Grid columns="2" align="center" gap="2">
                        <Box 
                            onClick={handleBookmark}
                            style={{ cursor: 'pointer' }}
                            aria-label={dataItem.bookmarked ? "Remove bookmark" : "Add bookmark"}
                        >
                            {dataItem.bookmarked ? (
                                <StarFilledIcon color="yellow" width={25} height={25} />
                            ) : (
                                <StarIcon color="yellow" width={25} height={25} />
                            )}
                        </Box>
                        <DropDownComp 
                            dataItem={dataItem} 
                            updateBookmark={updateBookmark} 
                            deletePost={deletePost}
                        />
                    </Grid>
                    <Grid gap="1">
                        <Text 
                            as="div" 
                            weight="bold" 
                            size="3" 
                            mb="1"
                            style={{ wordBreak: 'break-word' }}
                        >
                            {dataItem.title}
                        </Text>
                        <Text 
                            as="div" 
                            size="2" 
                            className="content-text"
                            style={{ wordBreak: 'break-word' }}
                        >
                            {dataItem.content}
                        </Text>
                    </Grid>
                    <Grid columns="1" onClick={handleGetComment}>
                        <PopoverComp id={dataItem.id} comments={comments} addComment={addComment}/>
                    </Grid>
                </Flex>
            </Card>
        </Box>
    );
};

export default Post;