import { Grid } from '@radix-ui/themes';
import PostComp from './MyComponents/Post';
import {Post} from '@/Model/Post';
import SpinnerComp from '@/MyComponents/Spinner';
type AppProps ={
  data: Post[],
  updateBookmark: (id: string, post: Post) => void
}

const App: React.FC<AppProps> = ({data, updateBookmark}) => {
  return (
    <Grid columns="5" gap="3" align="center" width="auto" mx="1%">
      {
        data ? Object.entries(data).map(([key, item])=>(
          <PostComp key={key + item.id} dataItem={item} updateBookmark={updateBookmark}/>
        )) : <SpinnerComp/>
      }
    </Grid>
  )
}

export default App
