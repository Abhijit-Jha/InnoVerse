import { redirect } from 'next/navigation';
import { getServerSession } from "next-auth";
import { authoptions } from "./store/lib/authoption";


const getUserDetails = async () => {
    const session = await getServerSession(authoptions);
    return session;
};

export default async function Home() {
    const session = await getUserDetails()
    if (session == null) {
        redirect("/auth/signin")
    } else {
        redirect("/foryou")
    }

}
