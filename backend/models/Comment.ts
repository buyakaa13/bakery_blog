import {z, string, array, date, boolean} from 'zod';

export const commentSchema = z.object({
    id: string().optional(),  
    postId: string(),  
    author: string(),  
    content: string(),  
    date: date(),  
});

export type commentModel = z.infer<typeof commentSchema>;