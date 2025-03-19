import { Grid } from '@radix-ui/themes';
import { Post } from '@/Model/Post';
import { Comment as CommentModel } from '@/Model/Comment';
import PostComp from '@/MyComponents/Post';
import SpinnerComp from '@/MyComponents/Spinner';

interface CardProps {
  data: Post[];
  updateBookmark: (id: string, post: Partial<Post>) => void;
  deletePost: (id: string) => void;
  getComment: (id: string) => void;
  comments: CommentModel[];
  addComment: (id: string, comment: Partial<CommentModel>) => void
}

const CardComp: React.FC<CardProps> = ({ data, updateBookmark, deletePost, getComment, comments, addComment }) => {
  return (
    <Grid 
      columns="5" 
      gap="3" 
      align="center" 
      width="auto" 
      mx="1"
    >
      {data === null || data === undefined ? (
        <SpinnerComp />
      ) : (
        data.map((item) => (
          <PostComp key={item.id+item.title} dataItem={item} updateBookmark={updateBookmark} deletePost={deletePost} getComment={getComment} comments={comments} addComment={addComment}/>
        ))
      )}
    </Grid>
  );
};

export default CardComp;