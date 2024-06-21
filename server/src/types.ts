import z from "zod"

const uservalidation = z.object({
    email: z.string().email({message: "invalid email address"}),
    password: z.string().min(8,{ message: "Must be 8 or more characters long" }),
    name: z.string().optional()
})

export {uservalidation}
