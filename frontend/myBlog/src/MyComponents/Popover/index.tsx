import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { Avatar, Box, Button, Flex, Popover, TextArea, Text } from "@radix-ui/themes";

function PopoverComp(){
    return(
        <Popover.Root>
            <Popover.Trigger>
                <Button variant="soft">
                    <ChatBubbleIcon width="16" height="16" />
                    Comment
                </Button>
            </Popover.Trigger>
            <Popover.Content width="360px">
                <Flex gap="3" my="3">
                    <Avatar
                        size="1"
                        fallback="B"
                        radius="full"
                    />
                    <Box flexGrow="1">
                        <Text style={{ fontSize: "14px" }}>Great post!</Text>
                    </Box>
                </Flex>
                <Flex gap="3" my="3">
                    <Avatar
                        size="1"
                        fallback="C"
                        radius="full"
                    />
                    <Box flexGrow="1">
                        <Text style={{ fontSize: "14px" }}>Great post!</Text>
                    </Box>
                </Flex>
                <Flex gap="3">
                    <Avatar
                        size="1"
                        fallback="A"
                        radius="full"
                    />
                    <Box flexGrow="1">
                        <TextArea placeholder="Write a comment…" style={{ height: 80 }} />
                        <Flex gap="3" mt="3" justify="end">
                            <Popover.Close>
                                <Button size="1" color="red">Close</Button>
                            </Popover.Close>
                            <Button size="1">Comment</Button>
                        </Flex>
                    </Box>
                </Flex>
            </Popover.Content>
        </Popover.Root>
    )
}

export default PopoverComp;