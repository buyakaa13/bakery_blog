import { useContext, useReducer } from "react";
import {postReducer} from '../Reducer/reducer';
import {initialState} from '../MyComponents/HomePage'; 
import {State} from '../Reducer/reducer';
import { Post } from "@/Model/Post";
import React from "react";

const apiUrl = import.meta.env.VITE_API_URL;

interface PostContextType {
  updateBookmark: (id: string, data: Post) => Promise<void>;
  state: State;
}

export const PostContext = React.createContext<PostContextType>({
  updateBookmark: async () => {},
  state: initialState,
});

export const useBookmark = () => {
  const context = useContext(PostContext);
  if (!context) throw new Error("useBookmark must be used within PostProvider");
  return context;
};

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(postReducer, initialState);
    const updateBookmark = async (id: string, data: Post) => {
      try {
        const response = await fetch(apiUrl + `/contacts/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
  
        if (!response.ok) 
          throw new Error("Failed to update bookmark");
  
        const updatedBookmark = await response.json();
        dispatch({
          type: "UPDATE_BOOKMARK",
          payload: { id, bookmarked: updatedBookmark.bookmarked },
        });
      } catch (error) {
        console.error("Error updating bookmark:", error);
      }
    };

    return (
        <PostContext.Provider value={{ updateBookmark, state}}>
        {children}
        </PostContext.Provider>
    );
};
