import { StarFilledIcon } from '@radix-ui/react-icons';
import { Box, Card, Flex, Grid, Text } from '@radix-ui/themes';
import "./styles.css";
import DropDownComp from '../Dropdown';
import PopoverComp from '../Popover';
import {Post as PostModel} from '@/Model/Post';

type PostProps = {
    dataItem: PostModel,
    updateBookmark: (id: string, post: PostModel) => void
}

const Post: React.FC<PostProps> = ({dataItem, updateBookmark}) => {
  return (
    <>
        <Box>
            <Card size="2">
                <Flex direction="column" gap="3">
                    <Grid columns="2">
                        <StarFilledIcon color='yellow' width="25px" height="25px" display="inline-block"/>
                        <DropDownComp/>
                    </Grid>
                    <Grid gap="1">
                        <Text as="div" weight="bold" size="3" mb="1">
                            {dataItem.title}
                        </Text>
                        <Text as='div' size="2">{dataItem.content}</Text>
                    </Grid>
                    <Grid columns="1">
                        <PopoverComp/>
                    </Grid>
                </Flex>
            </Card>
        </Box>
    </>
  )
}

export default Post;