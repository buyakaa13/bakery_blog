import { Box, Card, Flex, Grid, Text, TextArea, Switch, Button } from '@radix-ui/themes';

function Comment() {
  return (
    <>
        <Box>
            <Card size="2">
                <Flex direction="column" gap="3">
                    <Grid gap="1">
                        <Text as="div" weight="bold" size="2" mb="1">
                            Feedback
                        </Text>
                        <TextArea placeholder="Write your feedback…" />
                        <Button className='yellow'>Hello yellow</Button>
                    
                    </Grid>
                    <Flex asChild justify="between">
                        <label>
                            <Text color="gray" size="2">
                                Attach screenshot?
                            </Text>
                            <Switch
                                size="1"
                                color="orange"
                                radius="full"
                                defaultChecked
                            />
                        </label>
                    </Flex>
                    <Grid columns="2" gap="2">
                        <Button variant="surface">Back</Button>
                        <Button color="cyan" radius="full">
                            Send
                        </Button>
                    </Grid>
                </Flex>
            </Card>
        </Box>
    </>
  )
}

export default Comment;