import Filter from '../Filter/index.tsx';
import AspectRatioComp from '../AspectRatio/index.tsx';
import SwiperComp from '../Swiper/index.tsx';
import Footer from '../Footer/index.tsx';
import { Spinner, Theme } from '@radix-ui/themes';
import { State, postReducer } from '../../Reducer/reducer.tsx';
import { useReducer, useEffect, useMemo, useCallback } from 'react';
import { Post } from '@/Model/Post';
import { Comment as CommentModel } from '@/Model/Comment';
import CardComp from '../Card/index.tsx';

export const initialState: State = {
    posts: [],
    comments: [],
    filteredData: [],
    bookmarks: [],
    sortedOrder: 'asc',
    loading: true,
    error: ''
};

function HomePage() {
    const [state, dispatch] = useReducer(postReducer, initialState);
    const { posts, comments, filteredData, loading, error } = state;
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await fetch(`${apiUrl}/posts`);
                if (!response.ok) throw new Error('Failed to fetch posts');
                const responseBody: Post[] = await response.json();
                dispatch({ type: 'GET_POSTS', payload: responseBody });
            } catch (error) {
                console.error('Error fetching posts:', error);
                dispatch({ type: 'SET_ERROR', payload: 'Error fetching posts' });
            } finally {
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        };
        getPosts();
    }, []);

    const bookmarks = useMemo(() => posts.filter(post => post.bookmarked), [posts]);

    const addPost = useCallback(async (post: Partial<Post>) => {
        try {
            const response = await fetch(`${apiUrl}/posts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...post, bookmarked: false })
            });
            if (!response.ok) {
                throw new Error(`Add error status: ${response.status} ${response.statusText}`);
            }
            const newPost = await response.json();
            dispatch({ type: 'ADD_POST', payload: newPost.data });
        } catch (error: unknown) {
            console.error('Error addPost: ', error);
            dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Unknown error' });
        }
    }, []);

    const updateBookmark = useCallback(async (id: string, post: Partial<Post>) => {
        try {
            const response = await fetch(apiUrl + `/posts/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(post),
            });
            const updatedBookmark = await response.json();
            if (!response.ok) 
                throw new Error("Failed to update bookmark");
            dispatch({type: 'UPDATE_BOOKMARK', payload: {id, post: updatedBookmark.data}})
        } catch (error) {
            console.error('Error updating bookmark:', error);
            dispatch({ type: 'SET_ERROR', payload: 'Error updating bookmark' });
        }
    }, []);

    const getComment = useCallback(async (id: string) => {
        try {
            const response = await fetch(`${apiUrl}/posts/${id}/comments`);
            if (!response.ok) throw new Error('Failed to fetch comments');
            const responseBody: CommentModel[] = await response.json();
            dispatch({ type: 'GET_COMMENTS', payload: responseBody });
        } catch (error) {
            console.error('Error fetching comments:', error);
            dispatch({ type: 'SET_ERROR', payload: 'Error fetching comments' });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, []);

    const addComment = useCallback(async (id:string, comment: Partial<CommentModel>) => {
        try {
            const response = await fetch(`${apiUrl}/posts/${id}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...comment })
            });
            if (!response.ok) {
                throw new Error(`Add error status: ${response.status} ${response.statusText}`);
            }
            const newComment = await response.json();
            dispatch({ type: 'ADD_COMMENT', payload: newComment.data });
        } catch (error: unknown) {
            console.error('Error addComment: ', error);
            dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Unknown error' });
        }
    }, []);

    const deletePost = useCallback(async (id: string) => {
        try {
            const response = await fetch(`${apiUrl}/posts/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) throw new Error("Failed to delete post");
            await response.json();
            dispatch({ type: 'DELETE_POST', payload: id });
        } catch (error) {
            console.error('Error delete post: ', error);
            dispatch({ type: 'SET_ERROR', payload: 'Error deleting post' });
        }
    }, []);

    const downloadPost = async() =>{
        try{
            const response = await fetch(apiUrl + `/posts/export`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) 
                throw new Error('Failed to download file');
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'filename.zip'; 
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            dispatch({type: 'DOWNLOAD', payload: 'Success'});
        }
        catch(error){
            console.error('Error download post: ', error);
        }
    }

    const filterData = useCallback((query: string, filterType: 'includes' | 'tags' | 'authors' | 'all' = 'includes') => {
        const lowerCaseQuery = query.toLowerCase();
        const filtered = posts.filter((item) => {
            switch (filterType) {
                case 'includes':
                    return item.title.toLowerCase().includes(lowerCaseQuery);
                case 'tags':
                    return item.tags.includes(lowerCaseQuery);
                case 'authors':
                    return item.author.toLowerCase().includes(lowerCaseQuery);
                case 'all':
                    return item;
                default:
                    return true;
            }
        });
        dispatch({ type: 'FILTER_DATA', payload: filtered });
    }, [posts]);

    if (loading) return <Spinner size="3" />;
    if (error) return <div style={{ color: 'red', padding: '20px' }}>Error: {error}</div>;

    return (
        <Theme appearance="dark" style={{ height: "100vh", width: "100vw" }}>
            <AspectRatioComp />
            <SwiperComp 
                data={bookmarks} 
                updateBookmark={updateBookmark} 
                deletePost={deletePost}
                getComment={getComment}
                comments={comments}
                addComment={addComment}
            />
            <Filter 
                addPost={addPost}
                setSearch={filterData}
                downloadPost={downloadPost}
            />
            <CardComp 
                data={filteredData}
                updateBookmark={updateBookmark} 
                deletePost={deletePost}
                getComment={getComment}
                comments={comments}
                addComment={addComment}
            />
            <Footer />
        </Theme>
    );
}

export default HomePage;