import {z, string, array, date, boolean} from 'zod';

export const postSchema = z.object({
    id: string().optional(),  
    title: string().min(2),  
    content: string(),  
    author: string(),  
    tags: array(string()),  
    date: date(),  
    bookmarked: boolean()  
});

export type postModel = z.infer<typeof postSchema>;