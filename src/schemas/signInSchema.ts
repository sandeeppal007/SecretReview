import {z} from "zod"

import {userNameValidation} from "@/schemas/signUpSchema"

export const signInSchema = z.object({
    username:userNameValidation,
    password:z.string()
})