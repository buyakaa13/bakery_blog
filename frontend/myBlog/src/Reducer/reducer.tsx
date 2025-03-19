import {Post} from '../Model/Post';
import {Comment} from '../Model/Comment';

export interface State{
    posts: Post[];
    filteredData: Post[];
    bookmarks: Post[];
    sortedOrder: 'asc' | 'desc';
    loading: boolean;
    error: string;
}

type Action = 
| {type: 'GET_POSTS'; payload: Post[]}
| {type: 'UPDATE_BOOKMARK'; payload: {id: string; bookmarked: boolean}}
| {type: 'FILTER_DATA'; payload: Post[]}
| {type: 'SORT_DATA'; payload: {sortedContacts: Post[]; sortedOrder: 'asc' | 'desc'}}
| {type: 'DELETE_POST'; payload: string}
| {type: 'SET_LOADING'; payload: boolean}
| {type: 'SET_ERROR'; payload: string}
| {type: 'ADD_POST'; payload: Post}
| {type: 'DOWNLOAD'; payload: string}

export function postReducer(state: State, action: Action): State{
    switch(action.type){
        case 'GET_POSTS':
            return {
                ...state,
                posts: action.payload,
                filteredData: action.payload
            };
        case 'UPDATE_BOOKMARK':
            const updatePosts = state.posts.map((post)=>post.id === action.payload.id ? {...post, bookmarked: action.payload.bookmarked} : post);
            return {
                ...state,
                posts: updatePosts,
                filteredData: updatePosts
            };
        case 'ADD_POST':
            return{
                ...state,
                posts: [action.payload, ...state.posts],
                filteredData: [action.payload, ...state.filteredData]
            };
        case 'FILTER_DATA':
            return{
                ...state,
                filteredData: action.payload
            }
        case 'DELETE_POST':
             const remainPosts = state.posts.filter((post)=> post.id !== action.payload);
             return {
                ...state,
                posts: remainPosts,
                filteredData: remainPosts
             }
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload
            }
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        case 'DOWNLOAD':
            return{
                ...state,
                error: action.payload,
                loading: false,
            }
        default:
            return state;
    }

}