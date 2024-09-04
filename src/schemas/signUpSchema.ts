import {z} from "zod"

export const userNameValidation = z.string()
.min(2,"User must be atleast 2 charcters")
.max(20,"username must be no more than 20")
.regex(/^[a-zA-Z0-9_]+$/,"username must not contain special charcter") 

export const signUpSchemaValidation = z.object({
    username:userNameValidation,
    email:z.string().email({message:"Invalid email address"}),
    password:z.string().min(6,{message:"Password must be greater then 6 digit"})
})
