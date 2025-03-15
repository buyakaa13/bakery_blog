import { ErrorRequestHandler, RequestHandler } from "express";
import {postModel, postSchema} from '../models/Post';
import {commentModel, commentSchema} from '../models/Comment';
import {join} from 'node:path';
import fs, { stat } from 'node:fs';
import {z} from 'zod';
import archiver from 'archiver';
import { addPost, updatePost, deletePost, deleteComment, searchPost, exportPosts, getPosts, getComments, addComment } from "../services/fileService";

const outputFilePath = join(__dirname, '../output/output.zip')
const mdFilePath = join(__dirname, '../output/output.md');

export const get_posts: RequestHandler = (req, res, next) =>{
    try{
        const getData = getPosts();
        res.status(201).json(getData);
    }
    catch(err){
        throw err;
    }
};

export const post_post: RequestHandler = (req, res, next) =>{
    try{
        const validatedData: postModel = postSchema.parse(req.body);
        addPost(validatedData);
        res.status(201).json({message: 'Post created successfully', data: validatedData});
    }
    catch(error){
        if(error instanceof z.ZodError){
            res.status(400).json({
                status: 'Validation failed',
                message: error.errors
            });
        }
        else{
            res.status(error.status || 500).json({
                status: 'Error',
                message: error.message || 'Internal server error'
            });
        }
    }
};

export const update_post: RequestHandler = (req, res, next)=>{
    try{
        const {id} = req.params;
        const validatedData: postModel = postSchema.parse(req.body);
        updatePost(id, validatedData);
        res.status(200).json({message: 'Post updated successfully', data: validatedData});
    }
    catch(error){
        if(error instanceof z.ZodError){
            res.status(400).json({
                status: 'Validation failed',
                message: error.errors
            });
        }
        else{
            res.status(error.status || 500).json({
                status: 'Error',
                message: error.message || 'Internal server error'
            });
        }
        next(error);
    }
};

export const delete_post: RequestHandler = (req, res, next) =>{
    try{
        const {id} = req.params;
        deletePost(id);
        res.status(200).json({message: 'Post deleted successfully', data: id});
    }
    catch(error){
        res.status(error.status || 500).json({
            status: 'Error',
            message: error.message || 'Internal server error'
        })
        next(error);
    }
}

export const get_comments = (req, res, next) =>{
    try{
        const {id} = req.params;
        const comments = getComments(id);
        res.status(201).json(comments);
    }
    catch(err){
        throw err;
    }
};

export const post_comment: RequestHandler = (req, res, next) =>{
    try{
        const validatedData: commentModel = commentSchema.parse(req.body);
        addComment(validatedData);
        res.status(201).json({message: 'Comment created successfully', data: validatedData});
    }
    catch(error){
        if(error instanceof z.ZodError){
            res.status(400).json({
                status: 'Validation failed',
                message: error.errors
            });
        }
        else{
            res.status(error.status || 500).json({
                status: 'Error',
                message: error.message || 'Internal server error'
            });
        }
    }
};

export const delete_comment: RequestHandler = (req, res, next) =>{
    try{
        const {id} = req.params;
        deleteComment(id);
        res.status(200).json({message: 'Comment deleted successfully', data: id});
    }
    catch(error){
        res.status(error.status || 500).json({
            status: 'Error',
            message: error.message || 'Internal server error'
        })
        next(error);
    }
}

export const search_post: RequestHandler = (req, res, next) =>{
    try{
        const {query} = req.query;
        const searchData = searchPost(query);
        res.status(200).json({message: 'Search post successfully', data: searchData});
    }
    catch(error){
        res.status(error.status || 500).json({
            status: 'Error',
            message: error.message || 'Internal server error'
        })
        next(error);
    }
};

export const export_post: RequestHandler = async (req, res, next)=>{
    try{
        await exportPosts();

        const output = fs.createWriteStream(outputFilePath);
        const archive = archiver('zip', { zlib: {level: 9}});

        archive.on('error', (err)=>{ console.error('Error: ', err)});
        archive.pipe(output);
        archive.file(mdFilePath, {name: 'output.md'});
        archive.finalize();

        output.on('close', () => {
            res.download(outputFilePath, 'output.zip', (err)=>{
                if(err)
                    console.error(`Error sending file: `, err);
                else{
                    if (!res.headersSent) {
                        res.status(200).json({ message: 'File sent successfully' });
                    }
                }
            });

            fs.unlink(mdFilePath, (unlinkErr) => {
                if(unlinkErr)
                    console.error(`Error deleting md file: `, unlinkErr);
                else 
                    console.log(`md file deleted successfully`);
            });
        });
        // res.status(200).json({message: 'File sent successfully'});
    }
    catch(error){
        res.status(error.status || 500).json({
            status: 'Error',
            message: error.message || 'Invalid server error'
        });
        next(error);
    }
}

export const no_route_found_handler: RequestHandler = (req, res, next) => {
    next(new Error(`No route found`));
}

export const default_error: ErrorRequestHandler = (error, req, res, next) => {
    res.status(500).json({error: error.message});
}