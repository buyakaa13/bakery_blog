import { Box, Text, Button, Container, Flex, Grid } from '@radix-ui/themes';
import Comment from './Comment';
import Post from './Post';

function App() {
  return (
    <Grid columns="3" gap="3" align="center" width="auto">
      <Post />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </Grid>
  )
}

export default App
