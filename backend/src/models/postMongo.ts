import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    id: {type: String, required:false, unique:true},  
    title: {type: String, required:true},  
    content: {type: String, required: true,  
    author: {type: String, required: true},  
    tags: {type: Array, required: true},  
    date: {type: String, required: true},  
    bookmarked: {type: Boolean, required: true},
}});

export const Post = mongoose.model('Post', postSchema);