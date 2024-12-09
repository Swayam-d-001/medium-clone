import z from 'zod'
export const signupInput = z.object({
    name : z.string(),
    email : z.string().email(),
    password : z.string()
})
export type SignupType =z.infer<typeof signupInput>

export const signinInput = z.object({
    name : z.string(),
    email : z.string().email(),
    password : z.string()
})
export type SigninType =z.infer<typeof signinInput>

export const createBlogInput = z.object({
    title : z.string(),
    description : z.string(),
})
export type CreateBlogType =z.infer<typeof createBlogInput>

export const updateBlogInput = z.object({
    title : z.string(),
    description : z.string(),
    id:z.string()
})
export type UpdateBlogType =z.infer<typeof updateBlogInput>