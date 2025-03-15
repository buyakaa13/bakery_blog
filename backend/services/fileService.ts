import {join} from 'node:path';
import fs, { readFileSync, writeFileSync } from 'node:fs';
import {postModel} from '../models/Post';
import {commentModel} from '../models/Comment';
import {v4 as uuidv4} from 'uuid';
import json2md from 'json2md';

const postPathToFile = join(__dirname, '../database/post.json');
const commentPathToFile = join(__dirname, '../database/comment.json');
const outputFilePath = join(__dirname, '../output/output.vcf');

export function getPosts(){
    try{
        if(!fs.existsSync(postPathToFile))
            throw { message: (`Folder doesn't exists`), statusCode: 404};
        const data = fs.readFileSync(postPathToFile, 'utf8');
        return JSON.parse(data);
    }
    catch(error){
        throw error;
    }
}

export function addPost(post: postModel){
    try{
        if(!fs.existsSync(postPathToFile))
            throw { message: `Folder doesn't exists`, statusCode: 404};
        const fileData = fs.readFileSync(postPathToFile, 'utf8');
        const mainData: postModel[] = JSON.parse(fileData);
        if(mainData.find(data=> data.title == post.title))
            throw { message: `Already existing data!`, statusCode: 404};
        post.id = uuidv4();
        mainData.push(post);
        fs.writeFileSync(postPathToFile, JSON.stringify(mainData));
    }
    catch(error){
        throw error;
    }
}

export function updatePost(id: string, post: postModel){
    try{
        if(!fs.existsSync(postPathToFile))
            throw { message: (`Folder doesn't exists`), statusCode: 404};
        const fileData = fs.readFileSync(postPathToFile, 'utf8');
        const mainData: postModel[] = JSON.parse(fileData);
        const exist = mainData.find(data=> data.id === id);
        if(!exist)
            throw { message: `Can't find data!`, statusCode: 404};
        exist.title = post.title;
        exist.author = post.author;
        exist.content = post.content;
        exist.tags = post.tags;
        exist.date = post.date;
        exist.bookmarked = post.bookmarked;
        fs.writeFileSync(postPathToFile, JSON.stringify(mainData));
    }
    catch(error){
        throw error;
    }
}

export function deletePost(id: string){
    try{
        if(!fs.existsSync(postPathToFile))
            throw { message: (`Folder doesn't exists`), statusCode: 404};
        const fileData = fs.readFileSync(postPathToFile, 'utf8');
        const mainData: postModel[] = JSON.parse(fileData);
        const updatedData = mainData.filter(data=> data.id !== id);
        if(updatedData.length === mainData.length)
            throw {message: `Can't find data!`, statusCode: 404};
        fs.writeFileSync(postPathToFile, JSON.stringify(updatedData));
    }
    catch(error){
        throw error;
    }
}

export async function getComments(){
    try{
        if(!fs.existsSync(commentPathToFile))
            throw { message: (`Folder doesn't exists`), statusCode: 404};
        const data = fs.readFileSync(commentPathToFile, 'utf8');
        return JSON.parse(data);
    }
    catch(error){
        throw error;
    }
}

export function addComment(comment: commentModel){
    try{
        if(!fs.existsSync(postPathToFile))
            throw { message: `Folder doesn't exists`, statusCode: 404};
        const fileData = fs.readFileSync(postPathToFile, 'utf8');
        const mainData: commentModel[] = JSON.parse(fileData);
        // if(mainData.find(data=> data.postId == comment.postId))
        //     throw { message: `Already existing data!`, statusCode: 404};
        comment.id = uuidv4();
        mainData.push(comment);
        fs.writeFileSync(postPathToFile, JSON.stringify(mainData));
    }
    catch(error){
        throw error;
    }
}

export function deleteComment(id: string){
    try{
        if(!fs.existsSync(commentPathToFile))
            throw { message: (`Folder doesn't exists`), statusCode: 404};
        const fileData = fs.readFileSync(commentPathToFile, 'utf8');
        const mainData: commentModel[] = JSON.parse(fileData);
        const updatedData = mainData.filter(data=> data.id !== id);
        if(updatedData.length === mainData.length)
            throw {message: `Can't find data!`, statusCode: 404};
        fs.writeFileSync(commentPathToFile, JSON.stringify(updatedData));
    }
    catch(error){
        throw error;
    }
}

export async function searchPost(query: string | undefined){
    try{
        if(!fs.existsSync(postPathToFile))
            throw { message: (`Folder doesn't exists`), statusCode: 404};
        const data = fs.readFileSync(postPathToFile, 'utf8');
        const searchData = data
        return JSON.parse(data);
    }
    catch(error){
        throw error;
    }
}

export async function exportPosts(){
    try{
        if(!fs.existsSync(postPathToFile))
            throw { message: (`Folder doesn't exists`), statusCode: 404};
        const fileDatas: postModel[] = JSON.parse(fs.readFileSync(postPathToFile, 'utf8'));
        const mdContent = fileDatas.map(f=>[
            { h2: f.title || "No title" },
            { p: `Content: ${f.content} || "N/A"`},
            { p: `Author: ${f.author} || "N/A"` },
            { p: `Tags: ${f.tags} || "N/A"`},
            { p: `Date: ${f.date} || "N/A"`},
            { p: `Bookmarked: ${f.bookmarked} || false`},
            {hr: ""}
        ]).flat();
        const markdown = json2md(mdContent);
        await fs.writeFileSync(outputFilePath, markdown, 'utf8');
        return {
            success: true,
            message: 'Contacts exported to Markdown successfully'
        };
    }
    catch(error){
        throw {
            message: error.message || `Error exporting posts`,
            statusCode: error.statusCode || 500
        };
    }
}