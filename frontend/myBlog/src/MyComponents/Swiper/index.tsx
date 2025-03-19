import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import PostComp from '../Post';
import './styles.css';
import {Post} from '@/Model/Post';
import {Comment as CommentModel} from '@/Model/Comment';
import SpinnerComp from '@/MyComponents/Spinner';

type SwiperProps = {
    data: Post[],
    updateBookmark: (id: string, post: Partial<Post>) => void,
    deletePost: (id: string) => void,
    getComment: (id: string) => void,
    comments: CommentModel[],
    addComment: (id: string, comment: Partial<CommentModel>) => void
}

const Swiper: React.FC<SwiperProps> = ({data, updateBookmark, deletePost, getComment, comments, addComment})=>{
    return(
        <Carousel className="m-3"  plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}>
            <CarouselContent className="-ml-1">
                {data ? Object.entries(data).map(([key, item]) => (
                    <CarouselItem key={key} className="pl-1 md:basis-1/2 lg:basis-1/4">
                        <div className="p-1">
                            <PostComp key={item.id+item.title} dataItem={item} updateBookmark={updateBookmark} deletePost={deletePost} getComment={getComment} comments={comments} addComment={addComment}/>
                        </div>
                    </CarouselItem>
                )) : <SpinnerComp/>}
            </CarouselContent>
            <div className="carousel-container">
                <CarouselPrevious className="carousel-btn" />
                <CarouselNext className="carousel-btn"/>
            </div>
            
        </Carousel>
    )
}

export default Swiper;