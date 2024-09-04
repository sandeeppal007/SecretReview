import {z} from "zod"



export const messageSchema = z.object({
    content:z.string()
    .min(10,{message:"Message should be 10 charcter"})
    .max(300,{message:"Message not longer than 300 charcter"})
})