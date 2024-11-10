import zod from "zod"
export const SignUpSchema = zod.object({
    username :  zod.union([
        zod.string().email({ message: "Invalid email address" }),
        zod.string().regex(/^\d+$/, { message: "Username must be a number or Email" })
    ]),
    password : zod.string().min(8,{message : "Password Must have atleast 8 characters"})
})