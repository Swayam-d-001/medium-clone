import z from 'zod';
export declare const signupInput: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
}, {
    name: string;
    email: string;
    password: string;
}>;
export type SignupType = z.infer<typeof signupInput>;
export declare const signinInput: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
}, {
    name: string;
    email: string;
    password: string;
}>;
export type SigninType = z.infer<typeof signinInput>;
export declare const createBlogInput: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
}, {
    title: string;
    description: string;
}>;
export type CreateBlogType = z.infer<typeof createBlogInput>;
export declare const updateBlogInput: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
    id: string;
}, {
    title: string;
    description: string;
    id: string;
}>;
export type UpdateBlogType = z.infer<typeof updateBlogInput>;
