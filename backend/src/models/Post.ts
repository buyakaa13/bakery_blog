import {z} from 'zod';

export const postSchema = z.object({
    id: z.string().uuid().optional(),  
    title: z.string().optional(),  
    content: z.string().optional(),  
    author: z.string().optional(),  
    tags: z.array(z.string()).optional(),  
    // date: z.date().default(new Date()),  
    date: z.string().datetime().optional(),  
    bookmarked: z.boolean().optional()  
});

export type postModel = z.infer<typeof postSchema>;