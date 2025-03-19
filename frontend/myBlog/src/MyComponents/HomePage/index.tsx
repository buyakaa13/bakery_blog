import Filter from '../Filter/index.tsx';
import AspectRatioComp from '../AspectRatio/index.tsx';
import SwiperComp from '../Swiper/index.tsx';
import Footer from '../Footer/index.tsx';
import { Theme } from '@radix-ui/themes';
import App from '../../App.tsx'
import {State, postReducer} from '../../Reducer/reducer.tsx';
import {useReducer, useEffect, useMemo, useState} from 'react';
import {Post} from '@/Model/Post';

export const initialState: State = {
    posts: [],
    filteredData: [],
    bookmarks: [],
    sortedOrder: 'asc',
    loading: true,
    error: ''
};

function HomePage(){
    const [state, dispatch] = useReducer(postReducer, initialState);
    const {posts, filteredData} = state;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        async function getPosts() {
            try {
                const response = await fetch(apiUrl + '/contacts');
                const responseBody: Post[] = await response.json();
                dispatch({type: 'GET_POSTS', payload: responseBody});
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        }
        getPosts();
    }, []); 

    const bookmarks = useMemo(() => posts.filter(post => post.bookmarked), [posts]);

    const addPost = async (post: Post) => {
        try{
            post.bookmarked = false;
            const response = await fetch(apiUrl + `/posts/`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(post)
            });
            if (!response.ok) 
                throw new Error(`Add error status: ${response.status} ${response.statusText}`);
            const newPost = await response.json();
            dispatch({type: 'ADD_POST', payload: newPost.data});
        }
        catch(error: any){
            console.error('Error addPost: ', error);
            // showErrorToast(error.message);
        }
    }

    const updateBookmark = async (id: string, post: Post) => {
        try {
            const response = await fetch(apiUrl + `/contacts/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(post),
            });
            const updatedBookmark = await response.json();
            if (!response.ok) 
                throw new Error("Failed to update bookmark");
            dispatch({type: 'UPDATE_BOOKMARK', payload: {id, bookmarked: updatedBookmark.bookmarked}})
        } catch (error) {
            console.error('Error updating bookmark:', error);
        }
    };

    const deletePost = async(id: string) =>{
        try{
            const response = await fetch(apiUrl + `/posts/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
            await response.json();
            if (!response.ok) 
                throw new Error("Failed to delete post");
            dispatch({type: 'DELETE_POST', payload: id});
        }
        catch(error){
            console.error('Error delete post: ', error);
        }
    }

    const downloadPost = async() =>{
        try{
            const response = await fetch(apiUrl + `/contacts/export`, {
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

    const filterData = (query: string, filterType: 'includes' | 'startsWith' = 'includes') => {
        const lowerCaseQuery = query.toLowerCase();
        const filtered = posts.filter((item) =>
            filterType === 'includes'
                ? item.title.toLowerCase().includes(lowerCaseQuery)
                : item.title.toLowerCase().startsWith(lowerCaseQuery)
        );
        dispatch({type: 'FILTER_DATA', payload: filtered})
    };
    
    return(
        <Theme appearance="dark" style={{height: "100vh", width: "100vw"}}>
            <AspectRatioComp/>
            <SwiperComp data={bookmarks} updateBookmark={updateBookmark}/>
            <Filter/>
            <App data={posts} updateBookmark={updateBookmark}/>
            <Footer/>
        </Theme>
    )
}

export default HomePage;