import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "../db";
import { AdapterUser } from "next-auth/adapters";



interface UserType extends AdapterUser {
    id : string,
    username? : string,
    name? : string,
    picture? : string,
    image? : string | null,

}
export const authoptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "username", type: "text", placeholder: "Email or phone" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null;
                }
                const user = await prisma.user.findFirst({
                    where: {
                        username: credentials.username,
                    },
                });

                if (!user) {
                    return null;
                }

                const isValidPassword = await bcrypt.compare(credentials.password, user.password || "");
                if (!isValidPassword) {
                    return null;
                }

                return { id: user.id, username: user.username }; // Custom return object
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            async profile(profile) {
                let user = await prisma.user.findUnique({
                    where: {
                        username: profile.email,
                    },
                });

                if (!user) {
                    user = await prisma.user.create({
                        data: {
                            name: profile.name,
                            username: profile.email,
                            password: "guestLogin", // Default password for Google login
                            image: profile.picture,
                        },
                    });
                }

                return {
                    id: user.id,
                    username: user.username,
                    name: user.name,
                    image: user.image,
                };
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }:{token : any,user : UserType}) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.name = user.name;
                token.picture = user.image;
            }
            return token;
        },
        
        
        
        async session({ session, token }) {
            const user = await prisma.user.findUnique({
                where: {
                    id: token.id,
                },
            });

            if (user) {
                session.user = {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    image: user.image,

                };
            }

            return session;
        },
    },
    pages: {
        signIn: "/auth/signin", // Custom sign-in page
    },
};
