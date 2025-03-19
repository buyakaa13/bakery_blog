import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { Avatar, Box, Button, Flex, Popover, TextArea, Text, Spinner } from "@radix-ui/themes";
import { Comment as CommentModel } from '@/Model/Comment';
import { useState } from 'react';

type PopoverProps = {
    id: string,
    comments: CommentModel[];
    addComment: (id: string, comment: Partial<CommentModel>) => void
}

const PopoverComp: React.FC<PopoverProps> = ({id, comments, addComment}) => {
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        if (newComment.trim() === '') return;
        const comment: Partial<CommentModel> = {
            author: "John Doe", 
            content: newComment,
            postId: id,
        };
        
        addComment(id, comment);
        setNewComment('');
    };

    return(
        <Popover.Root>
            <Popover.Trigger>
                <Button variant="soft">
                    <ChatBubbleIcon width="16" height="16" />
                    Comment
                </Button>
            </Popover.Trigger>
            <Popover.Content width="360px">
                { comments ?
                    comments.map((com, index)=>(
                        <Flex key={index} gap="3" my="3">
                            <Avatar
                                size="1"
                                fallback={com.author.substring(0, 1)}
                                radius="full"
                            />
                            <Box flexGrow="1">
                                <Text style={{ fontSize: "14px" }}>{com.content}</Text>
                            </Box>
                        </Flex>
                    )) : <Spinner/>
                }
                
                <Flex gap="3">
                    <Avatar
                        size="1"
                        fallback="A"
                        radius="full"
                    />
                    <Box flexGrow="1">
                        <TextArea 
                            placeholder="Write a comment…" 
                            style={{ height: 80 }}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <Flex gap="3" mt="3" justify="end">
                            <Popover.Close>
                                <Button size="1" color="red">Close</Button>
                            </Popover.Close>
                            <Button size="1" onClick={handleAddComment}>Comment</Button>
                        </Flex>
                    </Box>
                </Flex>
            </Popover.Content>
        </Popover.Root>
    )
}

export default PopoverComp;