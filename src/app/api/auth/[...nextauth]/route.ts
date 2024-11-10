import { authoptions } from "@/app/store/lib/authoption"
import NextAuth from "next-auth/next"

const handlers = NextAuth(authoptions)

export { handlers as GET, handlers as POST }